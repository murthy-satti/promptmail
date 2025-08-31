
import { PromptMailTemplates } from "@/model/templates";
import { connectDB } from "@/lib/dbConnection";

// POST: Create a new template
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, slug, subject, body: emailBody, placeholders } = body;

    if (!title || !slug || !subject || !emailBody) {
      return Response.json(
        { success: false, message: "title, slug, subject, and body are required" },
        { status: 400 }
      );
    }

    const newTemplate = await PromptMailTemplates.create({
      title,
      slug,
      subject,
      body: emailBody,
      placeholders: placeholders || [],
    });

    return Response.json({ success: true, template: newTemplate }, { status: 201 });
  } catch (err) {
    console.error("Error creating template:", err);
    return Response.json(
      { success: false, message: "Failed to create template", error: err.message },
      { status: 500 }
    );
  }
}

// GET: Fetch all templates only
export async function GET() {
  try {
    await connectDB();

    // Fetch all templates
    const templates = await PromptMailTemplates.find({});
    return Response.json({ success: true, templates }, { status: 200 });

  } catch (err) {
    console.error("Error fetching templates:", err);
    return Response.json(
      { success: false, message: "Failed to fetch templates", error: err.message },
      { status: 500 }
    );
  }
}
