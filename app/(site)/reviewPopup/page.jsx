'use client'
import { assets } from "@/public/assets/assets";
import { StoreContext } from "@/StoreContext/StoreContext";
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function reviewPopup() {
    const { url } = useContext(StoreContext);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0); // สำหรับ effect hover ดาว
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    //
    const foodId = "68da05823bafb042d3b1811c"
    const userId = "68cdbb575d07c2f94592ad55"

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !title || !comment) {
            alert("Please fill all fields");
        }

        try {
            const res = await fetch(url + "/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    foodId,
                    userId,
                    rating,
                    title,
                    comment,
                }),
            });

            const data = await res.json();
            if (data.success) {
                // หลังจากส่งอาจจะปิด popup หรือ reset form
                alert("Review submitted!")
                setRating(0);
                setTitle("");
                setComment("");
            } else {
                alert(" Error: " + data.message);
            }
                        console.log(foodId, userId, rating, title, comment)

        } catch (error) {
            console.error(err);
            alert("Server error");
        } 
    };

    return (
        <div className="absolute z-10 w-[100%] h-[100%] bg-gray-400 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rouded-lg  grid grid-cols-2"
            >
                <div className="space-y-2">
                    <p className="font-semibold">Rating</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={30}
                                className={`cursor-pointer ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                            />
                        ))}
                    </div>
                    <p className="font-semibold">Title</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="Add a title"
                        required
                    />
                    <p className="font-semibold">Comment</p>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="Write your comment"
                        required
                    />
                </div>

                <div className="grid grid-rows-2 items-center mt-4">
                    <p>Share your experience with this food</p>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit Review
                    </button>
                    <button
                        type="button"
                        className="text-gray-600 hover:underline"
                        onClick={() => alert("Maybe later clicked")}
                    >
                        Maybe Later
                    </button>
                </div>
            </form>
        </div>
    )
}