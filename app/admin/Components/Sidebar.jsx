
import Link from "next/link"

export default function Sidebar() {
    return (
        <>
            <div className="sidebar w-[18%] h-[100vh] border-gray-200 border-r-2 ">
                <div className="sidebar-options pt-10 pl-4 flex flex-col gap-4">
                    <div className="sidebar-option border-1 border-gray-100">
                        <Link href="/admin/Add">Add Items</Link>
                    </div>
                    <div className="sidebar-option border-1 border-gray-100">
                        <Link href="/admin/List">List Items</Link>
                    </div>
                    <div className="sidebar-option border-1 border-gray-100">
                        <Link href="/admin/Orders">Orders</Link>
                    </div>
                </div>
            </div>
        </>
    )
}