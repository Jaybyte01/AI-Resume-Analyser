import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ----------- SAFE DECODER -----------
function safeDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

// ----------- PDF EXTRACTOR -----------
function extractPdfText(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", (err) => reject(err));

    parser.on("pdfParser_dataReady", (pdfData) => {
      try {
        let text = "";

        const pages =
          pdfData?.formImage?.Pages ||
          pdfData?.Pages ||
          [];

        pages.forEach((page) => {
          if (!page.Texts) return;
          page.Texts.forEach((t) => {
            if (!t.R) return;
            t.R.forEach((r) => {
              text += safeDecode(r.T || "") + " ";
            });
          });
        });

        resolve(text.trim());
      } catch (error) {
        reject(error);
      }
    });

    parser.parseBuffer(buffer);
  });
}

// ----------- MAIN POST ROUTE -----------
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const jobDescription = formData.get("jobDescription");

    if (!file || !jobDescription) {
      return Response.json(
        { error: "File and job description are required" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Only PDF and DOCX files are supported" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let resumeText = "";

    // ----------- PDF -----------
    if (file.type === "application/pdf") {
      resumeText = await extractPdfText(buffer);
    }

    // ----------- DOCX -----------
    else {
      const result = await mammoth.extractRawText({ buffer });
      resumeText = result.value;
    }

    if (!resumeText || resumeText.length < 20) {
      return Response.json(
        { error: "Could not extract text from resume" },
        { status: 400 }
      );
    }

    // ----------- AI PROMPT -----------
    const matchPrompt = `
You are an expert job-matching specialist. Compare the candidate's resume with the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return only valid JSON with the following structure:
{
  "matchPercentage": number,
  "experienceMatch": number,
  "roleAlignment": number,
  "matchedKeywords": ["string"],
  "missingKeywords": ["string"],
  "skillGaps": ["string"],
  "recommendations": "string",
  "jobTitle": "string"
}
`;

    // ----------- GEMINI 2.5 PRO CALL -----------
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-pro",
    });

    const resp = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: matchPrompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const analysis = JSON.parse(resp.response.text());

    return Response.json(analysis);
  } catch (err) {
    console.error("Job matching error:", err);
    return Response.json(
      {
        error: "Failed to analyze job match.",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
