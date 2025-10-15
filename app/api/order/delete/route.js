import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Order from "@/models/orderModel";

export async function DELETE(req) {
    try {
        await connectMongoDB();

        const body = await req.json();
        const { orderId } = body;

        if (!orderId) {
            return NextResponse.json({ success: false, message: "orderId is required" }, { status: 400 });
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Delete order error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
