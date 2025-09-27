'use client'
import { useContext, useState } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext";
import axios from "axios";

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
            { headers: { Authorization: `Bearer ${token}` } }   // ✅
        );
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error");
        }
    }

    return (
        <>
            <form onSubmit={placeOrder}>
                <div>
                    <p>Delivery Information</p>
                    <div>
                        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
                        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
                    </div>
                    <input required name='email' onChange={onChangeHandler} value={data.email} type="Email" placeholder="Email address" />
                    <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
                    <div>
                        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
                        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
                    </div>
                    <div>
                        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
                        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
                    </div>
                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
                </div>
                <div>
                    <div>
                        <h2>Cart Totals</h2>
                        <hr />
                        <div>
                            <p>Total</p>
                            <b>${getTotalCartAmount()}</b>
                        </div>
                    </div>
                    <button type="submit" className="cursor-pointer">PROCEED TO CHECKOUT</button>
                </div>
            </form>
        </>
    )
}

export default PlaceOrder