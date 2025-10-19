"use client"

import { assets } from "@/public/assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "@/StoreContext/StoreContext";
import FoodImage from "./FoodImage";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from "next/link";
import ExploreMenu from "../Components/ExploreMenu";
import Image from "next/image"

export default function FoodItem({ lists, ratings, url }) {
    // console.log(lists, ratings, url)
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const [selectedCategory, setSelectedCategory] = useState(null);

    if (!url) {
        return null;
    }
    
    // filter 
    const filteredLists = selectedCategory
        ? lists.filter(l => l.category === selectedCategory)
        : lists;
    return (
    
        <div className="p-6">
            <ExploreMenu onCategorySelect={setSelectedCategory} />
            <h1 className="text-3xl font-bold mt-6 mb-4 text-center">Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {
                filteredLists.map(l => {
                    const count = cartItems[l._id] || 0;

                    // ✅ หาค่า avgRating และ reviewCount ของ item นั้นจาก items
                    const ratingData = ratings.find(r => r._id === l._id);
                    const avgRating = ratingData ? ratingData.avgRating : 0;
                    const reviewCount = ratingData ? ratingData.reviewCount : 0;

                    return (

                        <div
                            key={l._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg 
                            transition-transform hover:-translate-y-1 overflow-hidden relative"
                        >
                            {/* ส่วนของภาพ */}
                            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                <FoodImage url={url} imageUrl={l.imageUrl} name={l.name} />

                                {/* ปุ่มเพิ่ม / ลบสินค้า */}
                                {count === 0 ? (
                                    <button
                                        onClick={() => addToCart(l._id)}
                                        className="absolute bottom-3 right-3 w-[50px] h-[50px] flex items-center justify-center"
                                    >
                                        <Image
                                            src={assets.add_icon_white}
                                            alt="add"
                                            width={45}
                                            height={45}
                                            loading="lazy"
                                            className="cursor-pointer"
                                        />
                                    </button>
                                ) : (
                                    <div
                                        className="absolute bottom-3 right-3 flex items-center 
                                        gap-2 bg-white/80 backdrop-blur-md rounded-full 
                                        px-3 py-1 shadow-lg"
                                    >
                                        <button onClick={() => removeFromCart(l._id)}>
                                            <Image
                                                src={assets.remove_icon_red}
                                                alt="remove"
                                                width={40}
                                                height={40}
                                                loading="lazy"
                                                className="cursor-pointer"
                                            />
                                        </button>
                                        <p className="font-semibold text-gray-800">{count}</p>
                                        <button onClick={() => addToCart(l._id)}>
                                            <Image
                                                src={assets.add_icon_green}
                                                alt="add"
                                                width={40}
                                                height={40}
                                                loading="lazy"
                                                className="cursor-pointer"
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ส่วนรายละเอียด */}
                            <div className="p-4">
                                <p className="font-bold text-lg">{l.name}</p>
                                <p className="text-gray-600 text-sm line-clamp-2">{l.description}</p>
                                <p className="text-blue-600 font-semibold mt-2">฿{l.price}</p>

                                <div className="flex justify-between pt-3">
                                    {reviewCount > 0 ? (
                                        <div className="flex gap-2 text-sm items-center">
                                            <spcontent-centeran>{avgRating.toFixed(1)} </spcontent-centeran>
                                            {/* ⭐ แสดงดาวตาม avgRating */}
                                            <div className="flex">
                                                {Array.from({ length: 5 }).map((_, i) =>
                                                    i < Math.round(avgRating) ? (
                                                        <FaStar key={i} className="text-yellow-500 " />
                                                    ) : (
                                                        <FaRegStar key={i} className="text-gray-300 " />
                                                    )
                                                )}</div>

                                            <p className="text-gray-400 text-sm">
                                                ({reviewCount})
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-sm items-center">
                                            ({reviewCount} ยังไม่มีรีวิว)
                                        </p>
                                    )}
                                    <Link href={`/reviewPopup?itemId=${l._id}`}>
                                        <button className="bg-gray-200 hover:bg-gray-300 
                                    text-gray-800 px-3 py-1 rounded-full text-sm">
                                            Post review
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )

}






