'use client'
import { assets } from "@/public/assets/assets";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext";
import Link from "next/link";

export default function Navbar({ setShowLogin }) {

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const [menuOpen, setMenuOpen] = useState(false);

  // removeItem
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
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
          // router.push("/LoginPopup");

        }
      } catch (error) {
        // token ผิดรูปแบบ เช่น ถูกแก้ไข หรือไม่ใช่ JWT
        logout();
      }
    }
  }, [token])

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* โลโก้ */}
        <Link href="/" className="cursor-pointer text-xl text-orange-500">
          RAMEN delivery
        </Link>

        {/* ปุ่ม Hamburger (มือถือ) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* เมนูหลัก */}
        <ul
          className={`
            flex flex-col gap-6 
            bg-gray-900 top-[60px] w-full h-screen z-50 absolute
            transition-all duration-300 
            left-0 p-6 
            md:flex-row md:static md:w-auto md:h-auto md:gap-10 md:p-0 
            ${menuOpen ? "items-center" : "opacity-0 invisible md:opacity-100 md:visible "}`}
        >
          <Link href="/" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/gallery" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
            Gallery
          </Link>
          <Link href="/reviews" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
            Reviews
          </Link>
          <Link href="/contact" className="hover:text-orange-400" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          {/* เมนู responsive (cart / orders / logout */}
          <div className="flex flex-col gap-4 mt-4 md:hidden border-t w-full border-gray-700 pt-4 items-center">
            {!token ? (
              <button
                className="hover:text-orange-400 text-left"
                onClick={() => {
                  setShowLogin(true);
                  setMenuOpen(false);
                }}
              >
                Sign in
              </button>
            ) : (
              <>
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-orange-400"
                >
                  Cart 
                </Link>

                <Link
                  href="/myorders"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-orange-400"
                >
                  Orders
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="hover:text-orange-400 text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </ul>

        {/* ส่วนขวา (Desktop เท่านั้น) */}
        <div className="hidden md:flex items-center gap-8">
          {/* ตะกร้า */}
          <Link href="/cart" className="relative cursor-pointer">
            <img
              src={assets.basket_icon}
              alt=""
              className="w-6 h-6 filter invert brightness-0"
            />
            {getTotalCartAmount() > 0 && (
              <div className="absolute min-w-[10px] min-h-[10px] bg-red-500 rounded-md top-[-6px] right-[-6px]"></div>
            )}
          </Link>

          {/* ปุ่ม login หรือ dropdown */}
          {!token ? (
            <button
              className="hover:text-orange-400"
              onClick={() => setShowLogin(true)}
            >
              Sign in
            </button>
          ) : (
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-6 h-8 rounded-full cursor-pointer filter invert brightness-0"
              />
              <div
                className="absolute right-0 top-full hidden group-hover:flex flex-col gap-2 
                  bg-[#fff2ef] text-black p-3 rounded border border-[tomato]
                  shadow-md z-20 min-w-[160px]"
              >
                <Link
                  href="/myorders"
                  className="flex items-center gap-2 hover:text-[tomato]"
                >
                  <img src={assets.bag_icon} alt="orders" className="w-5" />
                  Orders
                </Link>
                <hr />
                <button
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-[tomato]"
                >
                  <img src={assets.logout_icon} alt="logout" className="w-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

