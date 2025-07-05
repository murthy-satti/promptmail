import { PromptMailUsers } from "@/model/schema";
import { connectDB } from "@/lib/dbConnection";

// PATCH: Update user details by email
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, name, phoneNumber, skills, experience } = body;

    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const updatedUser = await PromptMailUsers.findOneAndUpdate(
      { email },
      { name, phoneNumber, skills, experience },
      { new: true, upsert: true } // Create if doesn't exist
    );

    return Response.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err);
    return Response.json({ success: false, message: "Failed to update user", error: err.message }, { status: 500 });
  }
}

// GET: Fetch user by email
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ success: false, message: "Email query parameter is required" }, { status: 400 });
    }

    const user = await PromptMailUsers.findOne({ email });

    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return Response.json({ success: false, message: "Failed to fetch user", error: err.message }, { status: 500 });
  }
}
