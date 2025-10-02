import connectMongoDB from "@/libs/mongodb";
import Gallery from "@/models/galleryModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const galleries = await Gallery.find({});

        return NextResponse.json({ success: true, data: galleries})
    
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}