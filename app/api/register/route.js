import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import User from "@/model/user";

import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const { name, phone, email, password } = body;

  //   console.log({ name, phone, email, password });
  try {
    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in user" },
        { status: 400 }
      );
    }

    // Kiểm tra số điện thoại trùng
    const existingPhone = await User.findOne({ mobileNumber: phone });
    if (existingPhone) {
      return NextResponse.json(
        { success: false, message: "Phone number already in use" },
        { status: 400 }
      );
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      mobileNumber: phone,
    }).save();

    console.log("user", user);

    return NextResponse.json({ msg: "user registered successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
