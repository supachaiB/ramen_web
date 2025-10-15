import { NextResponse } from "next/server";
import { addToCart } from "@/controllers/cartController";

export async function POST(req) {
  try {
    // ✅ req ตรงนี้เป็น Next.js Request object
    const result = await addToCart(req);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 401 });
  }
}
