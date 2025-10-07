import connectMongoDB from "@/libs/mongodb";
import MenuItem from "@/models/menuItemModel";
import Review from "@/models/reviewModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const foodId = searchParams.get("foodId");

    // ✅ ถ้ามี foodId — แสดง avg เฉพาะ item นั้น
    if (foodId) {
      const reviews = await Review.find({ foodId });

      if (reviews.length === 0) {
        return NextResponse.json({ avgRating: 0, reviewCount: 0 });
      }

      const total = reviews.reduce((sum, r) => sum + r.rating, 0);
      const avg = total / reviews.length;

      // ✅ อัปเดตใน MenuItem ด้วย (optional)
      await MenuItem.findByIdAndUpdate(foodId, {
        avgRating: avg.toFixed(1),
        reviewCount: reviews.length,
      });

      return NextResponse.json({
        foodId,
        avgRating: parseFloat(avg.toFixed(1)),
        reviewCount: reviews.length,
      });
    }

    // ✅ ถ้าไม่มี foodId — แสดง avg ของทุก item
    const menuItems = await MenuItem.find();

    const data = await Promise.all(
      menuItems.map(async (item) => {
        const reviews = await Review.find({ foodId: item._id });
        const avg =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        return {
          _id: item._id,
          name: item.name,
          avgRating: parseFloat(avg.toFixed(1)),
          reviewCount: reviews.length,
        };
      })
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
