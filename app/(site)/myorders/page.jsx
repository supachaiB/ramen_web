'use client'

import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../../StoreContext/StoreContext"
import axios from "axios";
import { assets } from "@/public/assets/assets";

export default function MyOrders() {
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post("/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // token หมดอายุหรือไม่ถูกต้อง
                alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
                // ตัวอย่าง: redirect ไปหน้า login
                window.location.href = "/LoginPopup";
            } else {
                console.error("เกิดข้อผิดพลาด:", error);
            }
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    const handleTrackOrder = async (orderId, index) => {
        try {
            const response = await axios.post(
                "/api/order/updateStatus",
                { orderId, status: "Delivered" },
                { headers: { token } }
            );

            if (response.data.success) {
                // อัปเดต UI
                setData(prev => prev.map((order, i) => i === index ? { ...order, status: 'Delivered' } : order));
            } else {
                alert("ไม่สามารถอัปเดตสถานะได้");
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดต:", error);
        }
    }

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            <div className="grid gap-4">
                {data.map((order, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border rounded shadow-sm bg-white">
                        <img src={assets.parcel_icon} alt="Parcel Icon" className="w-16 h-16" />

                        <div className="flex-1 flex flex-col gap-1">
                            <p className="text-sm text-gray-700">
                                {order.items.map((item, i) => {
                                    return i === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `;
                                })}
                            </p>
                            <p className="font-semibold">${order.amount}.00</p>
                            <p className="text-gray-500">Items: {order.items.length}</p>
                            <p className="text-sm">
                                <span className="text-green-500">&#x25cf;</span>
                                <b className="ml-1">{order.status}</b>
                            </p>
                        </div>

                        <button
                            className="mt-2 sm:mt-0 sm:ml-4 border-2 border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition"
                            onClick={() => handleTrackOrder(index)}
                        >
                            Track Order
                        </button>
                    </div>
                ))}
            </div>
        </div>

    )

}