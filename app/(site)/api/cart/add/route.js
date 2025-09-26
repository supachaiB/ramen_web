import { NextResponse } from "next/server";
import { addToCart } from "@/controllers/cartController";
import connectMongoDB from "@/libs/mongodb";
import { verifyToken } from "@/middleware/auth";


export async function POST(req) {
  try {
    await connectMongoDB(); // connect DB ก่อน

    const userId = verifyToken(req);
    const { itemId } = await req.json();
    // console.log(userId, itemId)
    if (!userId || !itemId) {
      return NextResponse.json(
        { success: false, message: "Missing userId or itemId" },
        { status: 400 }
      );
    }

    const result = await addToCart({ userId, itemId });
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
