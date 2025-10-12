"use client";

import Image from "next/image";
import { MdClose } from "react-icons/md";

type LoginModalProps = {
    openModal: boolean;
    setOpenModal?: (open: boolean) => void;
}

export default function LoginModal({ openModal, setOpenModal }: LoginModalProps) {

    const handleCloseModal = () => {
        if (setOpenModal) {
            setOpenModal(false);
        }
    }

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-[360px] lg:w-[514px] h-[500px] lg:h-[700px] bg-white rounded-xl shadow-xl flex flex-col items-center relative">
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

                    <input type="text" placeholder="Email ou CPF" className="w-[80%] h-12 border border-gray-200 rounded-md px-3 mt-8 focus:outline-none" />
                    <input type="password" placeholder="Senha" className="w-[80%] h-12 border border-gray-200 rounded-md px-3 mt-2 focus:outline-none" />
                    <button className="w-[80%] h-12 bg-purple-600 text-white font-bold rounded-md mt-6 hover:bg-purple-700 transition-colors">
                        Entrar
                    </button>
                    <button className="flex items-center justify-center w-[80%] h-12 bg-gray-200 text-gray-700 font-bold rounded-md mt-2 hover:bg-gray-300 transition-colors">
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
                    <p className="text-sm text-purple-700 mt-4">Esqueceu sua senha?</p>
                    <p className="text-sm text-gray-500 mt-2">Não tem uma conta? <span className="text-purple-600 cursor-pointer">
                        Cadastre-se
                    </span>
                    </p>

                </div>

            </div>
        </div>
    )
}