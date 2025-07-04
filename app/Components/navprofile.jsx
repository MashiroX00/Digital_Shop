'use client'
import { useContext, useEffect, useState } from "react";
import SideBarOverlay from "./sideBarOverlay";
import Link from "next/link";
import { LoginContext } from "../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser,faWallet,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
export default function Usernav() {
    const {isLogin,setIsLogin} = useContext(LoginContext);
    const [token,setToken] = useState(null);
    const [userdata,setUserData] = useState({id: '',username: '', email: '', credit: '',displayname: '',role: 'user',imgUrl: '/userProfile.png'});
    const [openMenu,setOpenMenu] = useState(false);
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

    function toggleOpenMenu() {
        setOpenMenu(!openMenu);
    }
    const UserMenuContent = () => {
        return (
            <div className="grow align-baseline self-center mx-5 relative"><div className="rounded-full h-[50px] w-[50px] bg-amber-50 overflow-clip place-self-end cursor-pointer" onClick={toggleOpenMenu}>
                <img src="/userProfile.png" alt="logo" className=""/>
                </div>{openMenu ? <ul className="absolute right-1 mt-2 bg-[var(--oxford-blue)]/80 border rounded-lg">
                <li className="p-2 text-center flex flex-col gap-1"><div className="h-[50px] w-[50px] overflow-clip rounded-full self-center"><img src="/userProfile.png" alt="" /></div><div>{userdata.displayname}</div><div>{userdata.email}</div></li>
                <hr></hr>
                <Link href='/user'><li className="p-2 hover:bg-[var(--oxford-blue)]"><FontAwesomeIcon icon={faUser} style={{color: "white"}} size="lg"/><p className="mx-2 inline">Setting</p></li></Link>
                <li className="p-2 hover:bg-[var(--oxford-blue)]"><FontAwesomeIcon icon={faWallet} style={{color: "white"}} size="lg"/><p className="mx-2 inline">Credit : {userdata.credit}</p></li>
                <Link href='/auth/logout'><li className="p-2 hover:bg-[var(--oxford-blue)]"><FontAwesomeIcon icon={faRightFromBracket} style={{color: "white"}} size="lg"/><p className="mx-2 inline">Logout</p></li></Link>
            </ul> : null}
            </div>
        )
    }
    return (
        <nav className="flex w-screen border-b drop-shadow-md fixed py-2 bg-[var(--oxford-blue)] z-999 md:h-1/11">
            <div className="hidden place-items-center md:flex justify-start mx-3">
                <p className="text-xl ">Welcome to Example Shop</p>
            </div>
            <div className="flex flex-row place-items-center md:hidden grow mx-5">
                <SideBarOverlay />
            </div>
            {isLogin ? UserMenuContent() : 
                <div className="px-4 flex flex-row content-center place-items-center gap-3"><Link href='/auth/login' className="rounded-xl bg-[var(--yale-blue)] px-5 py-3 hover:scale-105 ease-in-out duration-100">Login</Link>
            <Link href='/auth/register' className="rounded-xl bg-[var(--gold)] px-3 py-3 text-black hover:scale-105 ease-in-out duration-100 ">Register</Link></div>}
            
        </nav>
    );
}   