'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import './Verify.css';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const response = await axios.post("/api/order/verify", {
        success,
        orderId
      });

      if (response.data.success) {
        router.push("/myorders");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Payment verification failed:", err);
      router.push("/");
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    }
  }, [success, orderId]);

  return (
    <div className="verify min-h-[60vh] grid place-items-center">
      <div className="spinner w-[100px] h-[100px]" />
    </div>
  );
}
