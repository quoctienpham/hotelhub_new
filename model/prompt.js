// models/Prompt.js
import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  name: { type: String, default: "default" }, // hỗ trợ lưu nhiều prompt nếu cần
  prompt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
