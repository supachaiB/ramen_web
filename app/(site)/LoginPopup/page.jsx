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

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false)

                // if role is admin send to /admin
                if (response.data.role === "admin") {
                    window.location.href = "/admin"
                }

                // if role is admin send to home page user
                if (response.data.role === "user") {
                    window.location.href = "/"
                }
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.")
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <form onSubmit={onLogin} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 grid gap-6 relative">
                
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{currState}</h2>
                    <img 
                        onClick={()=>setShowLogin(false)} 
                        src={assets.cross_icon} 
                        alt="close" 
                        className="w-6 h-6 cursor-pointer" 
                    />
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    {currState === "Sign Up" && (
                        <input 
                            name="name" 
                            type="text"
                            placeholder="Your name"
                            onChange={onChangeHandler}
                            value={data.name}
                            required 
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    )}
                    <input 
                        name="email" 
                        type="email"
                        placeholder="Your email"
                        onChange={onChangeHandler}
                        value={data.email}
                        required 
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input 
                        name="password" 
                        type="password"
                        placeholder="Password"
                        onChange={onChangeHandler}
                        value={data.password}
                        required 
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                {/* Submit button */}
                <button 
                    type="submit" 
                    className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                {/* Terms */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input type="checkbox" required className="accent-orange-500"/>
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {/* Switch login/signup */}
                {currState==="Login"
                ?<p className="text-sm text-gray-700 dark:text-gray-300">
                    Create a new account? <span onClick={()=>setCurrState("Sign Up")} className="text-orange-500 cursor-pointer">Click here</span>
                  </p>
                :<p className="text-sm text-gray-700 dark:text-gray-300">
                    Already have an account? <span onClick={()=>setCurrState("Login")} className="text-orange-500 cursor-pointer">Login here</span>
                  </p>}
            </form>
        </div>
    )
}
