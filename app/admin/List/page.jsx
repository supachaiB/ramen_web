'use client'

import { useEffect, useState } from "react";

const url = "http://localhost:3000";

export default function List() {
    const [lists, setLists] = useState([])

    // ดึงข้อมูล API
    useEffect(() => {
        async function getFood() {
            try {
                const response = await fetch(`${url}/api/menuitems`, {
                    cache: "no-store", // กัน cache เวลาพัฒนา
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch lists");
                }
                const data = await response.json();
                setLists(Array.isArray(data.menus) ? data.menus : data);
            } catch (error) {
                console.log("Error get", error)
                setLists([]); // fallback เป็น array ว่าง
            }
        }
        getFood();
    }, [])


    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const res = await fetch(`${url}/api/menuitems/${id}`, {
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

    console.log(lists)
    return (
        <div className="list add flex-col p-4 gap-4">
            <p>All Foods List</p>
            <div className="list-table ">
                <div className="list-table-format title grid grid-cols-6 gap-4 font-bold border-b-2 border-gray-300 pb-2">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {lists.map((l) => (
                    <div key={l._id} className="list-table-format grid grid-cols-6 gap-4 font-bold border-b-2 border-gray-300 pb-2">
                        <img src={`${url}/uploads/${l.imageUrl}`} alt={l.name} className="" />
                        <p>{l.name}</p>
                        <p>{l.category}</p>
                        <p>{l.description}</p>
                        <p>${l.price}</p>
                        <p onClick={() => handleDelete(l._id)} className="cursor cursor-pointer">X</p>
                    </div>
                ))}
            </div>
        </div>
    );

}






