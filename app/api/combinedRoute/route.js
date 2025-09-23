import { connectDB } from "@/lib/dbConnection";
import { PM_Users } from "@/model/combinedSchema";

// GET: Fetch user by email
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ success: false, message: "Email query parameter is required" }, { status: 400 });
    }

    const user = await PM_Users.findOne({ email });

    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return Response.json({ success: false, message: "Failed to fetch user", error: err.message }, { status: 500 });
  }
}


// PATCH: Add new template (with image) to user
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, template } = body;

    if (!email || !template) {
      return Response.json({ success: false, message: "Email and template are required" }, { status: 400 });
    }

    // Ensure template has required fields
    const { title, slug, subject, body: templateBody, image = "" } = template;
    if (!title || !slug || !subject || !templateBody) {
      return Response.json({ success: false, message: "Template must have title, slug, subject, and body" }, { status: 400 });
    }

    const newTemplate = { title, slug, subject, body: templateBody,  image: image || "",  };

    // console.log(newTemplate)

    const updatedUser = await PM_Users.findOneAndUpdate(
      { email },
      { $push: { templates: newTemplate } }, // push new template including image
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Error updating templates:", err);
    return Response.json({ success: false, message: "Failed to update templates", error: err.message }, { status: 500 });
  }
}
