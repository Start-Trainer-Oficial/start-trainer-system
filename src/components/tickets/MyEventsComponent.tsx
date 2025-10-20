"use client";

import { useState } from "react";
import Image from "next/image";
import { MdSchedule, MdCalendarMonth, MdLocationPin, MdPeople } from "react-icons/md";


export default function MyEventsComponent() {

    return (
        <div className="flex flex-wrap">

            <div className="mt-5 w-[380px] border border-gray-700/15 rounded-2xl text-center">
                <div className="relative">
                    <div className="absolute right-5 top-5 bg-green-200 border border-green-900/40 text-green-900 px-3 py-1 rounded-lg text-sm font-medium">
                        <span>Disponível</span>
                    </div>
                    <Image
                        src="/diary/trilha1.png"
                        alt="Trilha 1"
                        width={390}
                        height={200}
                        className="rounded-t-2xl max-h-[180px]"
                    />
                </div>

                <div className="flex relative flex-col">
                    <div className="flex">
                        <div className="items-center">
                            <div className="flex items-center gap-2 text-center">
                                <h1 className="font-bold mt-5 text-sm uppercase">CACHOEIRA DO LEÃO </h1>
                                <p className="mt-4">-</p>
                                <div className="flex mt-4">
                                    <MdCalendarMonth className="inline-block text-[#5f2daf]" size={20} />
                                    <span className="text-sm text-gray-500 ml-1"> 15 de Novembro</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-center">
                                <div className="flex mt-3">
                                    <MdSchedule className="inline-block text-[#5f2daf]" size={20} />
                                    <span className="text-sm text-gray-500 ml-1"> Partida às 6h da manhã </span>
                                </div>
                                <p className="mt-4">-</p>
                                <div className="flex mt-3">
                                    <MdLocationPin className="inline-block text-[#5f2daf]" size={20} />
                                    <span className="text-sm text-gray-500 ml-1"> Barão de Cocais - MG </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <div className="w-[93%] self-center border-b-[0.5px] border-gray-700/15 px-2 mt-5" /> */}

                    <div className="flex gap-2 items-center justify-center w-full">
                        <button className="w-[120px] mt-5 mb-6 py-2 rounded-lg text-purple-800 border border-purple-800/20 
                            font-semibold bg-white cursor-pointer">
                            Sobre
                        </button>
                    </div>

                </div>
            </div>
        </div>


    )
}
