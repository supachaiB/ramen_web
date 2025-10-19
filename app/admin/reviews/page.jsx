"use client";
import { StoreContext } from "@/StoreContext/StoreContext";
import { useContext, useEffect } from "react";

export default function ReviewEdit() {
  const { reviews, setReviews, url } = useContext(StoreContext);

   if (!url) {
        return null;
    }
  // โหลดรีวิวทั้งหมด
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(url + "/api/reviews");
        const data = await res.json();
        console.log("API data:", data);

        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Fetch reviews error:", err);
        setReviews([]);
      }
    }

    fetchReviews();
  }, [url]);

  // ฟังก์ชันลบรีวิว
  async function handleDelete(id) {
    if (!confirm("ต้องการลบรีวิวนี้หรือไม่?")) return;

    try {
      const res = await fetch(url + `/api/reviews/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("ลบรีวิวสำเร็จ!");
        setReviews(reviews.filter((r) => r._id !== id)); // อัปเดต state
      } else {
        alert("ลบไม่สำเร็จ");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("เกิดข้อผิดพลาดในการลบ");
    }
  }

  // {reviews === null ? ( แสดงแท่งสีเทาแทน table → layout ไม่ขยับมาก → CLS ลด
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">จัดการรีวิว (Admin)</h1>

      {reviews === null ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded animate-pulse w-full" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีรีวิว</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">ชื่อเรื่อง</th>
                <th className="border p-2">คอมเมนต์</th>
                <th className="border p-2">เรตติ้ง</th>
                <th className="border p-2">วันที่</th>
                <th className="border p-2 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, i) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2 font-semibold">{r.title}</td>
                  <td className="border p-2">{r.comment}</td>
                  <td className="border p-2">{r.rating} ★</td>
                  <td className="border p-2 text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
