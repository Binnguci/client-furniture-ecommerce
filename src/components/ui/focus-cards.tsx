"use client";
import React, {useState} from "react";
import {cn} from "../../lib/utils";

export const Card = React.memo(
    ({
         card,
         index,
         hovered,
         setHovered,
     }: {
        card: any;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-lg  relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
            )}
        >
            <div className="relative w-full h-full !text-[#FFA726]">
                <img
                    src={card.src}
                    alt={card.title}
                    className="object-cover absolute inset-0 w-full h-full "
                />
            </div>
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 flex items-end  py-8 px-4 transition-opacity duration-300",
                    hovered === index ? "opacity-100" : "opacity-0"
                )}
            >
                <div
                    className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                    {card.title}
                </div>
            </div>
        </div>
    )
);

Card.displayName = "Card";

type Card = {
    title: string;
    src: string;
};

export function FocusCards({cards}: { cards: Card[] }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 !text-[#FFA726] md:grid-cols-3 gap-10 max-w-[95rem] mx-auto w-full pt-16">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
}