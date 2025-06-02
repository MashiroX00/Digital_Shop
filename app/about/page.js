'use client'
import { useEffect } from "react";
export default function About() {
    useEffect(() => {
         document.title = "About"
    },[])
    return(
        <div className="flex flex-col gap-4 my-5 mx-5 md:my-20 md:mx-20 bg-[var(--oxford-blue)]/40 rounded-lg p-5 text-wrap shadow-md shadow-white" data-aos="fade-up">
            <h1 className="font-bold">About Us</h1>
            <p className="pl-4 break-words">
                [ชื่อเว็บไซต์ของคุณ] คือแพลตฟอร์มช้อปปิ้งออนไลน์สำหรับสินค้า ดิจิทัลและเทคโนโลยี ที่มุ่งเน้นให้คุณได้รับประสบการณ์ที่สะดวก รวดเร็ว และปลอดภัยในการเลือกซื้อสินค้าที่ตอบโจทย์ยุคดิจิทัลเรารวบรวมสินค้าและบริการจากหลากหลายแบรนด์ชั้นนำ ไม่ว่าจะเป็น
            </p>
            <ul className="list-disc ml-9">
                    <li>ซอฟต์แวร์ลิขสิทธิ์แท้ (เช่น โปรแกรมสำนักงาน, โปรแกรมออกแบบ, โปรแกรมแอนตี้ไวรัส)</li>
                    <li>คีย์เกม และไอเท็มเกมดิจิทัล</li>
                    <li>อุปกรณ์เสริมไอที เช่น เมาส์ คีย์บอร์ด หูฟัง</li>
                    <li>บริการเติมเงินดิจิทัล และอื่น ๆ อีกมากมาย</li>
                </ul>
            <h2 className="break-words font-bold">
                จุดเด่นของเรา
            </h2>
            <ul className="list-disc ml-9">
                    <li>สินค้าลิขสิทธิ์แท้ 100%</li>
                    <li>จัดส่งรวดเร็วแบบดิจิทัล รับคีย์หรือไฟล์ทางอีเมลหรือบัญชีผู้ใช้งานทันทีหลังชำระเงิน</li>
                    <li>ทีมงานซัพพอร์ตมืออาชีพ พร้อมดูแลคุณตลอดเวลา</li>
                </ul>
        </div>
    );
}