"use client";

import { useState, useEffect } from "react";

const images = [
    {
        url: "/comingSoon/halloween.jpg",
        link: "https://chat.whatsapp.com/DqNvn6ZmHYE7CfrbYTFks8?mode=ems_share_t"
    },
    {
        url: "/comingSoon/halloween.jpg",
        link: "https://chat.whatsapp.com/DqNvn6ZmHYE7CfrbYTFks8?mode=ems_share_t"
    },
    {
        url: "/comingSoon/halloween.jpg",
        link: "https://chat.whatsapp.com/DqNvn6ZmHYE7CfrbYTFks8?mode=ems_share_t"
    },
];

export default function ComingSoon() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 1500);
        return () => clearInterval(interval);
    }, [images.length]);


    return (
        <>
            <div className="relative w-[360px] h-[200px] lg:w-[1200px] lg:h-[520px] mx-auto mt-5">
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
            </div>

            <div className="flex justify-center mt-4 ml-6 space-x-2">
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