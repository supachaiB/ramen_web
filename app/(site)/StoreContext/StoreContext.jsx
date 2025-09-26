'use client'

import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const url = "http://localhost:3000"

    const [lists, setLists] = useState([])

    const [token, setToken] = useState("")

    //cartItems เป็นตัวแปรที่เริ่มว่าง {} แต่ ต้องเอาเข้าจาก context เพื่อให้ ทุกหน้าใช้ state ตัวเดียวกัน ถ้าสร้างใหม่เฉย ๆ → ข้อมูล cart จะไม่ sync ระหว่างหน้า
    const [cartItems, setCartItems] = useState({})

    // add to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    // remove from cart
    const removeFromCart = async (itemId) => {
        // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        // if (token) {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId]; // ลบออกถ้าเหลือ 0
            }
            return updatedCart;
        })
        if (token) {
            await axios.delete(url + "/api/cart/remove",
                {
                    headers: { token },
                    data: { itemId }   //DELETE ต้องส่ง body ผ่าน field data

                },
            )
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = lists.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    // load cart data
    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", {
                headers: { token }
            });
            setCartItems(response.data.cart || {}); // fallback
            // console.log("cart GET response:", response.data);
        } catch (err) {
            console.error("Failed to load cart:", err.message);
            setCartItems({});
        }
    };

    // โหลดเมนูจาก API
    const fetchFood = async () => {
        try {
            const response = await fetch(`${url}/api/menuitems`, {
                cache: "no-store", // กัน cache เวลาพัฒนา
            });
            if (!response.ok) {
                throw new Error("Failed to fetch lists");
            }
            const data = await response.json();
            setLists(data.menus); // ✅ set state
        } catch (error) {
            console.log("Error get", error)
            setLists([]); // fallback เป็น array ว่าง
        }
    }


    useEffect(() => {
        async function loadData() {
            await fetchFood();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }

        }

        loadData();
    }, [])

    console.log(lists)

    const contextValue = {
        url,
        token,
        setToken,
        lists, // sky -> value
        fetchFood, // yellow -> function
        cartItems,
        addToCart,
        removeFromCart,
        loadCartData,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;