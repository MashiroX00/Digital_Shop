"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogOutPage() {
  const [logout, setLogout] = useState(false);
  const handleLogout = (e) => {
    setLogout(true);
  };
  useEffect(() => {
    if (logout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      redirect("/");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    redirect("/");
  }, []);
  return (
    <div className="mx-5 my-5 md:mx-10 md:my-20 flex flex-col gap-4">
      <h1 className="text-2xl">Logout...</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-[var(--gold)] hover:bg-[var(--gold)]/80 text-black rounded-lg w-fit"
      >
        logout
      </button>
    </div>
  );
}
