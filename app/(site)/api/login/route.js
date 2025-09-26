import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb"
import userModel from "@/models/userModel";
import { createToken } from "@/libs/jwt";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();

        const user = await userModel.findOne({ email })
        if(!user) {
            return NextResponse.json({success:false, message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return NextResponse.json({success:false, message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        return NextResponse.json({success:true, token})

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message:"Error login"})
    }
}