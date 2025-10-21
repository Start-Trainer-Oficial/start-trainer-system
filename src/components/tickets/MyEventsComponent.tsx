"use client";

import Image from "next/image";
import { MdSchedule, MdCalendarMonth, MdLocationPin } from "react-icons/md";

export default function MyEventsComponent() {
    return (
        <div className="flex flex-col gap-4 mt-5 px-3 w-full max-w-3xl mx-auto">

            <div className="flex items-center justify-between border border-gray-700/15 rounded-2xl p-3">

                <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden">
                    <Image
                        src="/diary/trilha1.png"
                        alt="Trilha 1"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between ml-4 w-[70%]">
                    <h1 className="font-bold text-base uppercase text-gray-800">
                        Cachoeira do Leão
                    </h1>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <MdCalendarMonth className="text-[#5f2daf]" size={18} />
                        <span>15 de Novembro</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MdSchedule className="text-[#5f2daf]" size={18} />
                        <span>Partida às 6h da manhã</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MdLocationPin className="text-[#5f2daf]" size={18} />
                        <span>Barão de Cocais - MG</span>
                    </div>

                </div>

                <button className="cursor-pointer mt-2 w-[100px] py-1 mr-4 rounded-lg text-purple-800 border border-purple-800/20 font-semibold bg-white hover:bg-purple-50 transition">
                    Ver mais
                </button>

            </div>
        </div>
    );
}
