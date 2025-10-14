'use client';

import { useContext } from "react";
import Navbar from "./Navbar";
import LoginPopup from "../LoginPopup/page";
import { StoreContext } from "@/StoreContext/StoreContext";

export default function NavbarWrapper() {
  const { showLogin, setShowLogin } = useContext(StoreContext);

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}
      <Navbar setShowLogin={setShowLogin} />
    </>
  );
}
