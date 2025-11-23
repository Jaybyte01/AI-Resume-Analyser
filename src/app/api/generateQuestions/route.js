import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { jobRole } = await request.json();

    if (!jobRole || !jobRole.trim()) {
      return Response.json(
        { error: "Job role is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an expert interviewer. Generate 6-7 interview questions for a "${jobRole}" role.

Return ONLY JSON:
{
  "questions": ["Q1", "Q2", ...]
}

No markdown, no explanation, no \`\`\`json blocks.
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json/gi, "")
               .replace(/```/g, "")
               .trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("AI JSON parse failed:", text);
      return Response.json(
        { error: "AI returned invalid JSON. Try again." },
        { status: 500 }
      );
    }

    return Response.json(parsed);
  } catch (error) {
    console.error("Question generation error:", error);
    return Response.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}