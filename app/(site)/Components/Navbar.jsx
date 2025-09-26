'use client'
import { assets } from "@/public/assets/assets";
import { useContext } from "react";
import { StoreContext } from "../StoreContext/StoreContext";
import './Navbar.css'
import Link from "next/link";

export default function Navbar({ setShowLogin }) {

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  }
  return (
    <div>
      <div className="flex justify-between p-6">
        Logo
        <ul className="flex gap-10">
          <Link href="/" className="cursor-pointer">Home</Link>
          <Link href="/Gallery" className="cursor-pointer">Gallery</Link>
          <Link href="/Reviews" className="cursor-pointer">Reviews</Link>
          <Link href="/Contact" className="cursor-pointer">Contact</Link>
        </ul>
        <div className="flex gap-10">
          <img src={assets.search_icon} alt="" />
          <Link href="/Cart" className="relative cursor-pointer">
            <img src={assets.basket_icon} alt="" />
            <div className={getTotalCartAmount() === 0
              ? ""
              : "dot absolute min-w-[10px] min-h-[10px] bg-red-500 rounded-md top-[-8px] right-[-8px]"}></div>
          </Link>
          {
            !token ? <button className="cursor-pointer" onClick={() => setShowLogin(true)}>sign in</button>
              : <div className="navbar-profile">
                <img src={assets.profile_icon} />
                <div className="nav-profile-dropdown">
                  <img src={assets.bag_icon} alt="" /><p>Orders</p>
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

