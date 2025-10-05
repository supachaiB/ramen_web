'use client'

import { useEffect, useState } from "react";

const url = "http://localhost:3000";

export default function ExploreMenu({ onCategorySelect }) {
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        async function fetchMenus() {
            try {
                const response = await fetch(url + "/api/menuitems", { cache: "no-store" });
                const data = await response.json();
                if (Array.isArray(data.menus)) {
                    setMenus(data.menus);

                    const uniqueCategories = [...new Set(data.menus.map(m => m.category))];
                    const categoriesWithImage = uniqueCategories.map(cat => {
                        const items = data.menus.filter(m => m.category === cat);
                        const randomItem = items[Math.floor(Math.random() * items.length)];
                        return { category: cat, imageUrl: randomItem.imageUrl };
                    });
                    setCategories(categoriesWithImage);
                }
            } catch (err) {
                console.error("Error loading menus:", err);
            }
        }

        fetchMenus();
    }, []);

    const handleSelect = (cat) => {
        setSelectedCategory(cat);
        if (onCategorySelect) {
            onCategorySelect(cat); // ✅ ส่งค่ากลับไป
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">🍜 Explore Menu</h2>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {categories.map(cat => (
                    <div
                        key={cat.category}
                        className={`cursor-pointer rounded overflow-hidden shadow-lg hover:scale-105 transition 
                        ${selectedCategory === cat.category ? "ring-4 ring-orange-400" : ""}`}
                        onClick={() => handleSelect(cat.category)}
                    >
                        <img
                            src={`${url}/uploads/${cat.imageUrl}`}
                            alt={cat.category}
                            className="h-32 w-full object-cover"
                        />
                        <p className="text-center py-2 font-semibold capitalize">{cat.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
