"use client";

import { useState } from "react";
import Image from "next/image";
import { MdSchedule, MdCalendarMonth, MdLocationPin, MdPeople } from "react-icons/md";

import { useAuth } from "@/context/authContext";
import { useLoginModal } from "@/context/loginModalContext";
import NavLink from "../NavLink";

type EventComponentsProps = {
    title?: string;
    date?: string;
    type?: string;
    status?: string;
    active?: boolean;
}

export default function EventComponent({ title, date, type, status, active }: EventComponentsProps) {
    const { user } = useAuth();
    const { openModal } = useLoginModal();

    const [selectedOption, setSelectedOption] = useState<"Trilhas" | "Corridas" | "Beneficentes">("Trilhas");

    const handleRedirect = () => {
        if (!user) {
            openModal();
        } else {
            window.location.href = "/inscricao";
        }
    }

    return (
        <>

            <NavLink labels={["Trilhas", "Corridas", "Beneficentes"]} options={["Trilhas", "Corridas", "Beneficentes"]} />

            <div className="flex flex-wrap justify-center gap-10">

                <div className="mt-10 w-[360px] border border-gray-700/15 rounded-2xl text-center">
                    <div className="relative">
                        <div className="absolute right-5 top-5 bg-green-200 border border-green-900/40 text-green-900 px-3 py-1 rounded-lg text-sm font-medium">
                            <span>Disponível</span>
                        </div>
                        <Image
                            src="/diary/trilha1.png"
                            alt="Trilha 1"
                            width={390}
                            height={240}
                            className="rounded-t-2xl"
                        />
                    </div>

                    <div className="flex relative flex-col">
                        <div className="flex">
                            <div className="items-start text-start">
                                <h1 className="font-bold mt-5 text-start px-6 text-lg uppercase">CACHOEIRA DO LEÃO </h1>
                                <div className="flex px-6 mt-4">
                                    <MdCalendarMonth className="inline-block text-[#5f2daf]" size={20} />
                                    <span className="text-sm text-gray-500 ml-1"> 15 de Novembro</span>
                                </div>
                                <div className="flex px-6 mt-3">
                                    <MdSchedule className="inline-block text-[#5f2daf]" size={20} />
                                    <span className="text-sm text-gray-500 ml-1"> Partida às 6h da manhã </span>
                                </div>
                                <div className="flex px-6 mt-3">
                                    <MdLocationPin className="inline-block text-[#5f2daf]" size={20} />
                                    <span className="text-sm text-gray-500 ml-1"> Barão de Cocais - MG </span>
                                </div>
                                <div className="flex px-6 mt-3">
                                    <MdPeople className="inline-block text-[#5f2daf]" size={20} />
                                    <span className="text-sm text-gray-500 ml-1"> 35 Vagas </span>
                                </div>
                            </div>

                            <div className="absolute border border-gray-700/20 w-22 h-17 rounded-xl top-2 right-10 mt-16 flex flex-col items-center justify-center">
                                <h1 className="font-bold text-xl text-[#5f2daf]">R$70</h1>
                            </div>
                        </div>

                        <div className="w-[93%] self-center border-b-[0.5px] border-gray-700/15 px-2 mt-5" />

                        <div className="flex gap-2 items-center justify-center w-full">
                            <button onClick={handleRedirect} className="w-[200px] mt-5 mb-6 py-2 rounded-lg text-white font-semibold
    bg-gradient-to-r from-[#5f2daf] via-[#733df2] to-[#9b4bff]
    transition-all cursor-pointer duration-300 hover:brightness-90">
                                Fazer inscrição
                            </button>

                            <button className="w-[120px] mt-5 mb-6 py-2 rounded-lg text-purple-800 border border-purple-800/20 
                            font-semibold bg-white cursor-pointer">
                                Sobre
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
