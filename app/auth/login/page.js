'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isScaling, setIsScaling] = useState(false);
    const [data, setdata] = useState({username: '', password: ''});

    const handleFormChange = (e) => {
        setdata({...data, [e.target.name]: e.target.value});
    }

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
        setIsScaling(true);
        setTimeout(() => setIsScaling(false), 200);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const api = process.env.NEXT_PUBLIC_API_URL + "auth/";
            const response = await axios.post(api,{
                "username": data.username,
                "password": data.password,
            });
            const result = response.data;
            localStorage.setItem("token",result.data.token);
            localStorage.setItem("user",JSON.stringify(result.data.user));
            Swal.fire({
                icon: "success",
                title: "Login Success",
            }).then((result) => {
                if(result.isConfirmed) {
                    redirect('/');
                }
            })
        }catch(error) {
                Swal.fire({
                    icon: "error",
                    title: "Login failed",
                    text: error.response.data.message
                })
        }
    }
    return (
        <div className="flex flex-col my-5 mx-auto md:my-20 md:mx-auto bg-[var(--oxford-blue)]/30 rounded-xl p-5 shadow-md shadow-white w-5/6 md:w-2/6 gap-3 " data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
            <h1 className="text-4xl font-bold self-center py-6">Login</h1>
            <form encType="multipart/form-data" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="flex flex-row gap-2 items-center border px-2 rounded-lg select-none">
                    <FontAwesomeIcon icon={faUser} size="xl"/>
                    <input
                        placeholder="Username"
                        type="username"
                        name="username"
                        className="p-2 w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
                        required
                    onChange={handleFormChange}/>
                </label>
                <label className={`flex flex-row gap-2 items-center border px-2 rounded-lg select-none transition-transform duration-200 ${isScaling ? 'scale-95' : ''}`}>
                    <FontAwesomeIcon icon={faLock} size="xl"/>
                    <input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="p-2 w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
                        required
                    onChange={handleFormChange}/>
                    <div onClick={togglePassword}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="xl"/></div>
                </label>
                <button type="subbmit" className="w-full bg-[var(--mikado-yellow)] rounded-sm p-2 hover:scale-105 hover:bg-[var(--mikado-yellow)]/80 text-black font-bold ease-in-out transition-transform duration-200">Login</button>
                <Link href="/auth/register" className="w-full bg-[var(--mikado-yellow)] rounded-sm p-2 hover:scale-105 hover:bg-[var(--mikado-yellow)]/80 text-black font-bold ease-in-out transition-transform duration-200 text-center">Register</Link>
            </form>
        </div>
    )
}