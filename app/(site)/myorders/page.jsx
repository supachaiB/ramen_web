'use client'

import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../../StoreContext/StoreContext"
import axios from "axios";
import { assets } from "@/public/assets/assets";
import TrackOrderPopup from "../trackorder/[id]/page.jsx";

export default function MyOrders() {
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.post("/api/order/userorders", {}, { headers: { token } });
             // เรียงจากล่าสุด -> เก่าสุด field data = date - เขียนผิดใช้เป็น data ไป
            const sortedData = response.data.data.sort(
                (a, b) => new Date(b.data) - new Date(a.data)
            );
            setData(sortedData);
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

     return (
        <div className="my-orders px-4 py-6 sm:px-6 lg:px-10">
            <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">My Orders</h2>

            <div className="flex flex-col gap-6">
                {data.map((order, index) => {
                    const orderDate = new Date(order.data).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                    return (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-xl bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Left side: image + details */}
                            <div className="flex items-start sm:items-center gap-4 flex-1">
                                <img src={assets.parcel_icon} alt="" className="w-12 h-12 sm:w-14 sm:h-14" />
                                <div className="flex flex-col gap-1 text-sm sm:text-base">
                                    <p className="text-gray-700">
                                        {order.items.map((item, idx) =>
                                            idx === order.items.length - 1
                                                ? `${item.name} x ${item.quantity}`
                                                : `${item.name} x ${item.quantity}, `
                                        )}
                                    </p>
                                    <p className="text-gray-600">Items: {order.items.length}</p>
                                    <p className="text-gray-600">Total: ${order.amount}.00</p>
                                    <p className="text-gray-500 text-xs sm:text-sm"> {orderDate}</p>
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
                    );
                })}
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