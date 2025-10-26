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

    // Get file buffer
    const buffer = await file.arrayBuffer();
    let extractedText = '';

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      // For PDF files - we'll simulate text extraction for now
      // In a real implementation, you'd use a library like pdf-parse
      extractedText = `Sample resume text extracted from PDF: ${file.name}. This is a placeholder for actual PDF text extraction. In a real implementation, you would use pdf-parse or similar library to extract the actual text content from the PDF file.

      Professional Experience:
      - Software Engineer at Tech Company (2020-2023)
      - Frontend Developer at Startup Inc (2018-2020)
      
      Skills:
      JavaScript, React, Node.js, Python, SQL
      
      Education:
      Bachelor's in Computer Science
      `;
    } else {
      // For DOCX files - we'll simulate text extraction for now
      // In a real implementation, you'd use a library like mammoth
      extractedText = `Sample resume text extracted from DOCX: ${file.name}. This is a placeholder for actual DOCX text extraction. In a real implementation, you would use mammoth.js or similar library to extract the actual text content from the DOCX file.

      Professional Experience:
      - Software Engineer at Tech Company (2020-2023)
      - Frontend Developer at Startup Inc (2018-2020)
      
      Skills:
      JavaScript, React, Node.js, Python, SQL
      
      Education:
      Bachelor's in Computer Science
      `;
    }

    // Analyze resume with AI
    const analysisPrompt = `You are an expert resume analyzer and ATS specialist. Analyze the following resume text and provide a comprehensive analysis in JSON format.

Resume Text:
${extractedText}

Please analyze and return a JSON response with:
1. atsScore (number 0-100): How well this resume would perform in ATS systems
2. skillMatch (number 0-100): Overall skill relevance percentage  
3. missingKeywords (array): List of important keywords that should be added
4. suggestions (string): Detailed recommendations for improvement
5. summary (string): A professional 3-4 line summary for this candidate
6. strengths (array): List of strong points in this resume
7. weaknesses (array): List of areas that need improvement

Focus on:
- ATS compatibility (formatting, keywords, structure)
- Professional presentation
- Quantifiable achievements
- Industry-relevant skills
- Grammar and clarity

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
            content: analysisPrompt
          }
        ],
        json_schema: {
          name: "resume_analysis",
          schema: {
            type: "object",
            properties: {
              atsScore: { type: "number" },
              skillMatch: { type: "number" },
              missingKeywords: {
                type: "array",
                items: { type: "string" }
              },
              suggestions: { type: "string" },
              summary: { type: "string" },
              strengths: {
                type: "array", 
                items: { type: "string" }
              },
              weaknesses: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["atsScore", "skillMatch", "missingKeywords", "suggestions", "summary", "strengths", "weaknesses"],
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
    console.error('Resume analysis error:', error);
    return Response.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    );
  }
}