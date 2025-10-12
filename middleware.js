// /middleware.js (วางที่ project-root/middleware.js)
import { NextResponse } from "next/server";

export function middleware(req) {
  // Redirect ทุกคำขอที่เข้ามาที่ /admin หรือ /admin/anything -> ไปหน้า '/'
  // return NextResponse.redirect(new URL("/LoginPopup", req.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"], // ตรวจทั้ง /admin และ /admin/...
};
