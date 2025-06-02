'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function MenuCard(props) {
    //get current page from window
    const pathname = usePathname();
    const currentPage = pathname + "/" || "/";
    const page = currentPage + props.page || "admin";
    return (
        <div className="w-full h-50 flex flex-col rounded-xl bg-[var(--oxford-blue)]/30 shadow-white relative " data-aos="fade-up" data-aos-duration="1000" >
           <h1 className="text-2sm font-bold mt-3 ml-5">{props.title}</h1>
           <p className="text-sm mt-3 ml-6">{props.detail}</p>
           <Link href={page} className=" absolute bottom-5 right-5 hover:scale-110 transform ease-in-out duration-200 delay-75 hover:underline underline-offset-2 bg-[var(--yale-blue)] p-2 rounded-xl">Go to page <FontAwesomeIcon icon={faArrowRight}/></Link>
        </div>
    )
}