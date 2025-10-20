"use client";

import { useState } from "react";

type NavLinkProps = {
    labels: string[];
    options: string[];
}

export default function NavLink({ labels, options }: NavLinkProps) {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <div className="flex items-center justify-center rounded-xl bg-gray-700/8 mt-4">
            {options.map((option, index) => (
                <button key={option} onClick={() => setSelectedOption(option)} className={` px-6 lg:px-12 py-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer
                    ${selectedOption === option
                        ? "bg-gradient-to-r from-[#5f2daf] via-[#733df2] to-[#9b4bff] text-white"
                        : "bg-transparent text-[#5f2daf]"}
                `}>
                    {labels[index]}
                </button>
            ))}
        </div>
    )
}