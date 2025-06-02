'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function CartPage() {
    const { id } = useParams();
    //verify token
    // const verify = async() => {
    //     try{const token = localStorage.getItem('token');
    //     const api = process.env.NEXT_PUBLIC_API_URL;
    //     const verifying= await axios.post(api + "auth/me", {
    //         token
    //     });
    //     const result = verifying.data;
    //     console.log(result);}catch(error) {
    //         Swal.fire({
    //             title: "oops..",
    //             icon: "error"
    //         }
    //         ).then((result) => {
    //             if(result.isConfirmed) {
    //                 redirect('/');
    //             }
    //         })
    //     }
    // }
    // useEffect(() => {
    //     verify();
    // },[])
    // Example cart data (replace with your fetched data)
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
        { id: 2, name: "Product 2", price: 9.99, quantity: 1 },
        { id: 3, name: "Product 3", price: 29.99, quantity: 3 },
    ]);

    return (
        <div className="flex flex-col gap-4 my-5 mx-5 md:my-20 md:mx-20">
            <h1 className="font-bold text-2xl underline underline-offset-2">Welcome to Cart</h1>
            <table className="w-full md:w-2/4 outline rounded-xl overflow-hidden">
                <thead className="text-lg font-bold md:text-xl">
                    <tr className="bg-[var(--oxford-blue)]/70">
                        <th className="px-3 py-5">#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, idx) => (
                        <tr key={item.id} className="">
                            <td className="px-3 py-3">{idx + 1}</td>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="font-bold">
                        <td colSpan={4} className="text-right px-3 py-3">Grand Total</td>
                        <td>
                            $
                            {cartItems
                                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                                .toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="w-2/4 bg-amber-50">
            
            </div>
        </div>
    );
}