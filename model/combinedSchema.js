import mongoose from "mongoose";

// Template subdocument
const templateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    image: { type: String, default: "" },
    // isFavorite: { type: Boolean, default: false }, // optional for future
  },
  { _id: true, timestamps: true } // each template has _id, createdAt, updatedAt
);

// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String, default: "" },

    // OAuth2 fields
    oauthId: { type: String },
    provider: { type: String },
    profileImage: { type: String, default: "" },
    accessToken: { type: String, select: false },
    refreshToken: { type: String, select: false },

    // Templates
    templates: { type: [templateSchema], default: [] },
  },
  { timestamps: true, versionKey: false }
);

export const PM_Users =
  mongoose.models.PM_Users ||
  mongoose.model("PM_Users", userSchema);
