'use client'
import CardItem from "./Components/itemcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {faBullhorn,faDatabase} from "@fortawesome/free-solid-svg-icons"
import React,{ useEffect, useState,useContext } from "react";

export default function Home() {
  const [item,setItem] = useState([]);
  useEffect(() => {
     document.title = "Home"
    AOS.init();
  }, []);
  useEffect( () => {
    async function fetchData() {
      try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(api + 'products/');
        const data = await response.json();
        setItem(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

  const cardElements = item.map((key, index) => {
    return <div key={index} className="col-span-1"><CardItem item={key}/></div>
  }) 

  return (
  <section className="flex flex-col gap-4 my-5 mx-5 md:my-20 md:mx-20">
    <div className="text-lg md:text-2xl">
      <span className="mr-3"><FontAwesomeIcon icon={faBullhorn} size="lg"/></span><span>Announcement</span>
      <div className="bg-white h-60 mt-5"></div>
    </div>
    <div className="text-lg md:text-2xl">
      <span className="mr-3"><FontAwesomeIcon icon={faDatabase} size="lg"/></span><span>Product</span>
    </div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {cardElements}
    </div>
  </section>
  );
}