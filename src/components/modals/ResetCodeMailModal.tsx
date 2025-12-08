"use client";

import { useState } from "react";
import { useResetPasswordModal } from "@/context/resetModalContext";
import { validateResetCode } from "@/services/password-recovery";
import { useChangePasswordModal } from "@/context/changePasswordModalContext";

export default function ResetCodeModal() {

    const {openModal : openChangePasswordModal} = useChangePasswordModal();
    const email = localStorage.getItem("recovery_email") || "";

    const { isOpen, closeModal } = useResetPasswordModal();
    if (!isOpen) return null;

    const [digits, setDigits] = useState<string[]>(Array(6).fill(""));

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...digits];
        updated[index] = value;
        setDigits(updated);

        if (value && index < 5) {
            const next = document.getElementById(`code-${index + 1}`);
            next?.focus();
        }
    };

    const handleSubmit = async () => {
        const finalCode = digits.join("");

        if (finalCode.length !== 6) {
            return alert("Digite os 6 dígitos.");
        }

        try {
            await validateResetCode(email, finalCode);
            closeModal();
            openChangePasswordModal();
        } catch (err: any) {
            console.error(err);
        }

    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            const prev = document.getElementById(`code-${index - 1}`);
            prev?.focus();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg animate-fadeIn">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Digite o código recebido
                </h2>

                <div className="flex justify-center gap-2 mb-6">
                    {digits.map((digit, i) => (
                        <input
                            key={i}
                            id={`code-${i}`}
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className="w-10 h-12 text-center text-xl font-semibold border
                         rounded-md focus:outline-purple-600 focus:ring-2 
                         focus:ring-purple-400"
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full hover:bg-[#61ffc2] bg-[#5f2daf] hover:text-black text-white py-2 rounded-md 
                    transition cursor-pointer"
                >
                    Validar Código
                </button>
            </div>
        </div>
    );
}
