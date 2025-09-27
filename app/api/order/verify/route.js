import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import orderModel from "@/models/orderModel";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { orderId, success } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Missing orderId" },
        { status: 400 }
      );
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return NextResponse.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      return NextResponse.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error("Verify Order Error:", error);
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}
