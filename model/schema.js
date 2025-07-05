import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },

  phoneNumber: { type: String, default: "" },
  skills: { type: [String], default: [] },
  experience: { type: String, default: "" },

  // OAuth2 fields
  oauthId: { type: String },         // Google/Facebook ID
  provider: { type: String },        // 'google', etc.
  profileImage: { type: String, default: "" },
  accessToken: { type: String, select: false },      // hidden from queries
  refreshToken: { type: String, select: false },     // hidden from queries
}, { timestamps: true, versionKey : false });

export const PromptMailUsers =
  mongoose.models.PromptMailUsers || mongoose.model("PromptMailUsers", userSchema);
