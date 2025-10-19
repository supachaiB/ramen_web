'use client'

import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../../StoreContext/StoreContext"
import axios from "axios";
import { assets } from "@/public/assets/assets";
import TrackOrderPopup from "../trackorder/[id]/page.jsx";
import Image from "next/image";

export default function MyOrders() {
    const { token, orders, setOrders } = useContext(StoreContext);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
            const res = await axios.post("/api/order/userorders", {}, { headers: { token } });
            console.log("Orders from API:", res.data.data); // ดูข้อมูลจริง

            // เรียงจากล่าสุด → เก่าสุด
            const sorted = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setOrders(sorted)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) fetchOrders();
    }, [token])

    const handleTrackOrder = (id) => {
        setSelectedOrderId(id);
        setShowPopup(true);
    }

    const formatDateTime = (date) => date ? new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }) : "Not Paid"

    return (
        <div className="my-orders px-4 py-6 sm:px-6 lg:px-10">
            <h2 className="text-2xl font-bold mb-6 text-center sm:text-left pt-20">My Orders</h2>

            <div className="flex flex-col gap-6">
                {orders.map((order, idx) => (
                    <div
                        key={idx}
                        className="border border-gray-300 rounded-xl bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Left side: image + details  */}
                        <div className="flex items-start sm:items-center gap-4 flex-1">
                            <Image
                                src={assets.parcel_icon}
                                alt="parcel"
                                width={80}
                                height={80}
                            />
                            <div className="flex flex-col gap-1 text-sm sm:text-base">
                                <p className="text-gray-700">
                                    {order.items.map((item, i) =>
                                        i === order.items.length - 1
                                            ? `${item.name} x ${item.quantity}`
                                            : `${item.name} x ${item.quantity}, `
                                    )}
                                </p>
                                <p className="text-gray-600">Items: {order.items.length}</p>
                                <p className="text-gray-600">Total: ${order.amount}.00</p>
                                <p className="text-gray-500 text-xs sm:text-sm">Created: {formatDateTime(order.createdAt)}</p>
                                <p className="text-gray-500 text-xs sm:text-sm">Paid At: {formatDateTime(order.paidAt)}</p>
                            </div>
                        </div>

                        {/* Right side: status + button */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                            <p className="text-sm sm:text-base">
                                <span className="text-green-500">&#x25cf;</span>{" "}
                                <b>{order.status}</b>
                            </p>

                            <button
                                onClick={() => handleTrackOrder(order._id)}
                                className="mt-2 sm:mt-0 border-2 border-blue-500 text-blue-500 px-4 py-1.5 rounded-md hover:bg-blue-500 hover:text-white transition"
                            >
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal */}
            {showPopup && selectedOrderId && (
                <TrackOrderPopup
                    show={showPopup}
                    onClose={() => setShowPopup(false)}
                    orderId={selectedOrderId}
                />
            )}
        </div>
    );
}