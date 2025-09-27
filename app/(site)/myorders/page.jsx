'use client'

import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../../StoreContext/StoreContext"
import axios from "axios";

export default function MyOrders() {
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post("/api/order/userorders", {}, {headers:{token}})
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    }, [token])
    return (
        <div>
            test hello 
        </div>
    )

}