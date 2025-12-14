"use client";

import { useState, useEffect, MouseEvent } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const images = [
    {
        url: "https://res.cloudinary.com/dytw21kw2/image/upload/v1765647033/capa_wqcjpz.jpg",
        link: "https://chat.whatsapp.com/DqNvn6ZmHYE7CfrbYTFks8?mode=ems_share_t"
    },
    {
        url: "https://res.cloudinary.com/dytw21kw2/image/upload/v1765647037/capa1_ub94gy.jpg",
        link: "https://www.instagram.com/starttraineroficial/"
    },
    {
        url: "https://res.cloudinary.com/dytw21kw2/image/upload/v1765647033/capa2_crnl5w.jpg",
        link: "#agenda"
    }
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
    const nextSlide = () => setCurrent((current + 1) % images.length);

    const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const link = images[current].link;
        if (link && link.startsWith("#")) {
            e.preventDefault();
            const id = link.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <>
            <div className="relative w-[340px] h-[200px] lg:w-[1200px] lg:h-[520px] mx-auto mt-20 shadow-xl">
                <a
                    href={images[current].link}
                    onClick={handleAnchorClick}
                    target={images[current].link && images[current].link.startsWith("#") ? undefined : "_blank"}
                    rel={images[current].link && images[current].link.startsWith("#") ? undefined : "noopener noreferrer"}
                    className="block w-full h-full rounded-xl bg-black shadow-lg cursor-pointer hover:brightness-95 transition-transform duration-200"
                    style={{
                        backgroundImage: `url(${images[current].url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                />

                <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white cursor-pointer rounded-full p-2 hover:bg-opacity-70 transition"
                    aria-label="Anterior"
                >
                    <MdArrowBack size={24} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer rounded-full p-2 hover:bg-opacity-70 transition"
                    aria-label="Próximo"
                >
                    <MdArrowForward size={24} />
                </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${current === idx ? "bg-white scale-125" : "bg-gray-400 opacity-60"} focus:outline-none`}
                    />
                ))}
            </div>
        </>
    );
}