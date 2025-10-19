'use client'

import { StoreContext } from "@/StoreContext/StoreContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function ListGallery() {
    const { url } = useContext(StoreContext)
    const [galleries, setGallery] = useState([])

    if (!url) {
        return null;
    }
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

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const res = await fetch(`$${url}/api/gallery/list/${id}`, {
                method: "DELETE"
            })
            const data = await res.json();
            if (data.success) {
                setLists(prev => prev.filter(item => item._id !== id)); // อัปเดต state
                alert("Deleted successfully")
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error("Delete error", error)
        }
    }
    console.log(galleries)
    return (
        <div className="list add flex-col p-4 gap-4">
            <p>All Foods List</p>
            <div className="list-table ">
                <div className="list-table-format title grid grid-cols-6 gap-4 font-bold border-b-2 border-gray-300 pb-2">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    {/* <b>Action</b> */}
                </div>
                {galleries.map((g) => (
                    <div key={g._id} className="list-table-format grid grid-cols-6 gap-4 font-bold border-b-2 border-gray-300 pb-2">
                        <Image src={`${url}/uploads/${g.imageUrl}`} alt={g.name}
                            width={150}
                            height={150}
                        />
                        <p>{g.name}</p>
                        <p>{g.category}</p>
                        <p onClick={() => handleDelete(g._id)} className="cursor cursor-pointer">X</p>
                    </div>
                ))}
            </div>
        </div>
    );

}






