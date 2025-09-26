import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { verifyToken } from "@/middleware/auth";
import { placeOrder } from "@/controllers/orderController";

export async function POST(req) {
  try {
    await connectMongoDB();
    const userId = verifyToken(req);
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
      baseUrl: process.env.BASE_URL,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
