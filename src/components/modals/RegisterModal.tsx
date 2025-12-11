"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import { useRegisterModal } from "@/context/registerModalContext";
import { registerUser } from "@/services/user";

export default function RegisterModal() {
    const { isOpen, closeModal } = useRegisterModal();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        cpf: "",
        email: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
        const element = document.documentElement;

        if (isOpen) {
            element.classList.add("overflow-hidden");
        } else {
            element.classList.remove("overflow-hidden");
        }

        return () => element.classList.remove("overflow-hidden");
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await registerUser(form);
            if (response.status === 201) {
                alert("Usuário registrado com sucesso!");
                setLoading(false);
                closeModal();
            } else {
                alert("Erro ao registrar usuário. Por favor, tente novamente.");
                setLoading(true);
            }

        } catch (error: any) {
            console.error("Erro ao registrar usuário:", error?.message || error);

        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-screen overflow-hidden"
            style={{ backdropFilter: 'blur(3px)' }}>
            <div className="w-full lg:w-[500px] h-full lg:h-[700px] bg-white lg:rounded-xl shadow-xl flex flex-col items-center relative">

                <button onClick={closeModal} className="absolute right-10 top-8 w-6 h-6 items-center cursor-pointer">
                    <MdClose size={20} className="text-[#5f2daf]" />
                </button>

                <div className="flex flex-col justify-center items-center w-full h-full">
                    <Image
                        src="/header/start.png"
                        alt="Start Trainer Oficial"
                        width={1000}
                        height={300}
                        draggable={false}
                        className="w-full max-w-[200px] h-auto object-cover"
                    />

                    <h2 className="text-md font-bold text-center mt-1 px-4 text-black/70">A melhor comunidade de MG! 💜</h2>

                    <h1 className="text-lg font-bold text-purple-700 mt-4 uppercase">É aqui que sua jornada começa!</h1>
                    <p className="text-xs text-black/60 px-10 text-center">Crie sua conta e tenha acesso a todos os nossos recursos exclusivos.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full ">

                        <input type="text" onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Nome *"
                            className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3 mt-8" />

                        <input type="text" onChange={e => setForm({ ...form, cpf: e.target.value })}
                            placeholder="CPF *"
                            className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3 mt-3" />

                        <input type="text" onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="Email *"
                            className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3 mt-3" />

                        <input type="text" onChange={e => setForm({ ...form, phone: e.target.value })}
                            placeholder="Telefone *"
                            className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 outline-none rounded-md px-3 mt-3" />

                        <input type="password" onChange={e => setForm({ ...form, password: e.target.value })}
                            placeholder="Senha *"
                            className="w-[80%] h-12 text-purple-700 placeholder:text-black/40 border border-gray-200 outline-none rounded-md px-3 mt-3" />

                        <button type="submit"
                            className="w-[80%] h-12 bg-purple-600 text-white font-bold rounded-md mt-6 cursor-pointer hover:bg-[#61ffc2] hover:text-black transition-colors">
                            {loading ? "Cadastrando..." : "Concluir Cadastro"}
                        </button>

                    </form>

                    <h1 className="text-xs text-black/60 mt-4 px-10 text-center">
                        Ao clicar em "Concluir Cadastro", você concorda com nossos
                        <a href="#" className="text-purple-700 font-bold"> Termos de Serviço </a>
                        e nossa
                        <a href="#" className="text-purple-700 font-bold"> Política de Privacidade</a>.
                    </h1>

                </div>

            </div>
        </div>
    );
}
