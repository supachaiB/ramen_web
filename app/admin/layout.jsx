import Navbar from "./Components/Navbar"
import Orders from "./Components/Orders"
import Sidebar from "./Components/Sidebar"
import "../globals.css";


export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <hr />
                <div className="admin-container flex">
                    <Sidebar />
                    {children}
                </div>
            </body>
        </html>
    )
}