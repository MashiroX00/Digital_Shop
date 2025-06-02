'use client'
import { useContext, useEffect, useState } from "react";
import SideBarOverlay from "./sideBarOverlay";
import Link from "next/link";
import { LoginContext } from "../layout";

export default function Usernav() {
    const {isLogin,setIsLogin} = useContext(LoginContext);
    const [token,setToken] = useState(null);
    const [userdata,setUserData] = useState({id: '',username: '', email: '', credit: '',displayname: '',role: 'user',imgUrl: '/userProfile.png'}) ;
    useEffect(()=> {
        const userToken = localStorage.getItem("token") || null;
        const userdata = localStorage.getItem("user") || null;
        setToken(userToken);

        if(userToken != null) {
            setIsLogin(true);
        }
        if(userdata != null || userdata != undefined) {
            setUserData(JSON.parse(userdata));
        }
    } ,[token,isLogin]);
    return (
        <nav className="flex w-screen object-contain border-b drop-shadow-md md:justify-end justify-around fixed py-2 bg-[var(--oxford-blue)] z-999 md:h-1/11">
            <div className="hidden flex-row place-items-center md:flex justify-start absolute top-6 left-5 md:mt-5 lg:mt-0">
                <p className="text-xl ">Welcome to Example Shop</p>
            </div>
            <div className="flex flex-row place-items-center md:hidden">
                <SideBarOverlay />
            </div>
            {isLogin ?
                <ul className="flex flex-row gap-4 content-center place-items-center px-3 md:text-xl text-[var(--mikado-yellow)] ">
                <li>Credit: {userdata.credit}</li>
                <li>{userdata.displayname}</li>
                <li><img src={userdata.imgUrl} alt="" className="max-h-[2rem] md:max-h-[4rem] object-cover border rounded-full border-amber-50"/></li>
            </ul>: <div className="px-4 flex flex-row content-center place-items-center gap-3"><Link href='/auth/login' className="rounded-xl bg-[var(--yale-blue)] px-5 py-3 hover:scale-105 ease-in-out duration-100">Login</Link>
            <Link href='/auth/register' className="rounded-xl bg-[var(--gold)] px-3 py-3 text-black hover:scale-105 ease-in-out duration-100 ">Register</Link></div>}
        </nav>
    );
}