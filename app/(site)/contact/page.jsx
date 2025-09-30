'use client'

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Components/Map.jsx"), {
  ssr: false, // <== สำคัญ
});

export default function Contact() {
    return (
        <>
            <div className="w-full h-[400px]">
                <Map />
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <h1>Contact Information</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aliquid temporibus saepe explicabo, quaerat deleniti quia, sit deserunt neque suscipit modi maiores ipsam earum porro, blanditiis asperiores illum magnam nobis odit adipisci quam. Aliquam, ad.</p>
                    <p>ที่อยู่</p>
                    <p>เบอร์โท</p>
                    <p>E-mail</p>
                </div>
                <div>
                    <h1>Contact Form</h1>
                    <form action="">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Detaail</p>
                        <button>Send Message</button>
                        <button>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    )
}