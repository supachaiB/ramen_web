'use client'
import { assets } from "@/public/assets/assets"
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../../StoreContext/StoreContext"
import axios from "axios"

export default function LoginPopup ({ setShowLogin })  {

    const {url, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    useEffect(()=> {
        console.log(data);
    },[data])

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState==="Login") {
            newUrl += "/api/login"
        }
        else {
            newUrl += "/api/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    return (
        <div className="absolute z-10 w-[100%] h-[100%] bg-gray-400 grid">
            <form onSubmit={onLogin} >
                <div>
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div >
                    {currState === "Login"
                        ? <></>
                        : <input name="name" type="text"
                            placeholder="Your name"
                            onChange={onChangeHandler}
                            value={data.name}
                            required />}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type="submit" className="cursor-pointer">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div>
                    <input type="checkbox" required />
                    <p>By continuing, iagree to the terms of use & privacy policy.</p>
                </div>
                {currState==="Login"
                ?<p className="cursor-pointer">Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                :<p className="cursor-pointer">Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
            </form>
        </div>
    )
}