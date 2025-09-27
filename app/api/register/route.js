import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import validator from "validator";
import connectMongoDB from "@/libs/mongodb";
import userModel from "@/models/userModel";
import { createToken } from "@/libs/jwt";

// register user
export async function POST(req) {
    await connectMongoDB();
  try {
    const { name, email, password } = await req.json();

    // เช็ก user ซ้ำ
    const exists = await userModel.findOne({ email });
    if (exists) return NextResponse.json({ success: false, message: "User already exists" });

    // validate email + password
    if (!validator.isEmail(email)) return NextResponse.json({ success: false, message: "Invalid email" });
    if (password.length < 8) return NextResponse.json({ success: false, message: "Password too short" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Error registering user" });
  }
}

