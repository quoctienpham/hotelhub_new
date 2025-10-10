// app/api/admin/prompts/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Prompt from "@/model/prompt";

export async function GET() {
  try {
    await dbConnect();
    // Lấy prompt gần nhất (hoặc prompt với name "default")
    const p = await Prompt.findOne({ name: "default" }).sort({ createdAt: -1 }).lean();
    if (!p) return NextResponse.json({ prompt: null }, { status: 200 });
    return NextResponse.json({ prompt: p.prompt }, { status: 200 });
  } catch (err) {
    console.error("GET /api/admin/prompts error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { prompt } = body;
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }
    // Upsert: ở đây ta lưu prompt mới với name default
    const doc = await Prompt.create({ name: "default", prompt });
    return NextResponse.json({ ok: true, id: doc._id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/prompts error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
