'use client'

import { assets } from "@/public/assets/assets";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext"
import ExploreMenu from "../Components/ExploreMenu";
import Link from "next/link";
import { FaStar } from "react-icons/fa";


export default function FoodItem() {
    const { url, lists, cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [items, setItems] = useState([]);

    // filter เมนู
    const filteredLists = selectedCategory
        ? lists.filter(l => l.category === selectedCategory)
        : lists;

    useEffect(() => {
        async function fetchRatings() {
            const res = await fetch("/api/ratings");
            const data = await res.json();
            console.log("⭐ Ratings data:", data);

            setItems(data.map(d => ({
                ...d,
                _id: d._id || d.id,  // ✅ รองรับทั้ง id และ _id
            })));
        }
        fetchRatings();
    }, []);


    return (
        <div className="p-6">
            <ExploreMenu onCategorySelect={setSelectedCategory} />
            <h1 className="text-4xl">Menu</h1>
            <div className="grid gap-3 grid-cols-3 ">
                {filteredLists.map((l) => {
                    const count = cartItems[l._id] || 0;

                    // ✅ หาค่า avgRating และ reviewCount ของ item นั้นจาก items
                    const ratingData = items.find((r) => r._id === l._id);
                    const avgRating = ratingData ? ratingData.avgRating : 0;
                    const reviewCount = ratingData ? ratingData.reviewCount : 0;

                    return (
                        <div key={l._id}>
                            <img
                                src={`${url}/uploads/${l.imageUrl}`}
                                alt={l.name}
                                className="w-65 h-65 object-cover rounded"
                            />
                            {count === 0 ? (
                                <img
                                    className="add cursor-pointer"
                                    onClick={() => addToCart(l._id)}
                                    src={assets.add_icon_white}
                                />

                            ) : (
                                <div className="food-item-counter">
                                    <img
                                        onClick={() => removeFromCart(l._id)}
                                        src={assets.remove_icon_red}
                                        alt="remove"
                                    />
                                    <p>{count}</p>
                                    <img
                                        onClick={() => addToCart(l._id)}
                                        src={assets.add_icon_green}
                                        alt="add" />
                                </div>
                            )}

                            {/* รายละเอียด */}
                            <div className="mt-3">
                                <p className="font-bold">{l.name}</p>

                                {reviewCount > 0 ? (
                                    <>
                                        <p><FaStar/> {avgRating.toFixed(1)} / 5</p>
                                        <p className="text-gray-500 text-sm">
                                            ({reviewCount} รีวิว)
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-500 text-sm">
                                            ({reviewCount} รีวิว)
                                        </p>
                                )}

                                <Link href={`/reviewPopup?itemId=${l._id}`}>
                                    <button className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded mt-2">
                                        Post review
                                    </button>
                                </Link>
                            </div>

                            <p>รายละเอียด: {l.description}</p>
                            <p>ประเภท: {l.category}</p>
                            <p>ราคา: ฿{l.price}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )

}






