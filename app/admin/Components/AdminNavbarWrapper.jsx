'use client';

import { useState } from "react";
import Navbar from "./Navbar";
import LoginPopup from "@/app/(site)/LoginPopup/page";

export default function AdminNavbarWrapper() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}
      <Navbar setShowLogin={setShowLogin} />
    </>
  );
}
