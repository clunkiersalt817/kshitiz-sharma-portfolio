import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_DATA } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a "Career Agent" for ${PORTFOLIO_DATA.personalInfo.name}. 
Your goal is to help find jobs and manage ${PORTFOLIO_DATA.personalInfo.name}'s professional career.

CONTEXT:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

CAPABILITIES:
1. RESUME GENERATION: When asked to create a resume, generate professional LaTeX source code based on the portfolio data. 
   - Start with "\\documentclass{article}".
   - Use standard packages like "hyperref", "geometry", and "enumitem".
   - Structure the document with sections like Education, Experience, Skills, and Projects.
   - Ensure it is a valid, single-file LaTeX document.
   - Do NOT use Markdown formatting in the resume content.
2. JOB SEARCH: Use Google Search to find actual job listings for "DevOps Engineer", "Cloud Engineer", or "Automation Engineer" in ${PORTFOLIO_DATA.personalInfo.location}.
3. JOB FORMATTING: If you find jobs, you MUST mention the title, company, location, and a URL.

BEHAVIOR:
- Be proactive and helpful.
- If the user wants to apply, simulate a professional application process.
- Always list sources for job listings found via search.
`;

export const streamChatResponse = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  newMessage: string,
  onChunk: (text: string) => void,
  onGroundingMetadata?: (metadata: any) => void
) => {
  try {
    const result = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ text: newMessage }]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      },
    });

    for await (const chunk of result) {
      const textChunk = chunk.text;
      if (textChunk) {
        onChunk(textChunk);
      }

      if (chunk.candidates?.[0]?.groundingMetadata) {
        onGroundingMetadata?.(chunk.candidates[0].groundingMetadata);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("I'm sorry, I'm having trouble with my career tools. Please try again.");
  }
};