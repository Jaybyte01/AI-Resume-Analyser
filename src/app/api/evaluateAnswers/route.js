import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { jobRole, questions, answers } = await request.json();

    if (!jobRole || !questions || !answers) {
      return Response.json(
        { error: "Job role, questions, and answers are required" },
        { status: 400 }
      );
    }

    if (questions.length !== answers.length) {
      return Response.json(
        { error: "Number of questions and answers must match" },
        { status: 400 }
      );
    }

    // Prepare combined Q/A text
    const qaText = questions
      .map(
        (q, i) => `Question ${i + 1}: ${q}\nAnswer: ${answers[i]}`
      )
      .join("\n\n");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    
    const prompt = `
You are an expert interviewer and career coach. Evaluate the following interview responses for a ${jobRole} role:

${qaText}

Return ONLY valid JSON matching this EXACT schema:

{
  "overallScore": number (0-100),
  "categoryScores": {
    "communication": number,
    "technical": number,
    "problemSolving": number,
    "leadership": number
  },
  "feedback": "string",
  "detailedFeedback": ["string", ...],
  "strengths": ["string", ...],
  "improvements": ["string", ...],
  "recommendations": "string"
}

RULES:
- No markdown
- No backticks
- No explanation
- Only valid JSON
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("AI JSON parse failed:", text);
      return Response.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }

    return Response.json(parsed);
  } catch (error) {
    console.error("Answer evaluation error:", error);
    return Response.json(
      { error: "Failed to evaluate answers. Please try again." },
      { status: 500 }
    );
  }
}
