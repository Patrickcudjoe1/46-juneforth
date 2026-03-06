"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface JuneforthHeaderProps {
    className?: string;
}

export const JuneforthHeader = ({ className }: JuneforthHeaderProps) => {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <header
            className={cn(
                "w-full z-[100] flex items-center justify-between px-6 transition-all duration-300 ease-in-out",
                scrolled
                    ? "fixed top-0 left-0 right-0 bg-white py-3 border-t-[6px] border-[#2A1D15] shadow-sm text-black"
                    : "absolute top-0 left-0 right-0 bg-transparent py-8 text-white",
                className
            )}
        >
            {/* Mobile: Left Menu Icon */}
            <div className="flex lg:hidden flex-1 justify-start">
                <button className={cn("hover:opacity-60 transition-opacity", scrolled ? "text-black" : "text-white")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="4" y1="9" x2="20" y2="9" />
                        <line x1="4" y1="15" x2="20" y2="15" />
                    </svg>
                </button>
            </div>

            {/* Desktop: Left Navigation */}
            <nav className={cn(
                "hidden lg:flex flex-1 items-center justify-start gap-8 text-[11px] font-medium tracking-[0.2em]",
                scrolled ? "text-black" : "text-white"
            )}>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">FEATURED</Link>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">COLLECTIONS</Link>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">MENS</Link>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">WOMENS</Link>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">KIDS</Link>
            </nav>

            {/* Center Logo (Always Centered) */}
            <div className="flex flex-1 justify-center">
                <Link href="/" className="group">
                    <div
                        className={cn(
                            "text-[14px] font-bold tracking-[0.3em] uppercase group-hover:opacity-60 transition-opacity",
                            scrolled ? "text-black" : "text-white"
                        )}
                        style={{ fontFamily: "'Futuracyrillic ExtraBold', sans-serif" }}
                    >
                        JUNEFORTH*
                    </div>
                </Link>
            </div>

            {/* Desktop: Right Navigation */}
            <nav className={cn(
                "hidden lg:flex flex-1 items-center justify-end gap-8 text-[11px] font-medium tracking-[0.2em]",
                scrolled ? "text-black" : "text-white"
            )}>
                <button className="hover:opacity-60 transition-opacity uppercase">SEARCH</button>
                <Link href="/account" className="hover:opacity-60 transition-opacity uppercase">ACCOUNT</Link>
                <Link href="/cart" className="hover:opacity-60 transition-opacity uppercase">BAG</Link>
            </nav>

            {/* Mobile: Right Icons (Search & Bag) */}
            <div className={cn("flex lg:hidden flex-1 justify-end gap-4", scrolled ? "text-black" : "text-white")}>
                <button className="hover:opacity-60 transition-opacity">
                    <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <Link href="/cart" className="hover:opacity-60 transition-opacity">
                    <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                </Link>
            </div>
        </header>
    );
};
