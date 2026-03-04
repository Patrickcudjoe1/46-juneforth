"use client";

import { useState } from "react";
import Link from "next/link";
import { TransparentHeader } from "@/components/transparent-header";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export interface LookbookItem {
    id: string;
    image: string;
    title?: string;
    href: string;
}

export interface LookbookSectionProps {
    items?: LookbookItem[];
}

const defaultItems: LookbookItem[] = [
    {
        id: "look-1",
        title: "LOOK 01",
        image: "/images/J4-1.png",
        href: "#",
    },
    {
        id: "look-2",
        title: "LOOK 02",
        image: "/images/J4-3.jpg",
        href: "#",
    },
    {
        id: "look-3",
        title: "LOOK 03",
        image: "/images/J4-7.jpg",
        href: "#",
    },
    {
        id: "look-4",
        title: "LOOK 04",
        image: "/images/J4-9.jpg",
        href: "#",
    },
    {
        id: "look-5",
        title: "LOOK 05",
        image: "/images/J4-11.jpg",
        href: "#",
    },
    {
        id: "look-6",
        title: "LOOK 06",
        image: "/images/J4-13.jpg",
        href: "#",
    },
];

export function LookbookSection({ items = defaultItems }: LookbookSectionProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="bg-white text-black min-h-screen relative">
            <TransparentHeader
                absolute={true}
                hideThemeToggle={true}
                forceLightMode={true}
            />

            {/* Hero Video */}
            <div className="relative h-screen w-full overflow-hidden bg-black/5">
                <video
                    key="/VID-1.webm"
                    src="/VID-1.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    preload="auto"
                    suppressHydrationWarning
                    className="absolute inset-0 h-full w-full object-cover pt-[73px]"
                />
                <div className="absolute inset-0 mt-[73px] flex flex-col items-center justify-center pointer-events-none text-center px-6">
                    <h1 className="max-w-full text-[clamp(3rem,8vw,10rem)] font-extrabold leading-[0.85] tracking-tight text-white mix-blend-difference drop-shadow-sm uppercase">
                        VISUAL ARCHIVE
                    </h1>
                    <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed text-white/90 mix-blend-difference">
                        YOUNG AT HEART WITH A VISION.
                    </p>
                </div>
            </div>

            {/* Brand Description */}
            <div className="px-6 py-16 md:py-24 text-center">
                <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-black uppercase">
                        The JUNEFORTH* Lookbook
                    </h2>
                    <p className="text-black/70 text-sm md:text-base font-medium tracking-wide">
                        A canvas of style, worn by the community
                    </p>
                </div>
            </div>

            {/* Lookbook Grid */}
            <section className="px-6 md:px-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-24">
                    {items.map((item, index) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className="group flex flex-col items-center gap-6"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
                                <img
                                    src={item.image}
                                    alt={item.title || ""}
                                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out mix-blend-multiply"
                                />
                            </div>

                            {item.title && (
                                <div className="flex flex-col items-center">
                                    <p className="font-mono text-sm tracking-widest text-center text-black font-bold uppercase">{item.title}</p>
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
