'use client'
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const PlaceOrder = () => {
    const { lists, cartItems, getTotalCartAmount, url, token } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();

        if (!token) {
            alert("กรุณา Login ก่อนทำการสั่งซื้อ");
            return;
        }

        let orderItems = [];
        lists.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        // console.log(orderItems);
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount()
        }
        let response = await axios.post(
            url + "/api/order/place",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }   
        );
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error");
        }
    }

    const router = useRouter();

    useEffect(() => {
        if (!token || getTotalCartAmount() === 0) {
            router.push('/cart')
        }
    }, [token])

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Place Order</h1>
            <form onSubmit={placeOrder} className="flex flex-col md:flex-row gap-6">

                <div className="flex-1 space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" className="flex-1 border rounded px-3 py-2" />
                        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" className="flex-1 border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input required name='email' onChange={onChangeHandler} value={data.email} type="Email" placeholder="Email address" className="flex-1 border rounded px-3 py-2" />
                        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" className="flex-1 border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" className="flex-1 border rounded px-3 py-2" />
                        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" className="flex-1 border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" className="flex-1 border rounded px-3 py-2" />
                        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" className="flex-1 border rounded px-3 py-2" />
                    </div>
                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" className="flex-1 border rounded px-3 py-2"/>
                </div>

                <div className="w-full md:w-1/3 flex-shrink-0 space-y-4">
                    <div className="p-4 border rounded bg-gray-50">
                        <h2 className="text-xl font-semibold mb-2">Cart Totals</h2>
                        <hr />

                        <div className="flex justify-between mb-2">
                            <p>Total</p>
                            <b>${getTotalCartAmount()}</b>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder