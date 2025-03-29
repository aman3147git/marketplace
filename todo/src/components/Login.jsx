import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/appSlice";
import { END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import Oauth from './Oauth.jsx';
import { FaLockOpen, FaLock } from "react-icons/fa";

const Login = () => {
    const [passtype, setPasstype] = useState("password");
    const [loader, setLoader] = useState(false);
    const [islogin, setIslogin] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const loginhandler = () => {
        setIslogin(!islogin);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (islogin) {
            const user = { email, password };
            try {
                setLoader(true);
                const res = await axios.post(`${END_POINT}/login`, user, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                }
                dispatch(setUser(res.data.user));
                navigate('/');
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoader(false);
            }
        } else {
            const user = { fullName, email, password };
            try {
                setLoader(true);
                const res = await axios.post(`${END_POINT}/register`, user, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                }
                setIslogin(true);
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoader(false);
            }
        }
        setFullName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-black dark:bg-[#111111] dark:text-white animate-fade-in">
            <div className="w-full max-w-md p-6 bg-[#1F1F21] rounded-lg shadow-md transform scale-95 transition-all duration-500 hover:scale-100">
                <form onSubmit={submitHandler}>
                    <h1 className="text-3xl font-bold text-center text-white mb-6 animate-slide-down">
                        {islogin ? "Sign In" : "Sign Up"}
                    </h1>
                    <div className="flex flex-col gap-4">
                        {!islogin && (
                            <input
                                className="p-2 bg-gray-700 text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                type="text"
                                placeholder="Full Name"
                            />
                        )}
                        <input
                            className="p-2 bg-gray-700 text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                        <div className="relative">
                            <input
                                className="p-2 pr-10 bg-gray-700 text-white w-full outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={passtype}
                                placeholder="Password"
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer hover:text-white transition-all"
                                onClick={() => setPasstype(passtype === "password" ? "text" : "password")}
                            >
                                {passtype === "password" ? <FaLock /> : <FaLockOpen />}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        {loader ? (
                            <button
                                className="w-full p-3 bg-red-600 text-white rounded-md cursor-not-allowed opacity-70 animate-pulse"
                                disabled
                            >
                                Loading...
                            </button>
                        ) : (
                            <button
                                className="w-full p-3 bg-green-800 text-white rounded-md hover:bg-green-500 transition-all duration-300 transform hover:scale-105"
                            >
                                {islogin ? "Login" : "Sign Up"}
                            </button>
                        )}
                    </div>
                    <div className="mt-4">
                        <Oauth />
                    </div>
                    <p className="mt-6 text-center text-gray-300 transition-all hover:scale-105">
                        {islogin ? "New user?" : "Already have an account?"}
                        <span
                            onClick={loginhandler}
                            className="text-red-500 cursor-pointer ml-2 hover:underline"
                        >
                            {islogin ? "Sign Up" : "Login"}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;