'use client'
import { assets } from "@/public/assets/assets";
import { StoreContext } from "@/StoreContext/StoreContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Navbar() {
    const { token, setToken, setShowLogin, setCartItems } = useContext(StoreContext)
    const router = useRouter();

    // when you click to logout
    const logout = () => {
        // clear token or cookie
        localStorage.removeItem("token");

        // clear cart state frontend side
        setCartItems([]);

        // clear user data

        // clear token
        setToken("");

        // redirect ไปหน้า login
        router.push("/LoginPopup");
    }

    useEffect(() => {
        if (token) {
            //ตรวจสอบ token หมด
            try {
                const payload = JSON.parse(atob(token.split('.')[1])); // decode payload
                const isExpired = payload.exp * 1000 < Date.now();
                if (isExpired) {
                    alert("กรุณาเข้าสู่ระบบใหม่");
                    logout();
                    //  redirect ไป login ด้วย:
                    router.push("/LoginPopup");

                }
            } catch (error) {
                // token ผิดรูปแบบ เช่น ถูกแก้ไข หรือไม่ใช่ JWT
                logout();
            }
        }
    }, [token])

    return (
        <>
            <nav className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <div className="grid grid-rows-2">
                        <h1>Ramen del</h1>
                        <h2>Admin Panuel</h2>
                    </div>
                    <div
                        className=""
                    >
                        {/* เมนู responsive (cart / orders / logout */}
                        <div className="flex flex-col gap-4 mt-4 w-full border-gray-700 pt-4 items-center">
                            {!token ? (
                                <button
                                    className="hover:text-orange-400 text-left"
                                    onClick={() => {
                                        setShowLogin(true);
                                    }}
                                >
                                    Sign in
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={logout}
                                        className="hover:text-orange-400 text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>

            </nav>
        </>
    )
}