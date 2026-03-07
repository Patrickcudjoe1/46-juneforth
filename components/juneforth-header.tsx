"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon, ShoppingBag as BagIcon, X, ChevronRight, Menu } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface JuneforthHeaderProps {
    className?: string;
}

export const JuneforthHeader = ({ className }: JuneforthHeaderProps) => {
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    if (!mounted) return null;

    const navLinks = [
        { name: "FEATURED", href: "/shop" },
        { name: "COLLECTIONS", href: "/shop" },
        { name: "MENS", href: "/shop" },
        { name: "WOMENS", href: "/shop" },
        { name: "KIDS", href: "/shop" },
    ];

    const utilityLinks = [
        { name: "ACCOUNT", href: "/account" },
        { name: "CONTACT", href: "/contact" },
        { name: "CLIENT SERVICES", href: "/services" },
        { name: "LEGAL NOTICES", href: "/legal" },
        { name: "SUPPLY CHAINS ACT", href: "/supply-chain" },
        { name: "SOCIAL", href: "/social" },
    ];

    return (
        <>
            <header
                className={cn(
                    "w-full z-[100] flex items-center px-6 transition-all duration-300 ease-in-out",
                    (scrolled || forceSolid || isMenuOpen)
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
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={cn("hover:opacity-60 transition-opacity", (scrolled || forceSolid) ? "text-black" : "text-white")}
                    >
                        <Menu size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Logo (Centered) */}
                <div className="flex flex-1 justify-center">
                    <Link href="/" className="group" onClick={() => setIsMenuOpen(false)}>
                        <img
                            src="/images/JUNE       FORTH_logo.png"
                            alt="JUNEFORTH"
                            className={cn(
                                "h-4 lg:h-6 w-auto transition-all duration-300",
                                (scrolled || forceSolid || isMenuOpen) ? "brightness-0" : "brightness-0 invert"
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
                <div className={cn("flex lg:hidden flex-1 justify-end gap-4", (scrolled || forceSolid || isMenuOpen) ? "text-black" : "text-white")}>
                    <button className="hover:opacity-60 transition-opacity">
                        <SearchIcon className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                    <Link href="/cart" className="hover:opacity-60 transition-opacity relative" onClick={() => setIsMenuOpen(false)}>
                        <BagIcon className="h-5 w-5" strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <div className="flex justify-end p-8">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white hover:opacity-60 transition-opacity"
                            >
                                <X size={32} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col px-8 pt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between py-5 border-b border-white/10 group"
                                >
                                    <span className="text-white text-lg tracking-[0.2em] font-medium uppercase group-hover:opacity-60 transition-opacity">
                                        {link.name}
                                    </span>
                                    <ChevronRight size={20} className="text-white opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </nav>

                        {/* Utility Links */}
                        <div className="mt-auto p-8 flex flex-col gap-6">
                            {utilityLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white/60 text-[11px] tracking-[0.3em] font-medium uppercase hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
