'use client'

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch("/api/reviews");
                const data = await res.json();
                if (data.success) {
                    setReviews(data.reviews);
                }
            } catch (err) {
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, []);

    if (loading) return <p>Loading reviews...</p>;

    // ฟังก์ชัน render ดาว
    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">คะแนนของอาหาร</h1>
            {reviews.length === 0 ? (
                <p className="text-gray-500">ยังไม่มีรีวิว</p>
            ) : (
                <div className="space-y-4 grid grid-cols-2 gap-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="border p-3 rounded shadow-sm">
                            <div className="flex items-center gap-2">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleString()}
                            </p>
                            <span className="font-semibold">{review.title}</span>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
