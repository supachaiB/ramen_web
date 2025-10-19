'use client'

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Components/Map.jsx"), {
    ssr: false, // <== สำคัญ
});

export default function Contact() {
    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-8">

            {/* Map */}
            <div className="w-full pt-6 h-64 sm:h-96 rounded ">
                <Map />
            </div>

            {/* Contact Info + Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Contact Information */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold">Contact Information</h1>
                    <p className="text-gray-700">
                        Have questions about our ramen, delivery, or franchise opportunities?
                        We’d love to hear from you! Fill out the form or contact us directly.
                    </p>
                    <div className="space-y-1">
                        <p><span className="font-semibold">Address:</span>123 Tokyo Street, Bangkok, Thailand</p>
                        <p><span className="font-semibold">Phone:</span>  +66 2-123-4567</p>
                        <p><span className="font-semibold">E-mail:</span> ramen@ramendel.com</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1 font-semibold">Name</label>
                            <input type="text" id="name" placeholder="Your Name" className="border rounded px-3 py-2 w-full" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 font-semibold">Email</label>
                            <input type="email" id="email" placeholder="Your Email" className="border rounded px-3 py-2 w-full" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="details" className="mb-1 font-semibold">Details</label>
                            <textarea id="details" placeholder="Your Message" className="border rounded px-3 py-2 w-full h-32 resize-none" />
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Send Message</button>
                            <button type="reset" className="flex-1 border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100 transition">Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}