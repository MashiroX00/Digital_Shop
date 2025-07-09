"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./Components/sidebar";
import Usernav from "./Components/navprofile";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import React,{ useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { getUserInfo } from "./api/user/getUserInfo";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const LoginContext = React.createContext();
export default function RootLayout({ children }) {
  const path = usePathname();
  const [token,setToken] = useState("");
  const [isLogin,setIsLogin] = useState(false);
  const [isAuth,setIsAuth] = useState(false);
  const [user,setUser] = useState([]);

   const refeshdata = async ()  =>  {
    const gettoken = localStorage.getItem("token");
    if(!gettoken) {
      setIsLogin(false);
      setIsAuth(true);
      return false
    }
    await getUserInfo();
    setIsLogin(true);
    setIsAuth(true);
    return true
  }
  useEffect(() => {
    refeshdata()
    console.log(path);
  }, [path]);
  useEffect(() => {
    AOS.init();
  },[])
  return (
    <html lang="en">
      <Analytics/>
      <SpeedInsights/>
       <LoginContext.Provider value={{isLogin,setIsLogin,isAuth}}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-cols-5 grid-rows-[0.2fr_1fr_1fr] h-screen relative">
         
          <div className="col-span-5 row-span-1 ">
              <Usernav />
           </div>
          
           <div className="hidden md:col-span-1 md:row-start-2 md:row-end-4 md:grid ">
             <Sidebar />
           </div> 
           <div className="col-span-5 row-span-2 md:col-span-4 ">
            {children}
           </div>
        </div>
      </body>
      </LoginContext.Provider>
    </html>
  );
}
export { LoginContext };