"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface JuneforthHeroProps {
    imageSrc?: string;
    imageAlt?: string;
    leftText?: string;
    rightText?: string;
    className?: string;
}

export const JuneforthHero = ({
    imageSrc = "/image 13.webp",
    imageAlt = "Juneforth Collection",
    leftText = "JUNEFORTH*",
    rightText = "",
    className,
}: JuneforthHeroProps) => {
    return (
        <div className={cn("relative h-screen w-full overflow-hidden bg-black", className)}>
            {/* Background Image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0 h-full w-full"
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover grayscale-[20%] brightness-[0.85]"
                />
            </motion.div>

            {/* Side Content Container removed per user request */}

            {/* Bottom Buttons Container */}
            <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center justify-center gap-4 px-6 md:bottom-20 md:flex-row md:gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="w-full md:w-auto"
                >
                    <Link
                        href="/lookbook"
                        className="flex h-12 w-full items-center justify-center border border-white px-8 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black md:w-[320px]"
                    >
                        DISCOVER  LOOKBOOK
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="w-full md:w-auto"
                >
                    <Link
                        href="/shop"
                        className="flex h-12 w-full items-center justify-center border border-white px-8 text-[11px] font-bold tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black md:w-[320px]"
                    >
                        SHOP
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
