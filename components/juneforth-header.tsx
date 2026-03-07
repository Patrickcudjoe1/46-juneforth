"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon, ShoppingBag as BagIcon } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

interface JuneforthHeaderProps {
    className?: string;
}

export const JuneforthHeader = ({ className }: JuneforthHeaderProps) => {
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isAccountPage = pathname === "/account";
    const forceSolid = isAccountPage;

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
                "w-full z-[100] flex items-center px-6 transition-all duration-300 ease-in-out",
                (scrolled || forceSolid)
                    ? "fixed top-0 left-0 right-0 bg-white py-4 border-t-[6px] border-[#2A1D15] shadow-sm text-black"
                    : "fixed top-0 left-0 right-0 bg-transparent py-8 text-white",
                className
            )}
        >
            {/* Desktop: Left Navigation */}
            <nav className={cn(
                "hidden lg:flex flex-1 items-center justify-start gap-10 text-[11px] font-medium tracking-[0.2em]",
                (scrolled || forceSolid) ? "text-black" : "text-white"
            )}>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">FEATURED</Link>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">COLLECTIONS</Link>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">MENS</Link>
                <Link href="/shop" className="hover:opacity-60 transition-opacity">WOMENS</Link>
            </nav>

            {/* Mobile: Left Menu Icon */}
            <div className="flex lg:hidden flex-1 justify-start">
                <button className={cn("hover:opacity-60 transition-opacity", (scrolled || forceSolid) ? "text-black" : "text-white")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="4" y1="9" x2="20" y2="9" />
                        <line x1="4" y1="15" x2="20" y2="15" />
                    </svg>
                </button>
            </div>

            {/* Logo (Centered) */}
            <div className="flex flex-1 justify-center">
                <Link href="/" className="group">
                    <img
                        src="/images/JUNE       FORTH_logo.png"
                        alt="JUNEFORTH"
                        className={cn(
                            "h-4 lg:h-6 w-auto transition-all duration-300",
                            (scrolled || forceSolid) ? "brightness-0" : "brightness-0 invert"
                        )}
                    />
                </Link>
            </div>

            {/* Desktop: Right Navigation */}
            <nav className={cn(
                "hidden lg:flex flex-1 items-center justify-end gap-10 text-[11px] font-medium tracking-[0.2em]",
                (scrolled || forceSolid) ? "text-black" : "text-white"
            )}>
                <button className="hover:opacity-60 transition-opacity uppercase">SEARCH</button>
                <Link href="/account" className="hover:opacity-60 transition-opacity uppercase">ACCOUNT</Link>
                <Link href="/cart" className="hover:opacity-60 transition-opacity uppercase flex items-center gap-1">
                    BAG ({totalItems})
                </Link>
            </nav>

            {/* Mobile: Right Icons (Search & Bag) */}
            <div className={cn("flex lg:hidden flex-1 justify-end gap-4", (scrolled || forceSolid) ? "text-black" : "text-white")}>
                <button className="hover:opacity-60 transition-opacity">
                    <SearchIcon className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <Link href="/cart" className="hover:opacity-60 transition-opacity relative">
                    <BagIcon className="h-5 w-5" strokeWidth={1.5} />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};
