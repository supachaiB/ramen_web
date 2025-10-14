export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb"
import userModel from "@/models/userModel";
import { createToken } from "@/libs/jwt";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();
        // check admin 
        const adminEmail = process.env.ADMIN_USERNAME;
        const adminPw = process.env.ADMIN_PASSWORD;


        // Admin login
        if (email === adminEmail && password === adminPw) {
            const token = createToken("admin-id", "admin"); // id ปลอมสำหรับ admin
            const res = NextResponse.json({ success: true, role: "admin", token });
            res.cookies.set("token", token, { httpOnly: true, maxAge: 3600, path: "/" }); // เซ็ต cookie
            return res;
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
        const token = createToken(user._id, "user");
        const res = NextResponse.json({ success: true, role: "user", token });
        res.cookies.set("token", token, { httpOnly: true, maxAge: 3600, path: "/" }); // เซ็ต cookie
        return res;

    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Error login" })
    }
}