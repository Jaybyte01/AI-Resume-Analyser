export async function POST(request) {
  try {
    const { jobRole } = await request.json();
    
    if (!jobRole || !jobRole.trim()) {
      return Response.json({ error: 'Job role is required' }, { status: 400 });
    }

    // Generate interview questions with AI
    const questionsPrompt = `You are an experienced interviewer and hiring manager. Generate 6-7 thoughtful interview questions for a ${jobRole} position. 

Requirements:
- Mix of behavioral, technical, and situational questions
- Questions should be relevant to the specific role
- Include both common interview questions and role-specific ones
- Avoid yes/no questions - focus on open-ended questions that allow detailed responses
- Questions should help assess skills, experience, problem-solving, and cultural fit

Please return only a JSON array of question strings, no additional text.

Example format: ["Question 1?", "Question 2?", ...]`;

    const response = await fetch('/integrations/google-gemini-2-5-pro/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: questionsPrompt
          }
        ],
        json_schema: {
          name: "interview_questions",
          schema: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["questions"],
            additionalProperties: false
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`AI question generation failed: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const result = JSON.parse(aiResponse.choices[0].message.content);

    return Response.json(result);

  } catch (error) {
    console.error('Question generation error:', error);
    return Response.json(
      { error: 'Failed to generate questions. Please try again.' },
      { status: 500 }
    );
  }
}