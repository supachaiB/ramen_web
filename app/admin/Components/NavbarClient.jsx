'use client'
import { StoreContext } from "@/StoreContext/StoreContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Navbar() {
    const { token, setToken, setShowLogin } = useContext(StoreContext)
    const router = useRouter();

    // when you click to logout
    const logout = () => {
        // clear token or cookie
        localStorage.removeItem("token");
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
            {/* เมนู responsive (cart / orders / logout */}
            <div className="flex gap-4">
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
        </>
    )
}