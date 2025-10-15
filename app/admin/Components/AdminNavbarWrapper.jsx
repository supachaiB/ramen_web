'use client';

import { useContext, useState } from "react";
import Navbar from "./Navbar";
import LoginPopup from "@/app/(site)/LoginPopup/page";
import { StoreContext } from "@/StoreContext/StoreContext";

export default function AdminNavbarWrapper() {
  const {showLogin, setShowLogin} = useContext( StoreContext )

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}
      <Navbar setShowLogin={setShowLogin} />
    </>
  );
}
