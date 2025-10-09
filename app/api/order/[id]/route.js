import { NextResponse } from "next/server";
import orderModel from "@/models/orderModel";
import connectMongoDB from "@/libs/mongodb";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectMongoDB();

    const order = await orderModel.findById(id)
      .lean();

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (err) {
    console.error("Error fetching order:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
