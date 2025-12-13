"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoginModal } from "@/context/loginModalContext";
import { useRegisterModal } from "@/context/registerModalContext";
import { useForgotPasswordModal } from "@/context/password/forgotPasswordModalContext";
import { loginUser } from "@/services/user";
import { useAuth } from "@/context/authContext";

import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

export default function LoginModal() {
    const { isOpen, closeModal } = useLoginModal();
    const { openModal: openRegisterModal } = useRegisterModal();
    const { openModal: openForgotPasswordModal } = useForgotPasswordModal();
    const { loginUser: loginContext } = useAuth();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        identifier: "",
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
            const data = await loginUser(form.identifier.trim(), form.password);
            loginContext(data.user, data.token);
            setLoading(false);
            closeModal();
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message || error);
        }
        setLoading(false);
    };

    const handleGoToRegister = () => {
        closeModal();
        openRegisterModal();
    };

    const handleForgotPassword = () => {
        closeModal();
        openForgotPasswordModal();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-screen overflow-hidden"
            style={{ backdropFilter: 'blur(3px)' }}>

            <div className="w-full lg:w-[500px] h-full lg:h-[600px] bg-white lg:rounded-xl shadow-xl flex flex-col items-center relative">

                <button
                    onClick={closeModal}
                    className="absolute right-10 top-8 w-6 h-6 items-center text-white cursor-pointer font-semibold"
                >
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

                    <h2 className="text-md font-bold text-center mt-1 px-4 text-black/70">
                        A melhor comunidade de MG! 💜
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">

                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                            className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 rounded-md px-3 mt-8 focus:outline-none"
                        />

                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-[80%] h-12 text-purple-700 placeholder:text-black/40 border border-gray-200 rounded-md px-3 mt-2 focus:outline-none"
                        />

                        <button onClick={handleForgotPassword} className="text-sm cursor-pointer self-end mr-13 text-purple-700 mt-2">
                            Esqueceu a senha?
                        </button>

                        <button
                            className="w-[80%] h-12 bg-purple-600 text-white font-bold rounded-md cursor-pointer mt-6 hover:bg-[#61ffc2] hover:text-black transition-colors"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>

                        <button
                            onClick={handleGoToRegister}
                            type="button"
                            className="text-sm text-gray-500 mt-4"
                        >
                            Não tem uma conta?
                            <span className="text-purple-600 cursor-pointer"> Cadastre-se</span>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
