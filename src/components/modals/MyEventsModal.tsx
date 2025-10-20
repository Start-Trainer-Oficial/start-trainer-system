"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import NavLink from "../NavLink";
import MyEventsComponent from "../tickets/MyEventsComponent";


type MyEventsProps = {
    openModalEvents: boolean;
    setOpenModalEvents?: (open: boolean) => void;
}

export default function MyEventsModal({ openModalEvents, setOpenModalEvents }: MyEventsProps) {

    useEffect(() => {
        const element = document.documentElement;

        if (openModalEvents) {
            element.classList.add("overflow-hidden");
        } else {
            element.classList.remove("overflow-hidden");
        }

        return () => element.classList.remove("overflow-hidden");
    }, [openModalEvents]);


    const handleCloseModal = () => {
        if (setOpenModalEvents) {
            setOpenModalEvents(false);
        }
    }

    if (!openModalEvents) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-screen overflow-hidden">
            <div className="w-full h-screen lg:w-[800px] lg:h-[700px] bg-white lg:rounded-xl shadow-xl flex flex-col items-center relative ">
                <div className="flex items-center justify-center">
                    <div className="text-center mb-2">
                        <h1 className="mt-8 text-lg font-bold text-[#5f2daf] uppercase">MEUS EVENTOS</h1>
                        <h2 className="text-sm font-bold text-center px-4 text-black/70">Navegue por todos os seus eventos!</h2>
                    </div>

                    <button onClick={handleCloseModal} className="absolute right-10 top-8 w-6 h-6 items-center text-white cursor-pointer font-semibold">
                        <MdClose size={20} className="text-[#5f2daf]" />
                    </ button>
                </div>

                <NavLink labels={["Eventos ativos", "Passados"]} options={["Eventos ativos", "Passados"]} />

                <div className="flex-wrap">

                    <MyEventsComponent />

                </div>

            </div>
        </div>
    )
}