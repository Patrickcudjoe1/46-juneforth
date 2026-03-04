"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { User, ShoppingCart, Home, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/components/cart-provider";

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
    hideThemeToggle?: boolean;
}

export const SiteHeader = ({ leftAction, hideThemeToggle }: SiteHeaderProps) => {
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const categories = ["NEW", "MENS", "WOMENS", "SLIDES", "ACCESSORIES"];
    const [activeCategory, setActiveCategory] = useState("NEW");

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-background px-6 py-4 md:px-12">
            <div className="flex items-center min-w-[32px]">
                {leftAction || (
                    <button className="text-xl opacity-70 hover:opacity-100 transition-opacity">
                        +
                    </button>
                )}
            </div>

            <div className="relative flex flex-1 justify-center z-50">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest font-bold text-foreground hover:opacity-70 transition-opacity uppercase"
                >
                    {activeCategory} <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-6 flex flex-col w-48 bg-background border border-foreground/20 shadow-lg rounded-none overflow-hidden"
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setIsFilterOpen(false);
                                    }}
                                    className={`text-left px-6 py-4 text-xs font-mono tracking-widest uppercase transition-colors ${activeCategory === cat
                                            ? "bg-foreground text-background font-bold"
                                            : "hover:bg-foreground/5 text-foreground/70 hover:text-foreground"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-6">
                {!hideThemeToggle && <ThemeToggle />}
                <Link
                    href="/"
                    className="flex items-center justify-center hover:opacity-70 transition-opacity text-foreground"
                    aria-label="Home"
                >
                    <Home className="h-5 w-5" strokeWidth={1.5} />
                </Link>
                <Link
                    href="/cart"
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity text-foreground"
                    aria-label="Cart"
                >
                    <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                    <span className="font-mono text-xs">
                        ({mounted ? totalItems : 0})
                    </span>
                </Link>
            </div>
        </header>
    );
};
