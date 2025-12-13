"use client";

import { useState, useEffect } from "react";
import { MdCalendarMonth, MdLocationPin, MdPeople, MdCheckCircle } from "react-icons/md";
import { useAuth } from "@/context/authContext";
import { useLoginModal } from "@/context/loginModalContext";

import AboutEventsModal from "../modals/AboutEventsModal";
import EventRegisterModal from "../modals/EventRegisterModal";

import NavLink from "../NavLink";
import Image from "next/image";

import { getEvents, Event, getMyEvents, EventRegistration } from "@/services/events";
import { formatDateBR } from "@/utils/formatDate";

export default function EventComponent() {
    const { user, email } = useAuth();
    const { openModal } = useLoginModal();
    const [openAboutModal, setOpenAboutModal] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [regLoading, setRegLoading] = useState(false);

    type OptionType = "Trilhas" | "Corridas" | "Beneficentes";
    const options = ["Trilhas", "Corridas", "Beneficentes"] as const;
    const labels = ["Trilhas", "Corridas", "Beneficentes"];

    const [selectedOption, setSelectedOption] = useState<OptionType>("Trilhas");

    useEffect(() => {
        getEvents()
            .then((data) => setAllEvents(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!email) return;
        fetchRegistrations();
    }, [email]);

    const fetchRegistrations = async () => {
        if (!email) return;
        setRegLoading(true);
        try {
            const regs = await getMyEvents(email);
            setRegistrations(regs);
        } catch (error) {
            console.error(error);
        } finally {
            setRegLoading(false);
        }
    };

    const handleRedirect = (url?: string) => {
        if (!user) {
            openModal();
        } else {
            setIsOpen(true);
        }
    };

    const handleOpenAboutModal = () => {
        setOpenAboutModal(true);
    }

    const filteredEvents = allEvents.filter((event) => {
        if (selectedOption === "Beneficentes") return event.type === "Beneficente";
        return event.type === selectedOption;
    });

    const registeredEventIds = new Set(registrations.map((r) => r.event.id));

    useEffect(() => {
        if (!allEvents || allEvents.length === 0) return;

        const countFor = (option: OptionType) => {
            if (option === "Beneficentes") return allEvents.filter(e => e.type === "Beneficente").length;
            return allEvents.filter(e => e.type === option).length;
        };

        const currentCount = countFor(selectedOption);
        if (currentCount > 0) return;

        const order: OptionType[] = ["Trilhas", "Corridas", "Beneficentes"];
        for (const o of order) {
            const c = countFor(o);
            if (c > 0) {
                setSelectedOption(o);
                break;
            }
        }
    }, [allEvents]);

    return (
        <>
            <NavLink
                labels={labels}
                options={options}
                selectedOption={selectedOption}
                onSelect={(option) => setSelectedOption(option)}
            />

            <div className="flex flex-wrap justify-center gap-10 mt-4">
                {loading && (
                    <div className="w-full flex justify-center items-center py-20">
                        <p className="text-gray-500 text-lg">Carregando eventos...</p>
                    </div>
                )}

                {!loading && filteredEvents.length === 0 && (
                    <div className="w-full flex flex-col justify-center items-center py-10">
                        <Image
                            src="/diary/warning.png"
                            alt="Nenhum evento"
                            width={150}
                            height={150}
                        />
                        <h2 className="text-2xl font-bold text-[#381877] mb-2">Nenhum evento encontrado</h2>
                        <p className="text-gray-500 text-sm text-center px-4">
                            Não temos eventos disponíveis para esta categoria no momento.
                            <br />Fique de olho para futuras atualizações!
                        </p>
                    </div>
                )}

                {filteredEvents.map((event) => (
                    <div key={event.id} className="mt-10 w-[360px] border border-gray-700/15 rounded-2xl text-center">
                        <div className="relative">
                            <div
                                className={`absolute right-5 top-5 
    ${event.status === "Disponível"
                                        ? "bg-green-200 border border-green-900/40 text-green-900"
                                        : event.status === "Em breve"
                                            ? "bg-orange-200 border border-orange-900/40 text-orange-900"
                                            : event.status === "Finalizado" || event.status === "Esgotado"
                                                ? "bg-red-200 border border-red-900/40 text-red-900"
                                                : ""
                                    }
    px-3 py-1 rounded-lg text-sm font-medium`}
                            >
                                <span>{event.status}</span>
                            </div>

                            <Image
                                src="/diary/trilha1.png"
                                alt={event.name}
                                width={390}
                                height={240}
                                className="rounded-t-2xl"
                            />
                        </div>

                        <div className="flex relative flex-col">
                            <div className="flex">
                                <div className="items-start text-start">
                                    <h1 className="font-bold mt-5 text-start px-6 text-lg uppercase">{event.name}</h1>

                                    {event.type !== "Beneficente" && (
                                        <div className="flex px-6 mt-4">
                                            <MdCalendarMonth className="inline-block text-[#5f2daf]" size={20} />
                                            <span className="text-sm text-gray-500 ml-1">{formatDateBR(event.time)}</span>
                                        </div>
                                    )}

                                    {event.type === "Beneficente" ? (
                                        <>
                                            <div className="flex px-6 mt-3">
                                                <MdLocationPin className="inline-block text-[#5f2daf]" size={20} />
                                                <span className="text-sm text-gray-500 ml-1">{event.location}</span>
                                            </div>
                                            <div className="flex px-6 mt-3">
                                                <span className="text-sm text-gray-500 ml-1">{event.title}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex px-6 mt-3 max-w-[260px]">
                                                <span className="text-sm text-gray-500 ml-1">{event.title}</span>
                                            </div>
                                            <div className="flex px-6 mt-3">
                                                <MdLocationPin className="inline-block text-[#5f2daf]" size={20} />
                                                <span className="text-sm text-gray-500 ml-1">{event.location}</span>
                                            </div>
                                        </>
                                    )}

                                    {event.slots > 0 && (
                                        <div className="flex px-6 mt-3">
                                            <MdPeople className="inline-block text-[#5f2daf]" size={20} />
                                            <span className="text-sm text-gray-500 ml-1">{event.slots}</span>
                                        </div>
                                    )}
                                </div>

                                {event.price > 0 && (
                                    <div className="absolute border border-gray-700/20 w-22 h-17 rounded-xl top-2 right-6 mt-16 flex flex-col items-center justify-center">
                                        <h1 className="font-bold text-xl text-[#5f2daf]">R${event.price}</h1>
                                    </div>
                                )}
                            </div>

                            <div className="w-[93%] self-center border-b-[0.5px] border-gray-700/15 px-2 mt-5" />

                            <div className="flex gap-2 px-4 items-center justify-center w-full">
                                {event.type !== "Beneficente" &&
                                    event.status !== "Esgotado" &&
                                    event.status !== "Em breve" &&
                                    event.status !== "Finalizado" && (
                                        registeredEventIds.has(event.id) ? (
                                            <button
                                                disabled
                                                aria-disabled
                                                className="w-full mt-5 mb-6 py-2 rounded-lg text-white font-semibold bg-gray-400 flex items-center justify-center"
                                            >
                                                <MdCheckCircle className="mr-2 text-white" size={18} />
                                                Já inscrito
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRedirect(event.urlLink)}
                                                className="w-full mt-5 mb-6 py-2 rounded-lg text-white font-semibold bg-[#381877] transition-all cursor-pointer duration-300 hover:brightness-90"
                                            >
                                                Fazer inscrição
                                            </button>
                                        )
                                    )}


                                <button
                                    onClick={event.type === "Beneficente" ? () => handleRedirect(event.urlLinkAbout) : () => handleOpenAboutModal()}
                                    className="w-full mt-5 mb-6 py-2 rounded-lg text-purple-800 border border-purple-800/20 
                                               font-semibold bg-white cursor-pointer hover:bg-[#61ffc2] hover:text-black transition"
                                >
                                    {event.type === "Beneficente" ? "Contribua" : "Sobre"}
                                </button>
                            </div>
                        </div>

                        <AboutEventsModal open={openAboutModal} event={event} onClose={() => setOpenAboutModal(false)} />

                        <EventRegisterModal event={event} isOpen={isOpen} onClose={() => setIsOpen(false)} onRegistered={fetchRegistrations} />

                    </div>
                ))}
            </div>
        </>
    );
}
