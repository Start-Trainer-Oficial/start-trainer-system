import Image from "next/image"
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="flex flex-col text-white items-center justify-center w-full h-auto py-10 bg-[#5cffb8]">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-7xl px-4 gap-8">
                <div className="flex flex-col items-center">
                    <Image src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765647072/start_czqyaz.png" alt="Logo" width={600} height={400} className="object-contain w-[150px] lg:w-[200px]" />
                    <p className="text-xs text-black text-center mt-4">© 2026 Start Trainer Oficial. Todos os direitos reservados.</p>
                </div>

                <div className="flex flex-col  lg:self-center">
                    <div className="flex justify-center gap-4">
                        <Image src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765647062/logoTrekking_bvrjd5.png" alt="Logo" width={600} height={400} className="object-contain w-[120px]" />
                        <Image src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765647062/logoRunners_pzttxv.png" alt="Logo" width={600} height={400} className="object-contain w-[120px]" />
                        <Image src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765647062/logoInstituto_zeh16p.png" alt="Logo" width={600} height={400} className="object-contain w-[120px]" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-center">
                    <h1 className="font-bold text-lg mb-2 lg:mb-0 text-black">Redes Sociais</h1>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/starttraineroficial/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-700/20 rounded-full hover:text-gray-300 transition">
                            <FaInstagram size={30} className="text-black" />
                        </a>
                        <a href="https://www.youtube.com/@falaatletastart" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-700/20 rounded-full hover:text-gray-300 transition">
                            <FaYoutube size={30} className="text-black" />
                        </a>
                        <a href="https://chat.whatsapp.com/DqNvn6ZmHYE7CfrbYTFks8?mode=ems_share_t" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-700/20 rounded-full hover:text-gray-300 transition">
                            <FaWhatsapp size={30} className="text-black" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}