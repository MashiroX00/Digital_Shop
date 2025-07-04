'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faHouse, faCircleExclamation, faCircleQuestion, faCartShopping, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import NotificationPoint from "./notic";
import React, { useState, useContext, useEffect } from "react";
import {LoginContext } from "../layout";
import Link from "next/link";
export default function Sidebar() {
    const [userid, setuserid] = useState("");
    const { isLogin, setIsLogin } = useContext(LoginContext);
    useEffect(() => {
        if (!isLogin) {
            return setuserid("");
        }
        const user = JSON.parse(localStorage.getItem("user"));
        return setuserid(user.id);
    }, [isLogin])
    const logInContent = () => {
        return (
            <>
                <Link href="/auth/logout"><li className="px-5 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faRightFromBracket} size="lg" /></span> Logout</li></Link>
            </>
        )
    }
    return (
        <nav className="hidden flex-col w-3/15 h-screen md:flex md:bg-[var(--oxford-blue)] fixed">
            <ul className="flex flex-col my-5 mx-5">
                <Link href="/"><li className="px-4 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faHouse} size="lg" /></span> Home</li></Link>
                <Link href="/about"><li className="px-4 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faCircleExclamation} size="lg" /></span> About</li></Link>
                <Link href="/fqa"><li className="px-4 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faCircleQuestion} size="lg" /></span> FQA</li></Link>
                {
                    isLogin ? logInContent()
                    : null
                }
            </ul>
        </nav>
    );
}