import { assets } from "@/public/assets/assets";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-gray-300 px-6 md:px-20 py-12">
            {/* Content Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* ABOUT US */}
                <div>
                    <h1 className="text-2xl font-semibold text-white mb-4">ABOUT US</h1>
                    <p className="text-sm leading-relaxed mb-4">
                        We are passionate about bringing authentic Japanese ramen to your table.
                        Every bowl is crafted with fresh ingredients, deep flavors, and the heart of Japan.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 transition text-white text-sm px-4 py-2 rounded-lg">
                        Read More
                    </button>
                </div>

                {/* ORDER */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">ORDER</h2>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-orange-400 cursor-pointer transition">Ramen</li>
                        <li className="hover:text-orange-400 cursor-pointer transition">Drink</li>
                        <li className="hover:text-orange-400 cursor-pointer transition">Side Menu</li>
                        <li className="hover:text-orange-400 cursor-pointer transition">Special Set</li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">CONTACT</h2>
                    <p className="text-sm mb-3">
                        Visit us at our main branch in Bangkok or reach out anytime.
                    </p>
                    <p className="text-sm"><span className="font-semibold">Telephone:</span> 02-123-4567</p>
                    <p className="text-sm"><span className="font-semibold">E-mail:</span> ramen@ramenweb.com</p>
                </div>

                {/* FOLLOW US */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">FOLLOW US</h2>
                    <div className="flex space-x-5 text-2xl">
                        <img src={assets.facebook_icon} alt="Facebook"
                            className=" hover:scale-110 hover:brightness-125 
            transition-transform duration-300 cursor-pointer" />
                        <img src={assets.linkedin_icon} alt="LinkedIn"
                            className=" hover:scale-110 hover:brightness-125 
            transition-transform duration-300 cursor-pointer"/>
                        <img src={assets.twitter_icon} alt="Twitter"
                            className=" hover:scale-110 hover:brightness-125 
            transition-transform duration-300 cursor-pointer"/>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                © 2025 <span className="text-orange-600">RamenDelivery.com</span>. All rights reserved.
            </div>
        </footer>
    );
}
