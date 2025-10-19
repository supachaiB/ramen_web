'use client'
import { assets } from "@/public/assets/assets";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext";
import Link from "next/link";
import Image from "next/image";


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

        }
      } catch (error) {
        logout();
      }
    }
  }, [token])

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50 min-h-[60px]">
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
             fixed top-[60px] left-0 w-full h-screen bg-gray-900 flex flex-col items-center
             gap-6 p-6 z-50 transition-transform duration-300 
             md:flex-row md:static md:w-auto md:h-auto md:p-0 md:translate-x-0
              ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
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
            <Image
              src={assets.basket_icon}
              alt="cart"
              width={18}
              height={18}
              className=" rounded-full w-8 h-auto filter invert brightness-0"
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
              <Image
                src={assets.profile_icon}
                alt="profile"
                width={18}
                height={18}
                className="rounded-full w-8 h-auto cursor-pointer filter invert brightness-0"
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
                  <img src={assets.bag_icon}
                    alt="orders"
                    width={18}
                    height={18}
                    className="w-6 h-auto"
                  />
                  Orders
                </Link>
                <hr />
                <button
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-[tomato]"
                >
                  <Image src={assets.logout_icon}
                    alt="logout"
                    width={18}
                    height={18}
                    className="w-6 h-auto"
                  />
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