
import { GoogleGenAI } from "@google/genai";

export const analyzeSymptoms = async (petType: string, symptoms: string) => {
  // Always use process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bir ${petType} sahibi şu belirtileri bildiriyor: "${symptoms}". 
      Lütfen bu belirtilerin ne anlama gelebileceği, aciliyet durumu ve bir veteriner hekime başvurmadan önce yapılabilecekler hakkında kısa bir tavsiye ver. 
      ÖNEMLİ: Bu bir teşhis değildir, sadece bilgilendirme amaçlıdır. Mutlaka bir veteriner hekime danışılması gerektiğini vurgula.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });
    // Extracting text output from GenerateContentResponse using the .text property
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Şu an AI servisine ulaşılamıyor. Lütfen doğrudan bir veteriner hekimle iletişime geçin.";
  }
};
