import connectMongoDB from "@/libs/mongodb";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";

// Listing orders for admin panel
export async function GET(req) {
    try {
        await connectMongoDB();

        const orders = await orderModel.find({})
        
        return NextResponse.json({ success: true, data: orders})
    } catch (error) {
        console.error("Admin Orders Error:", error)
        return NextResponse.json(
            { success: false, message: "Error admin orders"},
            { status: 500 }
        )
    }
}