'use client'
import "../globals.css";
import StoreContextProvider from "./StoreContext/StoreContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useState } from "react";
import LoginPopup from "./LoginPopup/page";


export default function RootLayout({ children }) {

  const [setLogin, setShowLogin] = useState(false);

  return (
    <html lang="en">
      <body
      >
        <StoreContextProvider>
          {setLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
          <Navbar setShowLogin={setShowLogin} />
          {children}
          <Footer />
        </StoreContextProvider>
      </body>
    </html>
  );
}
