
import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------- SAFE DECODER ----------------
function safeDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str; // Fallback to raw text to avoid crashes
  }
}

// ---------------- PDF EXTRACTION ----------------
function extractPdfText(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", (err) => reject(err));

    parser.on("pdfParser_dataReady", (pdfData) => {
      try {
        let text = "";

        // Handle all possible PDF2JSON structures
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

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    // ---------------- PDF Handling ----------------
    if (file.type === "application/pdf") {
      extractedText = await extractPdfText(buffer);
    }

    // ---------------- DOCX Handling ----------------
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return Response.json(
        { error: "Could not extract text from resume" },
        { status: 400 }
      );
    }

    // ---------------- AI Prompt ----------------
    const prompt = `
Analyze this resume and return ONLY valid JSON.

Resume content:
${extractedText}

Return exactly this JSON:
{
  "atsScore": number,
  "skillMatch": number,
  "missingKeywords": ["string"],
  "summary": "string",
  "suggestions": "string",
  "strengths": ["string"],
  "weaknesses": ["string"]
}
`;

    // ---------------- GEMINI 2.5 PRO ----------------
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-pro",
    });

    const aiResponse = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const analysis = JSON.parse(aiResponse.response.text());

    return Response.json({ success: true, analysis });
  } catch (err) {
    console.error("Analysis Error:", err);
    return Response.json(
      { error: "Server error during analysis", details: err.message },
      { status: 500 }
    );
  }
}
