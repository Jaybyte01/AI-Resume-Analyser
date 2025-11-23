export const runtime = "nodejs";

import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------- Safe decoder for pdf2json strings ----------------
function safeDecode(str) {
  try {
    return decodeURIComponent(str || "");
  } catch {
    try {
      return decodeURIComponent((str || "").replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
    } catch {
      return str || "";
    }
  }
}

// ---------------- PDF extraction using pdf2json (robust) ----------------
function extractPdfText(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

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
              // r.T may be URL-encoded text fragments
              text += safeDecode(r.T || "") + " ";
            });
          });
        });

        resolve(text.trim());
      } catch (err) {
        reject(err);
      }
    });

    parser.parseBuffer(buffer);
  });
}

// ---------------- Helper: robustly parse Gemini response ----------------
async function parseGeminiJsonResponse(geminiResp) {
  try {

    if (geminiResp?.response?.text) {
      const txt = await geminiResp.response.text();
      return JSON.parse(txt);
    }
    if (typeof geminiResp === "string") {
      return JSON.parse(geminiResp);
    }

    if (typeof geminiResp === "object") {
      
      if (
        geminiResp.atsScore !== undefined ||
        geminiResp.matchPercentage !== undefined
      ) {
        return geminiResp;
      }

      if (geminiResp.candidates && geminiResp.candidates[0]?.content) {
        const contentParts = geminiResp.candidates[0].content.parts;
        const joined = contentParts.map((p) => p.text || "").join("\n");
        return JSON.parse(joined);
      }

      if (geminiResp.output && typeof geminiResp.output === "string") {
        return JSON.parse(geminiResp.output);
      }

      if (geminiResp.outputs && Array.isArray(geminiResp.outputs) && geminiResp.outputs[0]?.content) {
        const joined = geminiResp.outputs.map(o => (o.content?.[0]?.text || "")).join("\n");
        return JSON.parse(joined);
      }
    }

    throw new Error("Unable to parse Gemini response to JSON");
  } catch (err) {
    throw new Error(`Failed to parse Gemini JSON response: ${err.message}`);
  }
}

// ---------------- Main route ----------------
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Only PDF and DOCX files are supported" },
        { status: 400 }
      );
    }

    // Read file bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text
    let resumeText = "";
    if (file.type === "application/pdf") {
      try {
        resumeText = await extractPdfText(buffer);
      } catch (err) {
        console.error("PDF extraction error:", err);
        return Response.json({ error: "Failed to extract text from PDF" }, { status: 400 });
      }
    } else {
      
      try {
        const result = await mammoth.extractRawText({ buffer });
        resumeText = result.value || "";
      } catch (err) {
        console.error("DOCX extraction error:", err);
        return Response.json({ error: "Failed to extract text from DOCX" }, { status: 400 });
      }
    }

    if (!resumeText || resumeText.trim().length < 20) {
      return Response.json(
        { error: "Could not extract meaningful text from resume" },
        { status: 400 }
      );
    }

   
    const atsPrompt = `
You are an ATS (Applicant Tracking System) specialist. Analyze the following resume for ATS compatibility and provide a comprehensive assessment.

Resume Text:
${resumeText}

Please analyze and return ONLY valid JSON with this exact structure:
{
  "atsScore": number,                      // 0-100
  "passabilityScore": number,              // 0-100
  "overallRating": "Excellent|Good|Needs Improvement",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "formatting": { "score": number, "issues": ["string"] },
  "keywords": { "score": number, "analysis": "string" },
  "sections": { "score": number, "analysis": "string" },
  "recommendations": "string"
}
Respond only with JSON (no explanation, no markdown).
`;

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });

    const geminiResp = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: atsPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.0,
        responseMimeType: "application/json",
      },
    });
    const analysis = await parseGeminiJsonResponse(geminiResp);

    const requiredFields = [
      "atsScore",
      "passabilityScore",
      "overallRating",
      "strengths",
      "weaknesses",
      "formatting",
      "keywords",
      "sections",
      "recommendations",
    ];
    for (const f of requiredFields) {
      if (analysis[f] === undefined) {
        console.warn(`ATS analysis missing field: ${f}`);
      }
    }

    return Response.json(analysis);
  } catch (err) {
    console.error("ATS check error:", err);
    return Response.json(
      { error: "Failed to check ATS compatibility", details: err.message },
      { status: 500 }
    );
  }
}
