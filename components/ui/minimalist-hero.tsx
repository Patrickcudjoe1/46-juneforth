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
  imageSrc: string;
  imageAlt: string;
  overlayText: string;
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: LucideIcon;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/70 transition-colors hover:text-foreground"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  mainText,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
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
      <TransparentHeader logoText={logoText} absolute={true} />

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center pb-12 md:pb-0 md:grid-cols-12 md:gap-4 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 mt-8 text-center md:order-1 md:col-span-3 md:mt-0 md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">
            {mainText}
          </p>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2 md:col-span-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          />
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-56 scale-150 object-cover md:w-64 lg:w-72"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4,
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80";
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-2 mt-8 flex flex-col items-center justify-center text-center md:order-3 md:col-span-5 md:mt-0 md:items-center md:text-center"
        >
          <h1 className="max-w-full text-[clamp(3rem,6.5vw,9rem)] font-extrabold leading-[0.85] tracking-tight text-foreground">
            {overlayText}
          </h1>
          <div className="mt-8 hidden gap-4 justify-center md:flex">
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
          className="z-20 order-4 mt-12 flex w-full flex-row justify-center items-center gap-4 md:hidden"
        >
          <Link href="/shop">
            <InteractiveHoverButton text="SHOP" />
          </Link>
          <Link href="/lookbook">
            <InteractiveHoverButton text="LOOK BOOK" />
          </Link>
        </motion.div>
      </div>

      <footer className="z-30 mt-8 flex w-full max-w-7xl items-center justify-between md:mt-0 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4 md:hidden"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};

