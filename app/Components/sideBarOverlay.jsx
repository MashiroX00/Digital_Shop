'use client'
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faHouse, faCircleExclamation, faCircleQuestion, faCartShopping,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import NotificationPoint from "./notic";
import Link from "next/link";
import { LoginContext } from "../layout";
export default function SideBarOverlay() {
    const [isOpenMenu, setOpenMenu] = useState(false);
    const {isLogin, setIsLogin} = useContext(LoginContext);
    function openMenu() {
        setOpenMenu(true);
        console.log("menu is open!");
    }
    function closeMenu() {
        setOpenMenu(false);
        console.log("menu is close!");
    }
    const logInContent = () => {
        return(
            <>
            <Link href="/auth/logout"><li className="px-5 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faRightFromBracket} size="lg" /></span> Logout</li></Link>
            </>
        )
    }
    return (
            <>
                {/* Overlay */}
                <div
                    className={`z-998 w-screen h-screen bg-[var(--oxford-blue)]/40 absolute top-0 left-0 transition-opacity duration-300 ${isOpenMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={closeMenu}
                >
                    {/* Sidebar */}
                    <div
                        className={`z-999 h-screen bg-[var(--oxford-blue)] absolute top-0 left-0 w-[calc(100vw/1.5)] transform transition-transform duration-300 origin-left ${isOpenMenu ? 'scale-x-100' : 'scale-x-0'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="absolute top-5 right-5" onClick={closeMenu}>
                            <FontAwesomeIcon icon={faX} size="xl" />
                        </div>
                        <div>
                            <ul className="flex flex-col my-15 mx-5">
                                <Link href="/"><li className="px-4 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faHouse} size="lg" /></span> Home</li></Link>
                                <Link href="/about"><li className="px-4 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faCircleExclamation} size="lg" /></span> About</li></Link>
                                <Link href="/fqa"><li className="px-4 hover:bg-[var(--yale-blue)]/80 py-3 rounded-2xl"><span className="mr-2"><FontAwesomeIcon icon={faCircleQuestion} size="lg" /></span> FQA</li></Link>
                                {isLogin ? logInContent() : null}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Menu Button */}
                {!isOpenMenu && (
                    <div onClick={openMenu}>
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </div>
                )}
            </>
    )
}