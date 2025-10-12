'use client'
import { assets } from "@/public/assets/assets"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "@/StoreContext/StoreContext";

export default function Add() {
    const { url } = useContext( StoreContext)
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "อาหาร"
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
        formData.append("category", data.category)

        if (image) {
            formData.append("imageUrl", image);
        }

        const response = await axios.post(`${url}/api/gallery/add`, formData)

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                category: "อาหาร"
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
                    <p>Gallery name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex col">
                        <p>Gallery category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="อาหาร">อาหาร</option>
                            <option value="บรรยากาศ">บรรยากาศ</option>
                            <option value="ทีมงาน">ทีมงาน</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    )
}