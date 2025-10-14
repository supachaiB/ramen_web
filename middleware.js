export const runtime = "nodejs"; // บังคับให้ใช้ Node.js runtime

import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("Token in middleware:", token); // log ดู

  if (!token) return NextResponse.redirect(new URL("/LoginPopup", req.url));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("JWT error:", err.message);
    return NextResponse.redirect(new URL("/LoginPopup", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], // ใช้ middleware กับหน้า admin ทั้งหมด
};