'use client'
import { assets } from "@/public/assets/assets";
import axios from "axios"
import { useEffect, useState } from "react";



export default function Orders() {
    const [orders, setOrders] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URI

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(baseUrl + "/api/order/list");
            if (response.data.success) {
                setOrders(response.data.data);
            }
            else (error) => {
                console.log(error)
            }
        } catch (error) {
            console.log("fetchAllOrders Error", error)
        }

    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(baseUrl + "/api/order/status",{
            orderId,
            status:event.target.value
        })
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

    return (
        <div className="">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + " , "
                                    }
                                })}
                            </p>
                            <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}