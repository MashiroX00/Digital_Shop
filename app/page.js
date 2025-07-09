'use client'
import CardItem from "./Components/itemcard";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {faBullhorn,faBox} from "@fortawesome/free-solid-svg-icons"
import React,{ useEffect, useState,useContext } from "react";
import { getProducts } from "./api/productServices";
import Swal from "sweetalert2";
import Loading from "./Components/loading";
export default function Home() {
  const [items,setItem] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  useEffect(() => {
     document.title = "Home"
    AOS.init();
  }, []);
  useEffect( () => {
      getProducts().then((data) => {
        setItem(data);
        setLoading(false);
        setError(false);
      }).catch((error) => {

      });
  }, [])

  const cardElements = items.map((key, index) => {
    return <div key={index} className="col-span-1"><CardItem item={key}/></div>
  }) 
  const errAlert = () => Swal.fire({
    icon: "error",
    title: "Somethings went worng.",
    text: "Please reloading this page again."
  })
  return (
  <section className="flex flex-col gap-4 my-5 mx-5 md:my-20 md:mx-20">
    <div className="text-lg md:text-2xl">
      <span className="mr-3"><FontAwesomeIcon icon={faBullhorn} size="lg"/></span><span>Announcement</span>
      <div className="bg-white h-30 md:h-40 lg:h-60 mt-5 object-fill overflow-clip relative ">
        <Image
          src="/codehsr.png"
          alt="Announcement"
          fill
          style={{ objectFit: "fill" ,}}
        />
      </div>
    </div>
    <div className="text-lg md:text-2xl">
      <span className="mr-3"><FontAwesomeIcon icon={faBox} size="lg"/></span><span>Product</span>
    </div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 mb-2">
        {loading ? <div className="font-bold text-xl"><Loading /></div> : cardElements}
        {error ? errAlert : null}
    </div>
  </section>
  );
}