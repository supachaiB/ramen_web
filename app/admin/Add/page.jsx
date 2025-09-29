'use client'
import { assets } from "@/public/assets/assets"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Add() {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Ramen"
    })

    useEffect(() => {
        console.log(data);
    }, [data])

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)

        if (image) {
            formData.append("imageUrl", image);
        }

        const response = await axios.post("../../api/menuitems", formData)

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Ramen"
            })
            setImage(false)
        }
        else {

        }
    }

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])}
                        type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="ramen">Ramen</option>
                            <option value="ramen">Side Menu</option>
                            <option value="drink">Drink</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="฿20" />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    )
}