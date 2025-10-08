'use client'
import { assets } from "@/public/assets/assets";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext";
import './Navbar.css'
import Link from "next/link";

export default function Navbar({ setShowLogin }) {

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

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
          logout();
        }
      } catch (error) {
        // token ผิดรูปแบบ เช่น ถูกแก้ไข หรือไม่ใช่ JWT
        logout();
      }
    }
  }, [token])

  return (
    <div>
      <div className="flex justify-between p-6 bg-gray-900 text-white">
         <Link href="/" className="cursor-pointer text-xl text-orange-500">RAMEN delivery</Link>
        <ul className="flex gap-10">
          <Link href="/" className="cursor-pointer">Home</Link>
          <Link href="/gallery" className="cursor-pointer">Gallery</Link>
          <Link href="/reviews" className="cursor-pointer">Reviews</Link>
          <Link href="/contact" className="cursor-pointer">Contact</Link>
        </ul>
        <div className="flex gap-10">
          <Link href="/cart" className="relative cursor-pointer">
            <img src={assets.basket_icon} alt="" className="filter invert brightness-0"/>
            <div className={getTotalCartAmount() === 0
              ? ""
              : "dot absolute min-w-[10px] min-h-[10px] bg-red-500 rounded-md top-[-8px] right-[-8px]"}></div>
          </Link>
          {
            !token ? <button className="cursor-pointer" onClick={() => setShowLogin(true)}>sign in</button>
              : <div className="navbar-profile">
                <img src={assets.profile_icon} className="filter invert brightness-0"/>
                <div className="nav-profile-dropdown">
                  <Link href="/myorders" className="cursor-pointer"><img src={assets.bag_icon} alt="" /><p>Orders</p></Link>
                  <hr />
                  <Link href="/" onClick={logout} className="cursor-pointer"><img src={assets.logout_icon} alt="" />Logout</Link>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

