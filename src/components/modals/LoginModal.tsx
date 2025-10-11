"use client";

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
            <div className="w-[360px] lg:w-[514px] h-[500px] bg-white rounded-xl shadow-xl flex flex-col items-center relative">  
                <button onClick={handleCloseModal} className="absolute right-10 top-8 w-6 h-6 items-center text-white cursor-pointer font-semibold">
                    <MdClose size={20} className="text-[#5f2daf]" />
                </ button>
            </div>
        </div>
    )
}