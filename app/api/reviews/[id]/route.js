import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import ReviewModel from "@/models/reviewModel";

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const review = await ReviewModel.findByIdAndDelete(id);
    if (!review) {
      return NextResponse.json({ success: false, message: "ไม่พบรีวิว" });
    }

    return NextResponse.json({ success: true, message: "ลบรีวิวสำเร็จ" });
  } catch (err) {
    console.error("Delete review error:", err);
    return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาด" });
  }
}
