'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import fqa from './fqa.json'
import { useEffect } from "react";
export default function Fqa() {
    useEffect(() => {
         document.title = "FQA"
    },[])
    const FqaElement = fqa.map((key,index) => {
        return (
            <details key={index} className="group border rounded-lg p-4" data-aos="fade-up">
                    <summary className="flex items-center justify-between cursor-pointer text-lg font-semibold">
                        {key.title}
                        <span className="ml-2 transition-transform group-open:rotate-180 duration-300"><FontAwesomeIcon icon={faGreaterThan} rotation={270} /></span>
                    </summary>
                    <div className="mt-2 text-gray-400">
                        {key.context}
                    </div>
                </details>
        )
    })
    return(
        <div className="flex flex-col gap-4 my-5 mx-5 md:my-20 md:mx-20 rounded-lg">
            <h1 className="font-bold md:text-lg lg:text-2xl">คำถามที่พบบ่อย (FAQ)</h1>
            {FqaElement}
        </div>
    )
}