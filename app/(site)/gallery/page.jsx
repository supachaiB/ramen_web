'use client'

import { useState, useEffect } from "react";

const url = "http://localhost:3000";

export default function Gallery() {
    const [galleries, setGallery] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null) // index ของรูปที่เลือก

    // ดึงข้อมูล API
    useEffect(() => {
        async function getGallery() {
            try {
                const response = await fetch(`${url}/api/gallery/list`, {
                    cache: "no-store", // กัน cache เวลาพัฒนา
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch lists");
                }
                const data = await response.json();
                console.log("API response:", data);

                // กรองให้เป็น array แน่นอน
                if (Array.isArray(data)) {
                    setGallery(data);
                } else if (Array.isArray(data.data)) {
                    setGallery(data.data);
                } else {
                    setGallery([]); // fallback กัน error
                }
            } catch (error) {
                console.log("Error get", error)
                setGallery([]); // fallback เป็น array ว่าง
            }
        }
        getGallery();
    }, [])
    console.log(galleries)

    // ฟังก์ชันเปิด modal
    const openModal = (index) => {
        setCurrentIndex(index);
    }

    // ฟังก์ชันปิด modal
    const closeModal = () => {
        setCurrentIndex(null);
    }

    // เลื่อนไปยังรูปก่อนหน้า
    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? galleries.length - 1 : prev - 1
        );
    }

    // เลื่อนไปยังรูปถัดไป
    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === galleries.length - 1 ? 0 : prev + 1
        );
    }

    return (
        <>
            <div className="text-center text-2xl font-bold my-5">Gallery</div>

            {/* แสดงรูปเล็ก grid */}
            <div className="grid gap-3 grid-cols-3 m-10">
                {galleries.map((g, i) => (
                    <div key={g._id} className="cursor-pointer">
                        <img
                            src={`${url}/uploads/${g.imageUrl}`}
                            alt={g.name}
                            className="w-65 h-65 object-cover rounded hover:scale-105 transition-transform"
                            onClick={() => openModal(i)}
                        />
                        <p>{g.name}</p>
                        <p>{g.category}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {currentIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
                    {/* ปิด */}
                    <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 text-white text-3xl font-bold"
                    >
                        ✕
                    </button>

                    {/* ปุ่มเลื่อนซ้าย */}
                    <button
                        onClick={prevImage}
                        className="absolute left-5 text-white text-4xl font-bold"
                    >
                        ‹
                    </button>

                    {/* กล่องรูป + thumbnail */}
                    <div className="flex flex-col items-center">
                        {/* รูปหลัก */}
                        <img
                            src={`${url}/uploads/${galleries[currentIndex].imageUrl}`}
                            alt={galleries[currentIndex].name}
                            className="max-h-[70vh] max-w-[80vw] object-contain mb-4"
                        />

                        {/* Thumbnail อยู่ด้านล่างรูป */}
                        <div className="flex gap-2 overflow-x-auto max-w-[80vw] p-2">
                            {galleries.map((g, i) => (
                                <img
                                    key={g._id}
                                    src={`${url}/uploads/${g.imageUrl}`}
                                    alt={g.name}
                                    className={`w-20 h-20 object-cover cursor-pointer rounded 
                                        ${i === currentIndex ? "ring-4 ring-white" : "opacity-60"}`}
                                    onClick={() => setCurrentIndex(i)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ปุ่มเลื่อนขวา */}
                    <button
                        onClick={nextImage}
                        className="absolute right-5 text-white text-4xl font-bold"
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    )
}

