'use client';

import { useState } from "react";
import Navbar from "./Navbar";
import LoginPopup from "../LoginPopup/page";

export default function NavbarWrapper() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
    </>
  );
}
