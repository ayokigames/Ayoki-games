import { GoogleGenAI } from "@google/genai";

export const getGameGuide = async (gameTitle) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a quick pro guide for the game "${gameTitle}". 
      Include 3 short bullet points: Control Tips, Strategy, and Fun Fact. Keep it concise and gamer-focused.`,
      config: {
        temperature: 0.7
      }
    });
    return response.text || "Could not load guide. Just have fun!";
  } catch (error) {
    console.error("Guide Error:", error);
    return "Could not load guide. Just have fun!";
  }
};