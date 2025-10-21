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
        <div className="flex items-center justify-center rounded-xl bg-gray-700/8 mt-4">
            {options.map((option, index) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    className={`px-6 lg:px-12 py-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer
                        ${selectedOption === option
                            ? "bg-gradient-to-r from-[#5f2daf] via-[#733df2] to-[#9b4bff] text-white"
                            : "bg-transparent text-[#5f2daf]"}`
                    }
                >
                    {labels[index]}
                </button>
            ))}
        </div>
    );
}
