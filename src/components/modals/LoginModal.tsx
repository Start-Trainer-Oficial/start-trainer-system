"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import { loginUser } from "@/services/api";
import { useAuth } from "@/context/authContext";

type LoginModalProps = {
    openModalLogin: boolean;
    setOpenModalLogin?: (open: boolean) => void;
}

export default function LoginModal({ openModalLogin, setOpenModalLogin }: LoginModalProps) {

    const {loginUser: loginContext} = useAuth();

    const [form, setForm] = useState({
        identifier: "",
        password: ""
    })
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const element = document.documentElement;

        if (openModalLogin) {
            element.classList.add("overflow-hidden");
        } else {
            element.classList.remove("overflow-hidden");
        }

        return () => element.classList.remove("overflow-hidden");
    }, [openModalLogin]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginUser(form.identifier.trim(), form.password);
            loginContext(data.user, data.token);
            handleCloseModal();
        } catch (error: any) {
            console.error("Erro ao realizar login:", error?.message || error);
        }

    }

    const handleCloseModal = () => {
        if (setOpenModalLogin) {
            setOpenModalLogin(false);
        }
    }

    if (!openModalLogin) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-screen overflow-hidden">
            <div className="w-full lg:w-[500px] h-full lg:h-[700px] bg-white lg:rounded-xl shadow-xl flex flex-col items-center relative ">
                <button onClick={handleCloseModal} className="absolute right-10 top-8 w-6 h-6 items-center text-white cursor-pointer font-semibold">
                    <MdClose size={20} className="text-[#5f2daf]" />
                </ button>

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

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">

                        <input type="text" onChange={e => setForm({ ...form, identifier: e.target.value })} placeholder="Email" className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 rounded-md px-3 mt-8 focus:outline-none" />

                        <input type="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Senha" className="w-[80%] h-12 text-purple-700 placeholder:text-black/40 border border-gray-200 rounded-md px-3 mt-2 focus:outline-none" />

                        <a className="text-sm cursor-pointer self-end mr-13 text-purple-700 mt-2">Esqueceu a senha?</a>

                        <button className="w-[80%] h-12 bg-purple-600 text-white font-bold rounded-md cursor-pointer mt-6 hover:bg-purple-700 transition-colors">
                            Entrar
                        </button>

                        <div className="flex items-center w-[80%] mt-4">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="mx-3 text-sm text-gray-500">Ou entre com</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        <button className="flex items-center justify-center w-[80%] h-12 bg-gray-200 text-gray-700 font-bold cursor-pointer rounded-md mt-3 hover:bg-gray-300 transition-colors">
                            <Image
                                src="/logos/googleIcon.png"
                                alt="Entre com Google"
                                width={1000}
                                height={300}
                                draggable={false}
                                className="w-full max-w-[40px] h-auto object-cover"
                            />
                            Entrar com Google
                        </button>

                        <p className="text-sm text-gray-500 mt-2">Não tem uma conta? <a href="#" className="text-purple-600 cursor-pointer">
                            Cadastre-se
                        </a>
                        </p>

                    </form>

                </div>

            </div>
        </div>
    )
}