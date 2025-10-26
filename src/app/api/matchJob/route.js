export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const jobDescription = formData.get('jobDescription');
    
    if (!file || !jobDescription) {
      return Response.json({ error: 'File and job description are required' }, { status: 400 });
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

      Professional Experience:
      - Software Engineer at Tech Company (2020-2023)
      - Frontend Developer at Startup Inc (2018-2020)
      
      Skills:
      JavaScript, React, Node.js, Python, SQL, Git, AWS
      
      Education:
      Bachelor's in Computer Science
      `;
    } else {
      resumeText = `Sample resume text extracted from DOCX: ${file.name}. This is a placeholder for actual DOCX text extraction.

      Professional Experience:
      - Software Engineer at Tech Company (2020-2023)
      - Frontend Developer at Startup Inc (2018-2020)
      
      Skills:
      JavaScript, React, Node.js, Python, SQL, Git, AWS
      
      Education:
      Bachelor's in Computer Science
      `;
    }

    // Analyze job match with AI
    const matchPrompt = `You are an expert job matching specialist. Compare the candidate's resume against the job description and provide a comprehensive analysis.

Resume:
${resumeText}

Job Description:
${jobDescription}

Please analyze and return a JSON response with:
1. matchPercentage (number 0-100): Overall match percentage between resume and job
2. experienceMatch (number 0-100): How well the candidate's experience aligns
3. roleAlignment (number 0-100): How well the candidate fits the role requirements
4. matchedKeywords (array): Keywords that appear in both resume and job description
5. missingKeywords (array): Important keywords from job description missing in resume
6. skillGaps (array): Specific skills the candidate needs to develop
7. recommendations (string): Detailed recommendations for improving the match
8. jobTitle (string): Extract the job title from the description

Focus on:
- Technical skills alignment
- Experience level match
- Industry background relevance
- Required vs. preferred qualifications
- Career progression fit

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
            content: matchPrompt
          }
        ],
        json_schema: {
          name: "job_match_analysis",
          schema: {
            type: "object",
            properties: {
              matchPercentage: { type: "number" },
              experienceMatch: { type: "number" },
              roleAlignment: { type: "number" },
              matchedKeywords: {
                type: "array",
                items: { type: "string" }
              },
              missingKeywords: {
                type: "array",
                items: { type: "string" }
              },
              skillGaps: {
                type: "array",
                items: { type: "string" }
              },
              recommendations: { type: "string" },
              jobTitle: { type: "string" }
            },
            required: ["matchPercentage", "experienceMatch", "roleAlignment", "matchedKeywords", "missingKeywords", "skillGaps", "recommendations", "jobTitle"],
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
    console.error('Job matching error:', error);
    return Response.json(
      { error: 'Failed to analyze job match. Please try again.' },
      { status: 500 }
    );
  }
}