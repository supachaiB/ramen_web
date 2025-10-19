'use client';

import { useContext } from "react";
import LoginPopup from "../LoginPopup/page";
import { StoreContext } from "@/StoreContext/StoreContext";
import Navbar from "./Navbar";

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
