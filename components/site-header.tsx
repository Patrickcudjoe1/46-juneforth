"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <Link
            href={href}
            className="rounded-full border border-foreground/30 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-foreground transition hover:bg-foreground hover:text-background sm:text-sm md:tracking-widest"
        >
            {children}
        </Link>
    );
};

export interface SiteHeaderProps {
    leftAction?: React.ReactNode;
    disableThemeToggle?: boolean;
}


export function SiteHeader({ leftAction, disableThemeToggle = false }: SiteHeaderProps) {
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-transparent px-4 py-3 pointer-events-none">
            {/* Left: Hamburger */}
            <div className="flex items-center min-w-[32px] pointer-events-auto">
                <button className="text-white" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Center: Title */}
            <div className="flex-1 flex justify-center pointer-events-auto">
                <span className="text-white font-bold tracking-[0.3em] text-lg uppercase" style={{ letterSpacing: '0.3em' }}>Fear of God</span>
            </div>

            {/* Right: Search and Cart */}
            <div className="flex items-center gap-4 min-w-[64px] justify-end pointer-events-auto">
                <button className="text-white" aria-label="Search">
                    <Search className="h-5 w-5" />
                </button>
                <Link href="/cart" className="text-white flex items-center" aria-label="Cart">
                    <ShoppingBag className="h-5 w-5" />
                    {/* Optionally show cart count: <span className="ml-1 text-xs">({mounted ? totalItems : 0})</span> */}
                </Link>
            </div>
        </header>
    );
}
