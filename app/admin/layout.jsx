import Sidebar from "./Components/Sidebar"
import "../globals.css";
import StoreContextProvider from "@/StoreContext/StoreContext";
import AdminNavbarWrapper from "./Components/AdminNavbarWrapper";


export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <StoreContextProvider>
                <body>
                    <AdminNavbarWrapper />
                    <hr />
                    <div className="admin-container flex">
                        <Sidebar />
                        {children}
                    </div>
                </body>
            </StoreContextProvider>
        </html>
    )
}