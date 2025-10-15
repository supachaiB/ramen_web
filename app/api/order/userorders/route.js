import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/libs/mongodb";
import orderModel from "@/models/orderModel";
import { verifyToken } from "@/middleware/auth";

export async function POST(req) {
  try {
    await connectMongoDB();

    let userId;
    try {
      const decoded = verifyToken(req);
      userId = decoded.id;

      // ตรวจสอบ userId ว่าถูกต้อง
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
      }
    } catch (err) {
      return NextResponse.json({ success: false, message: err.message }, { status: 401 });
    }

    // query order ของ user (แปลงเป็น ObjectId)
    let orders = await orderModel.find({ user: new mongoose.Types.ObjectId(userId) }).lean();

    // fallback สำหรับ field createdAt
    orders = orders.map(order => ({
      ...order,
      createdAt: order.createdAt || order.data
    }));

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Error" }, { status: 500 });
  }
}
