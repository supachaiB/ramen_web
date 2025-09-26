//API route

import connectMongoDB from "@/libs/mongodb";
import MenuItem from "@/models/menuItemModel";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


export async function POST(req) {
    try {

        //get of formBata in body
        const formData = await req.formData();

        const name = formData.get("name");
        const description = formData.get("description");
        const price = Number(formData.get("price"));
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
        const newItem = await MenuItem.create({
            name,
            description,
            price,
            category,
            imageUrl
        });

        return NextResponse.json(
            { message: "Menu Created", data: newItem },
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

export async function GET() {
    try {
        await connectMongoDB();
        const menus = await MenuItem.find({});

        return NextResponse.json(
            { menus }
        )
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

