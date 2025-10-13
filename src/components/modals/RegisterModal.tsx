"use client";

import Image from "next/image";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";

type LoginModalProps = {
    openModalRegister: boolean;
    setOpenModalRegister?: (open: boolean) => void;
}

export default function RegisterModal({ openModalRegister, setOpenModalRegister }: LoginModalProps) {

    useEffect(() => {
        const element = document.documentElement;

        if (openModalRegister) {
            element.classList.add("overflow-hidden");
        } else {
            element.classList.remove("overflow-hidden");
        }

        return () => element.classList.remove("overflow-hidden");
    }, [openModalRegister]);


    const handleCloseModal = () => {
        if (setOpenModalRegister) {
            setOpenModalRegister(false);
        }
    }

    if (!openModalRegister) return null;

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

                    <h1 className="text-xl font-bold text-purple-700 mt-4 uppercase">É aqui que sua jornada começa!</h1>
                    <p className="text-xs text-black/60 px-10 text-center">Crie sua conta e tenha acesso a todos os nossos recursos exclusivos.</p>

                    <input type="text" placeholder="Nome *" className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 rounded-md px-3 mt-8 focus:outline-none" />

                    <input type="text" placeholder="CPF *" className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 rounded-md px-3 mt-3 focus:outline-none" />

                    <input type="text" placeholder="Email *" className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 rounded-md px-3 mt-3 focus:outline-none" />

                    <input type="text" placeholder="Telefone *" className="w-[80%] text-purple-700 placeholder:text-black/40 h-12 border border-gray-200 rounded-md px-3 mt-3 focus:outline-none" />

                    <input type="password" placeholder="Senha *" className="w-[80%] h-12 text-purple-700 placeholder:text-black/40 border border-gray-200 rounded-md px-3 mt-3 focus:outline-none" />

                    <button className="w-[80%] h-12 bg-purple-600 text-white font-bold rounded-md mt-6 hover:bg-purple-700 transition-colors">
                        Concluir Cadastro
                    </button>

                    <h1 className="text-sm text-black/60 mt-4 px-10 text-center">Ao clicar em "Concluir Cadastro", você concorda com nossos <span className="text-purple-700 font-bold">Termos de Serviço</span> e nossa <span className="text-purple-700 font-bold">Política de Privacidade</span>.</h1>


                </div>

            </div>
        </div>
    )
}