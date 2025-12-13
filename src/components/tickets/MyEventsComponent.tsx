"use client";

import Image from "next/image";
import { MdCalendarMonth, MdLocationPin } from "react-icons/md";
import { EventRegistration } from "@/services/events";
import { formatDateBR } from "@/utils/formatDate";

interface MyEventsComponentProps {
    registration: EventRegistration;
}

export default function MyEventsComponent({ registration }: MyEventsComponentProps) {
    const { event } = registration;
    const displayDate = formatDateBR(event.time);
    const createdAt = formatDateBR(new Date(registration.createdAt));

    return (
        <div className="flex flex-col gap-4 mt-5 px-3 w-full max-w-3xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between relative border border-gray-700/15 rounded-2xl p-3">

                <div className="relative w-full h-40 md:w-[100px] md:h-[100px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                        src={event.urlLink || "/diary/trilha1.png"}
                        alt={event.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between mt-2 md:mt-0 md:ml-4 ml-0 w-full md:flex-1">
                    <h1 className="font-bold text-base uppercase text-gray-800">
                        {event.name}
                    </h1>

                    <p className="text-[10px] text-black/70 select-none">Você se inscreveu em {createdAt}</p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <MdCalendarMonth className="text-[#5f2daf]" size={18} />
                        <span>{displayDate}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MdLocationPin className="text-[#5f2daf]" size={18} />
                        <span>{event.location}</span>
                    </div>

                </div>

                <button className="md:absolute md:right-3 md:mt-2 md:w-[100px] w-full mt-3 py-1 rounded-lg text-purple-800 border border-purple-800/20 font-semibold bg-white hover:bg-purple-50 transition text-center">
                    Ver mais
                </button>

            </div>
        </div>
    );
}
