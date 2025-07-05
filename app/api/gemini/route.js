import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `
Your task is to generate professional, well-structured email content based on the user's prompt.

- Output only the "Subject" and "Body" of the email.
- Include the "To" field only if the user provides a recipient or to email address.
- Do NOT include AI phrases like "Here's your email" or "As requested".
- Do NOT use placeholders like [Your Name] or [LinkedIn] unless provided in the prompt.
- Contact details (like phone or email) must appear only after the closing (e.g., "Sincerely” or “Best regards”).
- Do NOT wrap the content in code blocks or add explanations.
- Keep responses concise (10-12 lines) unless the user requests detailed or more content.
- Be specific, natural, and professional — this email is being sent by a real person.
`;



let chat;

// Start a new Gemini chat session
function startNewChat() {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  chat = model.startChat({
    history: [],
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
  });
}

startNewChat();

export async function POST(req) {
  try {
    const { prompt, user } = await req.json();

    // Format user data if provided
    let userDetails = '';
    if (user) {
      userDetails += user.name ? `Name: ${user.name}\n` : '';
      userDetails += user.phoneNumber ? `Phone: ${user.phoneNumber}\n` : '';
      userDetails += user.skills ? `Skills: ${user.skills}\n` : '';
      userDetails += user.experience ? `Experience: ${user.experience}\n` : '';
    }

    // Combine user details with prompt
    const finalPrompt = userDetails
      ? `User Profile:\n${userDetails}\n\nPrompt:\n${prompt}`
      : prompt;

    const result = await chat.sendMessage(finalPrompt);
    const text = result.response.text();

    return Response.json({ text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return Response.json({ error: "Gemini error", detail: err.message }, { status: 500 });
  }
}
