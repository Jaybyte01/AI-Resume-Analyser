export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: 'Only PDF and DOCX files are supported' }, { status: 400 });
    }

    // Extract resume text (placeholder implementation)
    let resumeText = '';
    if (file.type === 'application/pdf') {
      resumeText = `Sample resume text extracted from PDF: ${file.name}. This is a placeholder for actual PDF text extraction.

      John Smith
      Software Engineer
      john.smith@email.com | (555) 123-4567 | LinkedIn: /in/johnsmith

      PROFESSIONAL EXPERIENCE
      Software Engineer | Tech Company | 2020-2023
      - Developed web applications using React and Node.js
      - Collaborated with cross-functional teams
      - Improved application performance by 30%

      Frontend Developer | Startup Inc | 2018-2020
      - Built responsive user interfaces
      - Worked with modern JavaScript frameworks

      SKILLS
      JavaScript, React, Node.js, Python, SQL, Git, AWS, HTML, CSS

      EDUCATION
      Bachelor of Science in Computer Science
      University of Technology | 2014-2018
      `;
    } else {
      resumeText = `Sample resume text extracted from DOCX: ${file.name}. This is a placeholder for actual DOCX text extraction.

      John Smith
      Software Engineer
      john.smith@email.com | (555) 123-4567 | LinkedIn: /in/johnsmith

      PROFESSIONAL EXPERIENCE
      Software Engineer | Tech Company | 2020-2023
      - Developed web applications using React and Node.js
      - Collaborated with cross-functional teams
      - Improved application performance by 30%

      Frontend Developer | Startup Inc | 2018-2020
      - Built responsive user interfaces
      - Worked with modern JavaScript frameworks

      SKILLS
      JavaScript, React, Node.js, Python, SQL, Git, AWS, HTML, CSS

      EDUCATION
      Bachelor of Science in Computer Science
      University of Technology | 2014-2018
      `;
    }

    // Analyze ATS compatibility with AI
    const atsPrompt = `You are an ATS (Applicant Tracking System) specialist. Analyze the following resume for ATS compatibility and provide a comprehensive assessment.

Resume Text:
${resumeText}

Please analyze and return a JSON response with:
1. atsScore (number 0-100): Overall ATS compatibility score
2. passabilityScore (number 0-100): Likelihood of passing ATS screening
3. overallRating (string): "Excellent", "Good", or "Needs Improvement"
4. strengths (array): List of ATS-friendly elements found
5. weaknesses (array): List of ATS issues that need fixing
6. formatting (object): { score: number 0-100, issues: array of strings }
7. keywords (object): { score: number 0-100, analysis: string }
8. sections (object): { score: number 0-100, analysis: string }
9. recommendations (string): Detailed recommendations for ATS optimization

Focus on:
- Standard section headers (Summary, Experience, Education, Skills)
- Keyword density and relevance
- Formatting simplicity (no graphics, tables, or complex layouts)
- File format compatibility
- Text readability by parsing software
- Contact information placement
- Date formats and consistency
- Bullet points vs paragraphs
- Font choices and readability

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
            content: atsPrompt
          }
        ],
        json_schema: {
          name: "ats_compatibility_analysis",
          schema: {
            type: "object",
            properties: {
              atsScore: { type: "number" },
              passabilityScore: { type: "number" },
              overallRating: { type: "string" },
              strengths: {
                type: "array",
                items: { type: "string" }
              },
              weaknesses: {
                type: "array",
                items: { type: "string" }
              },
              formatting: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  issues: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["score", "issues"],
                additionalProperties: false
              },
              keywords: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  analysis: { type: "string" }
                },
                required: ["score", "analysis"],
                additionalProperties: false
              },
              sections: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  analysis: { type: "string" }
                },
                required: ["score", "analysis"],
                additionalProperties: false
              },
              recommendations: { type: "string" }
            },
            required: ["atsScore", "passabilityScore", "overallRating", "strengths", "weaknesses", "formatting", "keywords", "sections", "recommendations"],
            additionalProperties: false
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`AI analysis failed: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const analysis = JSON.parse(aiResponse.choices[0].message.content);

    return Response.json(analysis);

  } catch (error) {
    console.error('ATS check error:', error);
    return Response.json(
      { error: 'Failed to check ATS compatibility. Please try again.' },
      { status: 500 }
    );
  }
}