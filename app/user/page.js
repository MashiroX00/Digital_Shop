'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; 
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";
import { updateUserInfo } from "../api/user/updateUserinfo";
export default function EditMe() {
    const [ctx,setctx] = useState("Confirm");
    const [displayName, setDisplayName] = useState("");

    function NotAuthUser() {
        Swal.fire({
            icon: 'warning',
            title: 'Blocked',
            text: 'You must login first before using this page.'
        }).then((result) => {
            if (result.isConfirmed) {
                redirect('/auth/login');
            }
        });
    }
    function SubmitHandler(e) {
        e.preventDefault();
        updateUserInfo(displayName).then(() => {
        });
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!localStorage.getItem('token') || !user) NotAuthUser();
        setDisplayName(user.displayname);
    }, []);
    return (
        <div className="flex flex-col my-5 mx-5 md:mx-20 md:my-20">
            <div>
                <h1 className="flex flex-row gap-2 text-2xl items-baseline font-bold underline underline-offset-2 "><span><FontAwesomeIcon icon={faPenToSquare} size="xl"/></span>Welome to profile setting</h1>
            </div>
            <div className="border-2 rounded-xl my-3 mx-5 border-dashed bg-[var(--oxford-blue)]">
                <form className="flex flex-row flex-wrap p-4" onSubmit={SubmitHandler}>
                    <h1 className="basis-1/3 text-2xl">Change display name</h1>
                    <p className="basis-3/3 text-gray-400 order-3">Change display name to display when you comment.</p>
                    <input
                        type="text"
                        className="basis-2/3 border-1 rounded-lg bg-[var(--background)] w-1/2 px-2"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    ></input>
                    <div className="order-last basis-3/3 flex justify-end"><button className=" bg-[var(--yale-blue)]/70 rounded-4xl p-3 w-1/2 md:w-2/10 my-4 hover:bg-[var(--yale-blue)] transform transition-all duration-300 delay-75" type={ctx != "Confirm" ? "button" : "submit"}>{ctx}</button></div>
                </form>
            </div>
        </div>
    )
}