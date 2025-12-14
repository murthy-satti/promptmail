import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server"; // Use NextResponse for Next.js 13+

// --- Configuration is correctly placed here ---
const ai = new GoogleGenAI({});

// Optimized for speed and cost. Lower quality on complex tasks.
// const MODEL_NAME = "gemini-2.5-flash-lite";

// Higher performance and better reasoning.
const MODEL_NAME = "gemini-2.5-flash";


const SYSTEM_INSTRUCTION = `
Your task is to generate professional, well-structured email content based on the user's prompt.

- Output only the "Subject" and "Body" of the email(Note: Make sure u give correct meanings like this To: , Subject: , Body: in the email content).
- Include the "To" field only if the user provides a recipient or to email address.
- Do NOT include AI phrases like "Here's your email" or "As requested".
- Do NOT use placeholders like [Your Name] or [LinkedIn] unless provided in the prompt.
- Contact details (like phone or email) must appear only after the closing (e.g., "Sincerely” or “Best regards”).
- Do NOT wrap the content in code blocks or add explanations.
- Keep responses concise (10-12 lines) unless the user requests detailed or more content.
- Be specific, natural, and professional — this email is being sent by a real person.
`;

// Initialize or reuse a global chat session (Standard Next.js pattern)
global.chatInstance = global.chatInstance || null;

function startNewChat() {
    global.chatInstance = ai.chats.create({
        model: MODEL_NAME,
        config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
}

if (!global.chatInstance) startNewChat();

export async function POST(req) {
    try {
        const { prompt, user } = await req.json();

        // 1. **REQUIRED VALIDATION**: Check if the prompt is valid
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return NextResponse.json({
                error: "Invalid Request",
                detail: "The 'prompt' field in the request body is required and cannot be empty.",
            }, { status: 400 });
        }


        let userDetails = "";
        if (user) {
            userDetails += user.name ? `Name: ${user.name}\n` : "";
            userDetails += user.phoneNumber ? `Phone: ${user.phoneNumber}\n` : "";
            userDetails += user.skills ? `Skills: ${user.skills}\n` : "";
            userDetails += user.experience ? `Experience: ${user.experience}\n` : "";
        }

        const finalPrompt = userDetails
            ? `User Profile:\n${userDetails}\n\nPrompt:\n${prompt}`
            : prompt;

        // 2. **CORRECTION HERE**: Wrap the finalPrompt string in a { message: string } object
        const result = await global.chatInstance.sendMessage({ message: finalPrompt });
        
        // 3. **CORRECTION HERE**: Access the text directly from the result object
        const text = result.text; 

        return NextResponse.json({ text });
    } catch (err) {
        console.error("Gemini API error:", err);
        return NextResponse.json(
            { error: "Gemini error", detail: err.message },
            { status: 500 }
        );
    }
}