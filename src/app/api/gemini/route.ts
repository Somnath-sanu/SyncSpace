import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { prompt, mode } = await req.json();

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let systemPrompt = "";
    switch (mode) {
      case "write":
        systemPrompt = "Write detailed, well-structured content in 50-100 words limit about: ";
        break;
      case "analyze":
        systemPrompt =
          "Analyze the following text and provide insights about its structure, tone, and key points in 50-100 words limit : ";
        break;
      case "improve":
        systemPrompt =
          "Improve the following text by enhancing clarity, flow, and impact while maintaining the original message in 50-100 words limit : ";
        break;
    }

    const result = await model.generateContent(systemPrompt + prompt);
    const response = await result.response.text();

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
