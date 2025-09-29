import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { verifyToken } from "@/middleware/auth";
import { placeOrder } from "@/controllers/orderController";


export async function POST(req) {
  try {
    await connectMongoDB();

    const userId = verifyToken(req); // ✅ ได้ userId
    const body = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId" },
        { status: 400 }
      );
    }

    const result = await placeOrder({
      userId,
      items: body.items,
      amount: body.amount,
      address: body.address,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
