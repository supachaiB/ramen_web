'use client'
import { useContext } from "react"
import { StoreContext } from "../../../StoreContext/StoreContext";
import Link from "next/link";


export default function CartPage() {
    const { lists, cartItems, url, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    // console.log("lists:", lists);
    // console.log("cartItems:", cartItems);

    return (
        <div>
            <div>
                <div className="grid grid-cols-6 gap-3">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />

                {lists.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id} className=" grid grid-cols-6 gap-3 items-center">
                                <img className="w-30 h-30 object-cover rounded" src={`${url}/uploads/${item.imageUrl}`} alt="" />
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>{item.price * cartItems[item._id]}</p>
                                <p onClick={() => removeFromCart(item._id)} className="cross cursor-pointer">x</p>
                            </div>
                        )
                    }
                })}
                <div>
                    <div>
                        <h2>Cart Totals</h2>
                        <hr />
                        <div>
                            <p>Total</p>
                            <b>${getTotalCartAmount()}</b>
                        </div>
                    </div>
                    <Link href="/order">
                        <button className="cursor-pointer">PROCEED TO CHECKOUT</button>
                    </Link>
                </div>
                <div>
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div>
                            <input type="text" placeholder="promo code" />
                            <button className="">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}