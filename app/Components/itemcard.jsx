'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../layout";
import Link from "next/link";
export default function CardItem(props) {
    const { cart, setCart } = useContext(CartContext);
    const id = props.item.id = 1;
    const ImgUrl = "http://localhost:5000/" + props.item.imgUrl || "exampleItem.png";
    const name = props.item.name || "example";
    const price = props.item.price || 0.00;
    const sell = props.item.sell || 0;
    function increaseCart() {
        setCart(cart + 1);
    }
    return (
        <div className="flex flex-col bg-[var(--yale-blue)] w-fit h-full rounded-xl relative" data-aos="fade-up" data-aos-duration="1000">
            <div className="flex flex-col justify-between h-full">
                <img src={ImgUrl} alt="logo" className="object-cover rounded-t-xl w-full" crossOrigin="anonymous" />
                <p className="text-sm md:text-3sm lg:text-lg mt-2 break-words px-2">{name}</p>
                <p className="text-xm md:text-sm lg:text-3sm px-4">Price: {price}</p>
                <p className="text-xm md:text-sm lg:text-3sm px-4">Selled: {sell}</p>
                <div className="flex flex-row justify-center mx-2 ">
                    <Link href="/" className="bg-[var(--mikado-yellow)] my-3 mx-1 p-2 rounded-xl w-full hover:bg-[var(--oxford-blue)] transition delay-50 duration-150 ease-in-out hover:scale-110" onClick={() => { increaseCart() }}><span className="mr-2"><FontAwesomeIcon icon={faCartPlus} /></span>Cart</Link>
                    <Link href="/" className="bg-[var(--mikado-yellow)] hover:bg-[var(--oxford-blue)] my-3 mx-1 p-2 rounded-xl w-full transition delay-50 duration-150 ease-in-out hover:scale-110"><span className="mr-2"><FontAwesomeIcon icon={faList} /></span>Detail</Link>
                </div>
            </div>
        </div>
    )
}
