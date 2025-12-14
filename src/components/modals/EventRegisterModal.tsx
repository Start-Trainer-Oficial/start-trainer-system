"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";

import { MdClose } from "react-icons/md";
import { createCheckout } from "@/services/events";

import { formatPhoneBR } from "@/utils/formatPhone";
import { formatDateBR } from "@/utils/formatDate";
import { formatCpf } from "@/utils/formatCpf";

import Image from "next/image";
import toast from "react-hot-toast";

interface EventRegisterModalProps {
    event: {
        id: number;
        name: string;
        price: number;
        imagekitUrl: string;
        imageUrl: string;
    };
    isOpen: boolean;
    onClose?: () => void;
    onRegistered?: () => Promise<void> | void;
}

export default function EventRegisterModal({
    event,
    isOpen,
    onClose,
    onRegistered,
}: EventRegisterModalProps) {
    const { email } = useAuth();

    const [loading, setLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [form, setForm] = useState({
        email: email ?? "",
        fullName: "",
        phone: "",
        cpf: "",
        birthDate: "",
        distance: "",
        shirtSize: "",
    });

    const handleClose = () => onClose?.();

    useEffect(() => {
        const root =
            document.getElementById("__next") || document.getElementById("root");

        const shouldLock = isOpen || showPaymentModal;

        document.body.style.overflow = shouldLock ? "hidden" : "auto";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "auto";
        if (root) root.style.overflow = shouldLock ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            if (root) root.style.overflow = "auto";
        };
    }, [isOpen, showPaymentModal]);

    useEffect(() => {
        setForm((prev) => ({ ...prev, email: email ?? "" }));
    }, [email]);


    useEffect(() => {
        if (typeof window === "undefined") return;

        const started = localStorage.getItem("checkout_started");

        if (started) {
            setShowPaymentModal(true);
            localStorage.removeItem("checkout_started");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const isISO = /^\d{4}-\d{2}-\d{2}$/.test(form.birthDate);
            const digits = onlyDigits(form.birthDate);

            const toISO = (d: string) =>
                `${d.slice(4, 8)}-${d.slice(2, 4)}-${d.slice(0, 2)}`;

            const payload = {
                ...form,
                birthDate: isISO
                    ? form.birthDate
                    : digits.length === 8
                        ? toISO(digits)
                        : form.birthDate,
            };

            const res = await createCheckout(event.id, payload);
            onRegistered?.();
            localStorage.setItem("checkout_started", "true");

            window.location.href = res.init_point;
        } catch (error: any) {
            toast.error(error?.message || "Erro ao iniciar pagamento");
            setLoading(false);
        }
    };

    const onlyDigits = (s: string) => s.replace(/\D/g, "");

    function formatInputDate(value: string) {
        const digits = value.replace(/\D/g, "").slice(0, 8);
        if (!digits) return "";

        let result = digits.slice(0, 2);
        if (digits.length > 2) result += "/" + digits.slice(2, 4);
        if (digits.length > 4) result += "/" + digits.slice(4, 8);
        return result;
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);

    const price = Number(event?.price ?? 0);
    const serviceFee = price * 0.1;
    const total = price + serviceFee;

    if (!isOpen && !showPaymentModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-screen overflow-hidden"
            style={{ backdropFilter: 'blur(3px)' }}>
            <div className="max-w-[414px] md:max-w-[600px] w-full h-auto max-h-screen lg:max-h-[90vh] bg-white lg:rounded-xl shadow-xl flex flex-col items-center relative p-6 overflow-y-auto thin-grey-scrollbar min-h-0">

                {!showPaymentModal && (
                    <>
                        <button onClick={handleClose} className="absolute right-6 top-6 w-6 h-6 cursor-pointer">
                            <MdClose size={20} className="text-[#5f2daf]" />
                        </button>

                        <h1 className="text-lg font-bold text-purple-700 mt-4 text-center">Inscrição - {event.name}</h1>
                        <p className="text-xs text-black/60 text-center">
                            Preencha os campos obrigatórios para completar sua inscrição.
                        </p>

                        <p className="text-sm text-black text-center mt-2 bg-gray-100 px-4 py-2 rounded-md w-[90%]">
                            <span className="font-bold">Valor:</span> {formatCurrency(price)} + <span className="font-bold">Taxa de serviço:</span> {formatCurrency(serviceFee)} - <span className="font-bold text-[#5f2daf]">Total:</span> {formatCurrency(total)}
                        </p>

                        <p className="text-xs text-black/60 text-center mt-2 mb-6">
                            WhatsApp: <a className="text-[#5f2daf]" target="_blank" href="https://wa.me/5531996702827">(31) 99670-2827</a> -
                            Instagram: <a className="text-[#5f2daf]" target="_blank" href="https://www.instagram.com/starttraineroficial/">@starttraineoficial</a>
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center gap-3">

                            <input type="text" placeholder="Nome completo *" value={form.fullName}
                                onChange={e => setForm({ ...form, fullName: e.target.value })}
                                className="w-[90%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3" />

                            <input type="email" placeholder="Email *" value={form.email}
                                readOnly
                                className="w-[90%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3 cursor-not-allowed" />

                            <input type="text" placeholder="Telefone *" value={formatPhoneBR(form.phone)}
                                onChange={e => {
                                    const digits = onlyDigits(e.target.value).slice(0, 11);
                                    setForm({ ...form, phone: digits });
                                }}
                                className="w-[90%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3" />

                            <input type="text" placeholder="CPF *" value={formatCpf(form.cpf)}
                                onChange={e => {
                                    const digits = onlyDigits(e.target.value).slice(0, 11);
                                    setForm({ ...form, cpf: digits });
                                }}
                                className="w-[90%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3" />

                            <input
                                type="text"
                                placeholder="Data de nascimento *"
                                value={
                                    /^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)
                                        ? formatDateBR(form.birthDate)
                                        : formatInputDate(form.birthDate)
                                }
                                onChange={e => {
                                    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);

                                    if (digits.length === 8) {
                                        const iso = `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
                                        setForm({ ...form, birthDate: iso });
                                    } else {
                                        setForm({ ...form, birthDate: digits });
                                    }
                                }}
                                className="w-[90%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3"
                            />


                            <div className="w-[90%] py-4">
                                <div className="flex gap-2">
                                    <label className="inline-flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="distance"
                                            value="CORRIDA 10KM"
                                            checked={form.distance === "CORRIDA 10KM"}
                                            onChange={e => setForm({ ...form, distance: e.target.value })}
                                            style={{ accentColor: '#5f2daf' }}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-xs">CORRIDA 10KM</span>
                                    </label>
                                    <label className="inline-flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="distance"
                                            value="CORRIDA 5KM"
                                            checked={form.distance === "CORRIDA 5KM"}
                                            onChange={e => setForm({ ...form, distance: e.target.value })}
                                            style={{ accentColor: '#5f2daf' }}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-xs">CORRIDA 5KM</span>
                                    </label>
                                    <label className="inline-flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="distance"
                                            value="CAMINHADA 4 KM"
                                            checked={form.distance === "CAMINHADA 4 KM"}
                                            onChange={e => setForm({ ...form, distance: e.target.value })}
                                            style={{ accentColor: '#5f2daf' }}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-xs">CAMINHADA 4 KM</span>
                                    </label>
                                </div>
                            </div>

                            <Image
                                src={event.imagekitUrl}
                                alt="Tabela de tamanhos de camisetas"
                                width={400}
                                height={150}
                                className="mb-2 w-full max-w-[90%] rounded-md object-contain"
                            />

                            <Image
                                src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765646967/shirtSize_h3dwrb.jpg"
                                alt="Tabela de tamanhos de camisetas"
                                width={400}
                                height={150}
                                className="mb-2 w-full max-w-[90%] rounded-md object-contain"
                            />

                            <div className="relative w-[90%]">
                                <select
                                    value={form.shirtSize}
                                    onChange={(e) => setForm({ ...form, shirtSize: e.target.value })}
                                    className="w-full h-12 px-4 pr-10 text-purple-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none  cursor-pointer transition-all"
                                >
                                    <option value="" disabled>
                                        Selecione o tamanho *
                                    </option>
                                    <option value="Baby look M">Baby look (M)</option>
                                    <option value="P">P</option>
                                    <option value="M">M</option>
                                    <option value="G">G</option>
                                    <option value="GG">GG</option>
                                    <option value="XG">XG</option>
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>


                            <button type="submit"
                                className="w-[90%] h-12 bg-purple-600 text-white font-bold rounded-md mt-4 cursor-pointer hover:bg-[#61ffc2] hover:text-black transition-colors">
                                {loading ? "Aguarde..." : "Prosseguir para pagamento"}
                            </button>

                        </form>
                    </>
                )}
            </div>

            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
                        <div className="text-green-500 text-5xl mb-4">✔️</div>

                        <h2 className="font-bold text-lg">
                            Pagamento iniciado com sucesso
                        </h2>

                        <p className="text-sm text-gray-600 mt-2">
                            Seu pagamento está sendo processado.
                            Assim que for confirmado, sua inscrição será validada automaticamente.
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
                            Você receberá a confirmação pelo WhatsApp ou e-mail.
                        </p>

                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="mt-4 w-full h-11 bg-purple-600 text-white rounded-md"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
