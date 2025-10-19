"use client"; // บังคับ render ฝั่ง client

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Loading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // รันเฉพาะฝั่ง client
  }, []);

  if (!mounted) return null; // รอให้ client mount

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>,
    document.body
  );
}
