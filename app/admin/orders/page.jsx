'use client'
import { assets } from "@/public/assets/assets";
import { StoreContext } from "@/StoreContext/StoreContext";
import axios from "axios"
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const { url } = useContext(StoreContext);
    
    if (!url) {
        return null;
    }
    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.log("fetchAllOrders Error", error);
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(url + "/api/order/status", {
                orderId,
                status: event.target.value
            });
            if (response.data.success) {
                await fetchAllOrders();
            }
        } catch (error) {
            console.log("Status update error", error);
        }
    }

    const deleteOrder = async (orderId) => {
        try {
            const response = await axios.delete(url + "/api/order/delete", { data: { orderId } });
            if (response.data.success) {
                await fetchAllOrders();
            }
        } catch (error) {
            console.log("Delete order error", error);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Order Page</h3>
            <div className="flex flex-col gap-4">
                {orders.map((order) => (
                    <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                        {/* Left: Info */}
                        <div className="flex items-start sm:items-center gap-4 flex-1">
                            <Image
                                src={assets.parcel_icon}
                                alt="Parcel"
                                width={60}
                                height={50}
                            />
                            <div className="flex flex-col gap-1 text-sm">
                                <p>{order.items.map((item, idx) =>
                                    idx === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                )}</p>
                                <p>{order.address.firstName} {order.address.lastName}</p>
                                <p className="text-gray-500 text-sm">{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                <p className="text-gray-500 text-sm">{order.address.phone}</p>
                                <p className="text-gray-600 text-sm">Items: {order.items.length} | Total: ${order.amount}</p>
                            </div>
                        </div>

                        {/* Right: Status + Buttons */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-2 mt-2 sm:mt-0">
                            <select
                                onChange={(e) => statusHandler(e, order._id)}
                                value={order.status}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>

                            <button
                                onClick={() => deleteOrder(order._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
