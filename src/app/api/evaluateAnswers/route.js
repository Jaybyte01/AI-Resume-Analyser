export async function POST(request) {
  try {
    const { jobRole, questions, answers } = await request.json();
    
    if (!jobRole || !questions || !answers) {
      return Response.json({ error: 'Job role, questions, and answers are required' }, { status: 400 });
    }

    if (questions.length !== answers.length) {
      return Response.json({ error: 'Number of questions and answers must match' }, { status: 400 });
    }

    // Prepare questions and answers for evaluation
    const qaText = questions.map((question, index) => 
      `Question ${index + 1}: ${question}\nAnswer: ${answers[index]}\n`
    ).join('\n');

    // Evaluate answers with AI
    const evaluationPrompt = `You are an expert interviewer and career coach. Evaluate the following interview responses for a ${jobRole} position.

${qaText}

Please provide a comprehensive evaluation in JSON format with:
1. overallScore (number 0-100): Overall interview performance score
2. categoryScores (object): Scores for different categories like communication, technical, problemSolving, leadership
3. feedback (string): Overall performance summary
4. detailedFeedback (array): Specific feedback for each answer
5. strengths (array): Key strengths demonstrated
6. improvements (array): Areas that need improvement
7. recommendations (string): Specific recommendations for career development

Focus on:
- Clarity and structure of responses
- Relevance to the role
- Problem-solving approach
- Technical competency (if applicable)
- Communication skills
- Leadership potential
- Examples and specificity
- Professional growth mindset

Provide constructive, actionable feedback that helps the candidate improve.

Respond only with valid JSON.`;

    const response = await fetch('/integrations/google-gemini-2-5-pro/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: evaluationPrompt
          }
        ],
        json_schema: {
          name: "interview_evaluation",
          schema: {
            type: "object",
            properties: {
              overallScore: { type: "number" },
              categoryScores: {
                type: "object",
                properties: {
                  communication: { type: "number" },
                  technical: { type: "number" },
                  problemSolving: { type: "number" },
                  leadership: { type: "number" }
                },
                required: ["communication", "technical", "problemSolving", "leadership"],
                additionalProperties: false
              },
              feedback: { type: "string" },
              detailedFeedback: {
                type: "array",
                items: { type: "string" }
              },
              strengths: {
                type: "array",
                items: { type: "string" }
              },
              improvements: {
                type: "array",
                items: { type: "string" }
              },
              recommendations: { type: "string" }
            },
            required: ["overallScore", "categoryScores", "feedback", "detailedFeedback", "strengths", "improvements", "recommendations"],
            additionalProperties: false
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`AI evaluation failed: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const evaluation = JSON.parse(aiResponse.choices[0].message.content);

    return Response.json(evaluation);

  } catch (error) {
    console.error('Answer evaluation error:', error);
    return Response.json(
      { error: 'Failed to evaluate answers. Please try again.' },
      { status: 500 }
    );
  }
}