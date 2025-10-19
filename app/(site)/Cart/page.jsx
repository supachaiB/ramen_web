
'use client'
import { useContext } from "react"
import Link from "next/link";
import { StoreContext } from "@/StoreContext/StoreContext";
import Image from "next/image";


export default function CartPage() {
    const { lists, cartItems, url, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    // console.log("lists:", lists);
    // console.log("cartItems:", cartItems);

    if (!url) {
        return null;
    }
    
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 pt-20">Shopping Cart</h1>

            <div className="hidden md:grid grid-cols-6 gap-3 font-semibold border-b pb-2">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>

            <br />
            <hr />

            <div className="mt-4 space-y-4">
                {lists.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id} className="border-b pb-2 md:grid grid-cols-6 gap-3 items-center flex flex-col md:flex-row">
                                <Image 
                                className="w-24 h-24 object-cover rounded" 
                                width={300}
                                height={300}
                                src={`${url}/uploads/${item.imageUrl}`} 
                                alt="" />
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>{item.price * cartItems[item._id]}</p>
                                <p onClick={() => removeFromCart(item._id)} className="cursor-pointer text-red-500 font-bold hover:text-red-700">x</p>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="">
                    <div className="w-full mt-6 p-4 border rounded bg-gray-50 ">
                        <h2 className="text-xl font-bold mb-2">Cart Totals</h2>
                        <hr />
                        <div className="flex justify-between mb-2">
                            <p>Total</p>
                            <b>${getTotalCartAmount()}</b>
                        </div>
                    </div>
                    <Link href="/order">
                        <button className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2">PROCEED TO CHECKOUT</button>
                    </Link>
                </div>
                <div className="mt-6 p-4 border rounded bg-gray-50 max-w-sm">
                    <p className="mb-2">If you have a promo code, Enter it here</p>
                    <div className="flex gap-2 flex-col sm:flex-row">
                        <input type="text" placeholder="promo code" className="flex-1 border rounded px-2 py-1" />
                        <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-70">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}