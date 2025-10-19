// FoodImage.js
import Image from "next/image";

export default function FoodImage({ url, imageUrl, name }) {
    
    if (!url) {
        return null;
    }

    return (
        <Image
            src={`${url}/uploads/${imageUrl}`}
            alt={name}
            fill
            sizes="(max-width:768px)100vw,(max-width:1024px)50vw,25vw"
            className="object-cover object-center rounded-t-2xl"
            loading="lazy"
        />
    );
}