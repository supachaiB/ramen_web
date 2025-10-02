import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Gallery from "@/models/galleryModel";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {

        //get of formBata in body
        const formData = await req.formData();

        const name = formData.get("name");
        const category = formData.get("category");
        const file = formData.get("imageUrl"); // field ใน form-data

        let imageUrl = null; // ประกาศตัวแปรก่อนใช้
        if (!file) {
            return NextResponse.json(
                { error: "Image is required" },
                { status: 400 }
            );
        }

        //save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);


        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(filepath, buffer);
        console.log(filename)

        imageUrl = `${filename}`;



        await connectMongoDB();

        //ยิง post
        const galleryItem = await Gallery.create({
            name,
            category,
            imageUrl
        });

        return NextResponse.json(
            { message: "Menu Created", data: galleryItem },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: "Something went wrong", details: error.message },
            { status: 500 }
        );
    }
}