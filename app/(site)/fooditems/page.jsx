'use client'

import { assets } from "@/public/assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext"


export default function FoodItem() {
    const { url, lists, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    // const [itemCount, setItemCount] = useState(0)


    

    return (
        <>
            <h1 className="text-4xl">Menu</h1>
            <div className="grid gap-3 grid-cols-3 m-10">
                {lists.map((l) => {
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

                            <div>
                                <p>{l.name}</p>
                                <img src={assets.rating_starts} alt="" />
                            </div>
                            <p>รายละเอียด: {l.description}</p>
                            <p>ประเภท: {l.category}</p>
                            <p>ราคา: ฿{l.price}</p>
                        </div>
                    )
                })}
            </div>

        </>
    );

}






