// src/genAI.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const genAI = new GoogleGenerativeAI(API_KEY);

export const generateGeminiResponse = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response.text();
  return response;
};
