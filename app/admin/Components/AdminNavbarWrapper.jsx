'use client';
import { useContext } from "react";
import LoginPopup from "@/app/(site)/LoginPopup/page";
import { StoreContext } from "@/StoreContext/StoreContext";
import NavbarClient from "./NavbarClient";
import NavbarServer from "./NavbarServer";

export default function AdminNavbarWrapper() {
  const { showLogin, setShowLogin } = useContext(StoreContext);

  return (
    <div className="bg-gray-900 text-white">

      <div className="flex justify-between px-4">
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        <NavbarServer />
        <NavbarClient />
      </div>
    </div>
  );
}
