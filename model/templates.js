import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true, // ensures MongoDB creates an index
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    placeholders: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const PromptMailTemplates =
  mongoose.models.PromptMailTemplates ||
  mongoose.model("PromptMailTemplates", templateSchema);
