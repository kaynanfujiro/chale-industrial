// ReservationButton.tsx
import React from "react";

interface ReservationButtonProps {
    message: string;
}

const ReservationButton: React.FC<ReservationButtonProps> = ({ message }) => {
    const whatsappNumber = "19996104456";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="bg-red-500 hover:bg-red-600 text-white w-full mt-4 py-3 rounded-lg font-semibold">
                Reservar
            </button>
        </a>
    );
};

export default ReservationButton;
