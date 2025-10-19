import { assets } from "@/public/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-gray-300 px-6 md:px-20 py-12 border-t border-gray-800 min-h-[400px]">
            {/* Content Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* ABOUT US */}
                <div>
                    <h1 className="text-2xl font-semibold text-white mb-4">ABOUT US</h1>
                    <p className="text-sm leading-6 mb-4">
                        We are passionate about bringing authentic Japanese ramen to your table.
                        Every bowl is crafted with fresh ingredients, deep flavors, and the heart of Japan.
                    </p>
                    <Link
                        href="/about"
                        className="inline-block bg-orange-500 hover:bg-orange-600 
                    transition-colors text-white text-sm px-4 py-2 rounded-lg">
                        Read More
                    </Link>
                </div>

                {/* ORDER */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">ORDER</h2>
                    <ul className="space-y-2 text-sm">
                        {["Ramen", "Drink", "Side Menu"].map((item) => (
                            <li
                                key={item}
                                className="hover:text-orange-400 cursor-pointer transition-colors"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">CONTACT</h2>
                    <p className="text-sm mb-3">
                        Visit us at our main branch in Bangkok or reach out anytime.
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Telephone:</span>
                        <a href="tel:021234567" className="hover:text-orange-400">
                            02-123-4567
                        </a>
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">E-mail:</span>
                        <a href="mailto:ramen@ramenweb.com" className="hover:text-orange-400">
                            ramen@ramenweb.com
                        </a>
                    </p>
                </div>

                {/* FOLLOW US */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">FOLLOW US</h2>
                    <div className="flex items-center gap-5 h-[40px]">
                        {[
                            { src: assets.facebook_icon, alt: "Facebook", href: "https://facebook.com" },
                            { src: assets.linkedin_icon, alt: "LinkedIn", href: "https://linkedin.com" },
                            { src: assets.twitter_icon, alt: "Twitter", href: "https://twitter.com" },
                        ].map((icon) => (
                            <Link
                                key={icon.alt}
                                href={icon.href}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Image
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={28}
                                    height={28}
                                    className="hover:scale-110 hover:brightness-125 transition-transform duration-300 cursor-pointer"
                                    loading="lazy"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div
                className="mt-10 border-t border-gray-700 pt-6 text-center text-sm 
            text-gray-400 select-none"
            >
                 © {new Date().getFullYear()}{" "}
                <span className="text-orange-600">RamenDelivery.com</span>
                . All rights reserved.
            </div>
        </footer>
    );
}