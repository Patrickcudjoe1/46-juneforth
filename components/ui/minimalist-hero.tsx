"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { TransparentHeader } from "@/components/transparent-header";

interface MinimalistHeroProps {
  logoText: string;
  mainText: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  overlayText: string;
  locationText: string;
  className?: string;
}



export const MinimalistHero = ({
  logoText,
  mainText,
  imageSrc,
  videoSrc,
  imageAlt,
  overlayText,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12",
        className
      )}
    >
      {/* Fullscreen Image Background */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      )}

      {/* Content Wrapper */}
      <div className="relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-between">
        <TransparentHeader logoText={logoText} absolute={false} className="w-full !px-0 pt-0" />

        <div className="flex w-full flex-grow flex-col items-center justify-center gap-8 text-center pb-20 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/80 mix-blend-difference hidden md:block">
              {mainText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <h1 className="max-w-full text-[clamp(4rem,10vw,12rem)] font-extrabold leading-[0.85] tracking-tight text-white mix-blend-difference drop-shadow-sm">
              {overlayText}
            </h1>
            <div className="mt-12 hidden gap-6 justify-center md:flex pointer-events-auto">
              <Link href="/shop">
                <InteractiveHoverButton text="SHOP" />
              </Link>
              <Link href="/lookbook">
                <InteractiveHoverButton text="LOOK BOOK" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-8 flex w-full flex-row justify-center items-center gap-4 md:hidden pointer-events-auto"
          >
            <Link href="/shop">
              <InteractiveHoverButton text="SHOP" />
            </Link>
            <Link href="/lookbook">
              <InteractiveHoverButton text="LOOK BOOK" />
            </Link>
          </motion.div>
        </div>
      </div>

      <footer className="z-30 mt-8 flex w-full max-w-7xl items-center justify-between md:mt-0 md:pb-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-white/80 mix-blend-difference"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};

