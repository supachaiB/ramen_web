import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb"
import userModel from "@/models/userModel";
import { createToken } from "@/libs/jwt";
import bcrypt from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();

        // check admin 
        const adminEmail = process.env.ADMIN_USERNAME;
        const adminPw = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPw) {
            // if admin - create token and send role=admin
            const token = createToken("admin");
            return NextResponse.json({
                success: true,
                token,
                role: "admin",
                redirect: "/admin"
            })
        }

    
        // find user
        const user = await userModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ success: false, message: "User Doesn't exist" })
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: "Invalid credentials" })
        }

        // create token and send to page user
        const token = createToken(user._id)
        return NextResponse.json({
                success: true,
                token,
                role: "user",
                redirect: "/"
            })
       
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Error login" })
    }
}