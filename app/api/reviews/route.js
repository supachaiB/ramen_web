import connectMongoDB from "@/libs/mongodb";
import { verifyToken } from "@/middleware/auth";
import reviewModel from "@/models/reviewModel";
import { NextResponse } from "next/server";

// GET: ดึงรีวิวทั้งหมด
export async function GET(req) {
    try {
        await connectMongoDB();
        const reviews = await reviewModel.find().sort({ createdAt: -1});
        return NextResponse.json({ success: true, reviews });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message },{ status: 500 });
    }
}

//POST: เพิ่มรีวิวใหม่
export async function POST(req) {
  try {
    await connectMongoDB();

    const userId = verifyToken(req); 
    const body = await req.json();
    const { foodId, rating, title, comment } = body;

    if (!foodId || !userId || !rating || !title || !comment) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const review = await reviewModel.create({ foodId, userId, rating, title, comment });
    return NextResponse.json({ success: true, review });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
