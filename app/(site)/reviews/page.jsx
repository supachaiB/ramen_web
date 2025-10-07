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
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">คะแนนของอาหาร</h1>
            {reviews.length === 0 ? (
                <p className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">ยังไม่มีรีวิว</p>
            ) : (
                <div className="space-y-4 grid grid-cols-2 gap-4">
                    {reviews.map((review) => (
                        <div key={review._id} 
                        className="bg-white border border-gray-200 
                        rounded-2xl shadow-sm 
                        hover:shadow-md transition-all duration-200 p-5"
                        >
                            <div className="flex items-center justify-between mb-2">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-xs text-gray-400">
                                {new Date(review.createdAt).toLocaleString()}
                            </p>
                            <span className="font-semibold text-gray-800 mb-1">{review.title}</span>
                            <p className="font-semibold text-gray-800 mb-1">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
