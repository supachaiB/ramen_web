'use client'

import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
import axios from "axios"

export default function TrackOrderPopup({ show, onClose, orderId }) {
  // const { id } = useParams()
  const [order, setOrder] = useState(null)

  const orderSteps = ["Food Processing", "Out for delivery", "Delivered"]

  useEffect(() => {
    if (!show || !orderId) return
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/order/${orderId}`)
        setOrder(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchOrder()
  }, [orderId, show])

  if (!show) return null
  if (!order) return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow w-96 text-center">Loading...</div>
    </div>
  )

  const currentStepIndex = orderSteps.indexOf(order.status)

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // ทำพื้นหลังโปร่ง
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="text-2xl font-semibold mb-6">Track Order</h1>
        <p className="mb-4">Order ID: <span className="font-medium">{order._id}</span></p>
        <p className="mb-6">Status: <span className="font-semibold">{order.status}</span></p>

        {/* Timeline */}
        <div className="flex justify-between items-center mb-4">
          {orderSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${index <= currentStepIndex ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"}`}
              >
                {index + 1}
              </div>
              <span className={`mt-2 text-sm text-center ${index <= currentStepIndex ? "text-green-600" : "text-gray-500"}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Items */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Items</h2>
          <ul className="list-disc list-inside text-gray-700">
            {order.items.map((item, i) => (
              <li key={i}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Amount: ${order.amount}</p>
        </div>
      </div>
    </div>
  )
}