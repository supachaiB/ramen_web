'use client'

import { assets } from "@/public/assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext"
import ExploreMenu from "../Components/ExploreMenu";
import Link from "next/link";
import { FaStar } from "react-icons/fa"; 


export default function FoodItem() {
    const { url, lists, cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const [selectedCategory, setSelectedCategory] = useState(null);

 // filter เมนู
    const filteredLists = selectedCategory
        ? lists.filter(l => l.category === selectedCategory)
        : lists;


    return (
        <>
            <ExploreMenu onCategorySelect={setSelectedCategory} />
            <h1 className="text-4xl">Menu</h1>
            <div className="grid gap-3 grid-cols-3 m-10">
                {filteredLists.map((l) => {
                    const count = cartItems[l._id] || 0
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

                                {/* ⭐ แทน assets.rating_starts */}
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

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

        </>
    )

}






