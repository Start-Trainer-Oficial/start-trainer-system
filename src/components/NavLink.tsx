"use client";

type OptionType = "Trilhas" | "Corridas" | "Beneficentes";

type NavLinkProps = {
    labels: string[];
    options: readonly OptionType[];
    selectedOption: OptionType;
    onSelect: (option: OptionType) => void;
};

export default function NavLink({ labels, options, selectedOption, onSelect }: NavLinkProps) {
    return (
        <div className="flex items-center w-[330px] md:w-[480px] justify-center rounded-sm bg-gray-700/8 mt-4 text-sm">
            {options.map((option, index) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    className={`px-6 lg:px-12 py-2 rounded-sm font-semibold transition-all duration-300 cursor-pointer
                        ${selectedOption === option
                            ? "bg-gradient-to-r from-[#00e5ff] via-[#00e5ff] to-[#5cffb8] text-black"
                            : "bg-transparent text-black"}`
                    }
                >
                    {labels[index]}
                </button>
            ))}
        </div>
    );
}
