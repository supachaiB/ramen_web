export default function Footer() {
    return (
        <div className="bg-neutral-800 text-white px-20 py-10">
            <div className="flex gap-15 ">
                <div className="basis-1/4" >
                    <h1 className="text-2xl font-medium pb-3">ABOUT US</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quibusdam nesciunt vero consequatur iste mollitia provident
                        hic nobis vel dicta et!
                    </p>
                    <button>Read More</button>
                </div>
                <div className="basis-1/4">
                    <h2 className="text-2xl font-medium pb-3">ORDER</h2>
                    <ul>
                        <li>Ramen</li>
                        <li>Drink</li>
                    </ul>
                </div>
                <div className="basis-1/4">
                    <h2 className="text-2xl font-medium pb-3">CONTACT</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Sint libero corrupti deserunt.
                    </p>
                    <p>Telephone:</p>
                    <p>E-mail:</p>
                </div>
                <div className="basis-1/4">
                    <h2 className="text-2xl font-medium pb-3">FOLLOW US</h2>
                    {/* <img src="" alt="" /> */}
                </div>
            </div>
            <div>
                <p>Copyright @ 2025 RamenWeb.com. All right reserved. </p>
            </div>
        </div>
    )
}