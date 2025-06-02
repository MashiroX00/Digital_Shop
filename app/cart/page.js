import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
export default function cart() {
    return (
        <div className="flex flex-col gap-4 my-5 mx-5 md:my-20 md:mx-20" data-aos="fade-left">
        <h1 className="font-bold">ไม่มีอะไรตรงนี้หรอกนะ</h1>
        <Link href="/"><div className="px-2 py-2 rounded-xl bg-[var(--mikado-yellow)] text-white w-fit hover:scale-125 transition-all ease-in-out delay-75 duration-300"><FontAwesomeIcon icon={faArrowLeft} /> กลับหน้าหลัก</div></Link>
    </div>
    )
}