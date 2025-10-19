// app/components/ExploreMenu.js
'use client'

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/StoreContext/StoreContext";

export default function ExploreMenu({ onCategorySelect }) {
    const { url } = useContext(StoreContext);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    if (!url) {
        return null;
    }

    const categoryOrder = ["ramen", "side menu", "drink"];
    const categoryNames = {
        ramen: "เมนูหลัก",
        "side menu": "เมนูเสริม",
        drink: "เครื่องดื่ม",
    };


    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(url + "/api/menuitems", { cache: "no-store" });
                const data = await res.json();
                if (Array.isArray(data.menus)) {
                    const uniqueCategories = [...new Set(data.menus.map(m => m.category))];
                    const categoriesWithImage = uniqueCategories.map(cat => {
                        const items = data.menus.filter(m => m.category === cat);
                        const firstItem = items[0]; // ✅ ใช้ภาพแรกแทน random
                        return { category: cat, imageUrl: firstItem?.imageUrl || "" };
                    });
                    // เรียงตาม order
                    categoriesWithImage.sort((a, b) =>
                        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
                    setCategories(categoriesWithImage);
                }
            } catch (err) {
                console.error("Error loading categories:", err);
            }
        }

        fetchCategories();
    }, [url]);

    const handleSelect = (cat) => {
        if (selectedCategory === cat) {
            setSelectedCategory(null);
            onCategorySelect?.(null);
        } else {
            setSelectedCategory(cat);
            onCategorySelect?.(cat);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4 pt-10">Explore Menu</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {categories.map(cat => (
                    <div
                        key={cat.category}
                        className={`cursor-pointer rounded overflow-hidden shadow-lg hover:scale-105 transition
              ${selectedCategory === cat.category ? "ring-4 ring-orange-400" : ""}`}
                        onClick={() => handleSelect(cat.category)}
                    >
                        <Image
                            src={`${url}/uploads/${cat.imageUrl}`}
                            alt={cat.category}
                            width={350}
                            height={350}
                            className="h-32 w-full object-cover"
                            loading="lazy"
                        />
                        <p className="text-center py-2 font-semibold capitalize">
                            {categoryNames[cat.category] || cat.category}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
