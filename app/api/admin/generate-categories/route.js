// app/api/admin/generate-categories/route.js
import { NextResponse } from "next/server";
import { runAi } from "@/ai/ai";
import dbConnect from "@/utils/dbConnect";
// import { dbConnect } from "@/utils/dbConnect";
import Prompt from "@/model/prompt";

/**
 * POST body:
 * {
 *   generationCount: number,
 *   prompt?: string
 * }
 *
 * Returns: { text: "A, B, C, D, E" }
 */

export async function POST(req) {
  try {
    const body = await req.json();
    const generationCount = typeof body.generationCount === "number" ? body.generationCount : 0;
    const promptFromClient = body.prompt?.trim();

    // If client didn't pass prompt, fetch saved prompt; fallback to built-in default
    let promptToUse = promptFromClient;
    if (!promptToUse) {
      await dbConnect();
      const saved = await Prompt.findOne({ name: "default" }).sort({ createdAt: -1 }).lean();
      if (saved?.prompt) promptToUse = saved.prompt;
    }

    // If still empty, use a default builtin prompt (Vietnamese categories for homestay)
    if (!promptToUse) {
      promptToUse = `Hãy tạo ra 5 tên hạng mục (category) độc đáo cho mô hình Homestay trải nghiệm tại Việt Nam. 
      Yêu cầu:
      1. Tên thể hiện phong cách hoặc trải nghiệm (thiên nhiên, văn hoá địa phương, nghỉ dưỡng, biển, núi, nông trại).
      2. Pha trộn: homestay truyền thống, sinh thái, hiện đại, văn hoá, trải nghiệm thực tế.
      3. Mỗi tên 2-4 từ, tiếng Việt có dấu, không dùng ký tự đặc biệt, không dùng số.
      4. Trả về 5 tên, phân tách bằng dấu phẩy (comma), không có đánh số hay ký tự mô tả.`;
    }

    // Optionally include generationCount to avoid repeats
    const finalPrompt = promptToUse.replace(/\$BATCH|\$batch|\{batch\}/g, String(generationCount + 1))
      || `${promptToUse}\n\n(Batch ${generationCount + 1})`;

    const text = await runAi(finalPrompt);
    return NextResponse.json({ text }, { status: 200 });
  } catch (err) {
    console.error("POST /api/admin/generate-categories error:", err);
    return NextResponse.json({ error: "Failed to generate categories" }, { status: 500 });
  }
}
