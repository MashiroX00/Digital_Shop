'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faList,faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
export default function CardItem(props) {
    const id = props.item.id;
    const ImgUrl = process.env.NEXT_PUBLIC_API_PICTURE_URL + props.item.imgUrl || "exampleItem.png";
    const name = props.item.name || "example";
    const price = props.item.price || 0.00;
    const sell = props.item.sell || 0;
    const DetailUrl = "/products/" + id;
    return (
        <div className="flex flex-col bg-[var(--yale-blue)] w-fit h-full rounded-xl relative" data-aos="fade-up" data-aos-duration="1000">
            <div className="flex flex-col justify-between h-full">
                <Image src={ImgUrl} width={350} height={350} alt={name} className="rounded-t-2xl"></Image>
                <p className="text-sm md:text-3sm lg:text-lg mt-2 break-words px-2">{name}</p>
                <p className="text-xm md:text-sm lg:text-3sm px-4">Price: {price}</p>
                <p className="text-xm md:text-sm lg:text-3sm px-4">Selled: {sell}</p>
                <div className="flex flex-row justify-center mx-2 ">
                    <Link href="/" className="bg-[var(--mikado-yellow)] my-3 mx-1 p-2 rounded-xl w-full hover:bg-[var(--oxford-blue)] transition delay-50 duration-150 ease-in-out hover:scale-110 text-xs md:text-sm lg:text-lg"><span className="mr-2"><FontAwesomeIcon icon={faDollarSign} /></span>Buy</Link>
                    <Link href={DetailUrl} className="bg-[var(--mikado-yellow)] hover:bg-[var(--oxford-blue)] my-3 mx-1 p-2 rounded-xl w-full transition delay-50 duration-150 ease-in-out hover:scale-110 text-xs md:text-sm lg:text-lg"><span className="mr-2"><FontAwesomeIcon icon={faList} /></span>Detail</Link>
                </div>
            </div>
        </div>
    )
}
