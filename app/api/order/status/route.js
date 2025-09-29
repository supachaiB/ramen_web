import connectMongoDB from "@/libs/mongodb";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectMongoDB();

    try {
        // ดึงค่า request body
        const { orderId, status } = await req.json();

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // คืนค่าหลังอัปเดต
        );

        if (!updatedOrder) {
            return NextResponse.json({ success: false, message: "Order not found" });
        }

        return NextResponse.json({ success: true, message: "Status Updated", data: updatedOrder });
    } catch (error) {
        console.log("POST /api/order/status Error:", error);
        return NextResponse.json({ success: false, message: "Something went wrong" });
    }
}
