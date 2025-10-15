import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import orderModel from "@/models/orderModel";
import { verifyToken } from "@/middleware/auth";

export async function POST(req) {
  try {
    await connectMongoDB();

    // ตรวจ token ผ่านฟังก์ชันที่มีอยู่แล้ว
    let userId;
    try {
      const decoded = verifyToken(req); // จะดึงจาก req.headers.authorization
      userId = decoded.id; // ✅ แยก id
    } catch (err) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 401 }
      );
    }

    // query order ของ user
    const orders = await orderModel.find({ user: userId }); // ✅ field ที่เชื่อมกับ user

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    return NextResponse.json(
      { success: false, message: "Error" },
      { status: 500 }
    );
  }
}
