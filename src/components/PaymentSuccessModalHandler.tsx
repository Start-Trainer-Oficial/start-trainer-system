"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import HomePage from "@/app/page";
import PaymentSuccess from "@/app/payment/success/page";

export default function PaymentSuccessOverlay() {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (pathname === "/payment/success") {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [pathname]);

    return (
        <>
            <HomePage />
            {showModal && <PaymentSuccess />}
        </>
    );
}
