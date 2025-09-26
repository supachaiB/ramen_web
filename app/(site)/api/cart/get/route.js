import { NextResponse } from "next/server";
import { getCart } from "@/controllers/cartController";
import connectMongoDB from "@/libs/mongodb";
import { verifyToken } from "@/middleware/auth";


export async function GET(req) {
  try {
    await connectMongoDB(); // connect DB ก่อน

    const userId = verifyToken(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId or itemId" },
        { status: 400 }
      );
    }

    const result = await getCart({ userId });
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
