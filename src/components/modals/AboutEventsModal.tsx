import { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface AboutEventsModalProps {
    open: boolean;
    onClose?: () => void;
    event?: {
        name: string;
        about: string;
        title: string;
        type: string;
        urlLinkAbout: string;

    };
}

export default function AboutEventsModal({ open, onClose, event }: AboutEventsModalProps) {

    useEffect(() => {
        const root = document.getElementById("__next") || document.getElementById("root");

        if (open) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            if (root) root.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            if (root) root.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            if (root) root.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;

    const handleClose = () => onClose && onClose();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            style={{ backdropFilter: "blur(3px)" }}
        >
            <div
                className="
                    relative bg-white 
                    max-w-[414px] h-screen md:max-w-[600px] md:h-[760px] 
                    w-full h-auto
                    rounded-xl shadow-xl px-7 py-10
                    overflow-y-auto thin-grey-scrollbar
                "
            >
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-[#5f2daf] cursor-pointer"
                >
                    <MdClose size={22} />
                </button>

                <h1 className="text-2xl text-center font-semibold text-[#5f2daf]">{event?.name}</h1>
                <h1 className="text-lg font-semibold text-center text-black mb-6">{event?.title}</h1>

                <div className="text-gray-700  whitespace-pre-line text-start px-4 mt-2">{event?.about}</div>

                {event?.type === "Beneficentes" && event?.urlLinkAbout && (
                    <div className="mt-6 px-4 text-center">
                        <a target="_blank" href={event.urlLinkAbout} className="cursor-pointer py-2 px-4 rounded-lg bg-[#5f2daf] inline-block text-white transition-colors">
                            <span className="text-sm">Saiba como ajudar aqui!</span>
                        </a>
                    </div>
                )}

            </div>
        </div>
    );
}
