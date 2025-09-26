import connectMongoDB from "@/libs/mongodb";
import MenuItem from "@/models/menuItemModel";
import { NextResponse } from "next/server";
import path from "path"; 
import fs from "fs";

export async function DELETE(req, { params }) {
    try {
        await connectMongoDB();

        const id = params.id

        //หา item
        const item = await MenuItem.findById(id);
        if (!item) {
            return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 })
        }

        // ลบไฟล์ภาพจาก /public/uploads
        const filePath = path.join(process.cwd(), "public", "uploads", item.imageUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // ลบจาก DB และเก็บค่าที่ลบไว้ กัน error
        const deleted = await MenuItem.findOneAndDelete(id);

        return NextResponse.json({ success: true, message: "Deleted Successfully", item: deleted })
    } catch (error) {
        console.log("Delete error:", error)
    }
}