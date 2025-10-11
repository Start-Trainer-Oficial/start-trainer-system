import Image from "next/image"
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="flex flex-col text-white items-center justify-center w-full h-auto py-10 bg-gradient-to-r from-[#5f2daf] via-[#733df2] to-[#9b4bff]">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-7xl px-4 gap-8">
                <div className="flex flex-col items-center">
                    <Image src="/logos/startwhiteLogo.png" alt="Logo" width={600} height={400} className="object-contain w-[150px] lg:w-[200px]" />
                    <p className="text-xs text-center mt-2">© 2025 Start Trainer Oficial. Todos os direitos reservados.</p>
                </div>

                <p className="font-bold text-center lg:self-center lg:mt-10">A melhor comunidade de MG! 🤍</p>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-center">
                    <h1 className="font-bold text-lg mb-2 lg:mb-0">Redes Sociais</h1>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/starttraineroficial/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-700/20 rounded-full hover:text-gray-300 transition">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://www.youtube.com/@falaatletastart" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-700/20 rounded-full hover:text-gray-300 transition">
                            <FaYoutube size={30} />
                        </a>
                        <a href="https://chat.whatsapp.com/DqNvn6ZmHYE7CfrbYTFks8?mode=ems_share_t" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-700/20 rounded-full hover:text-gray-300 transition">
                            <FaWhatsapp size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}