"use client";

import { useState, useEffect } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const images = [
    {
        url: "/carousel/capa.jpg",
        link: "https://chat.whatsapp.com/DqNvn6ZmHYE7CfrbYTFks8?mode=ems_share_t"
    },
    {
        url: "/carousel/capa.jpg",
        link: "https://example.com/slide2"
    },
    {
        url: "/carousel/capa.jpg",
        link: "https://example.com/slide3"
    }
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
    const nextSlide = () => setCurrent((current + 1) % images.length);

    return (
        <>
            <div className="relative w-[360px] h-[200px] lg:w-[1200px] lg:h-[520px] mx-auto mt-20">
                <a
                    href={images[current].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full rounded-xl bg-black shadow-lg cursor-pointer hover:brightness-95 transition-transform duration-200"
                    style={{
                        backgroundImage: `url(${images[current].url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                >
                    
                </a>

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
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${current === idx ? "bg-gray-800 scale-125" : "bg-gray-400 opacity-60"} focus:outline-none`}
                    />
                ))}
            </div>
        </>
    );
}