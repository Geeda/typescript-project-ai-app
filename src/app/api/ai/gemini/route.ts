import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const genAi = new GoogleGenAI({});
const geminiModel = process.env.GEMINI_AI_MODEL ?? "gemini-2.5-flash-lite";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Please provide a prompt" },
        { status: 400 }
      );
    }

    const response = await genAi.models.generateContent({
      model: geminiModel,
      contents: prompt,
    });

    return NextResponse.json({
      response: response.text,
    });
  } catch (error: any) {
    console.error("Error generating content from Gemini:", error);
    return NextResponse.json(
      {
        error: "Failed to generate content from Gemini.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
