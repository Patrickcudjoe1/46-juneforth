"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ShoppingCart, Sun, User, Search, X, Home } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";



const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const initial = stored ?? (prefersDark ? "dark" : "light");
        setTheme(initial);
        document.documentElement.setAttribute("data-theme", initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);

    const toggle = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
        window.localStorage.setItem("theme", next);
    };

    const Icon = theme === "light" ? Moon : Sun;

    return (
        <button
            type="button"
            onClick={toggle}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/60 text-foreground shadow-sm transition hover:bg-foreground hover:text-background"
            aria-label="Toggle theme"
        >
            <Icon className="h-4 w-4" />
        </button>
    );
};

export interface TransparentHeaderProps {
    logoText?: string;
    className?: string;
    absolute?: boolean;
    hideThemeToggle?: boolean;
    forceLightMode?: boolean;
    hideElements?: ("home" | "search" | "cart" | "auth")[];
}

export const TransparentHeader = ({
    logoText = "46",
    className,
    absolute = true,
    hideThemeToggle = false,
    forceLightMode = false,
    hideElements = [],
}: TransparentHeaderProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={cn("w-full z-[100] flex flex-col items-center", absolute ? "absolute top-8 left-0 right-0 px-8 md:px-12" : "px-6 py-8 md:px-12", forceLightMode ? "text-black [&_*]:border-black" : "text-foreground", className)}>
            <header className="flex w-full max-w-7xl items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="flex items-center">
                        <img
                            src="/images/LOGO.jpg"
                            alt={logoText || "46"}
                            className={cn("h-6 md:h-8 object-contain dark:invert", forceLightMode && "invert-0 dark:invert-0")}
                        />
                    </Link>
                </motion.div>

                <div className="hidden items-center gap-4 md:flex">
                    {!hideElements.includes("home") && (
                        <nav className="flex items-center gap-3">
                            <Link
                                href="/"
                                className={cn(
                                    "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition",
                                    forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                                )}
                                aria-label="Home"
                            >
                                <Home className="h-4 w-4" />
                            </Link>
                        </nav>
                    )}

                    {/* Desktop Search Button */}
                    {!hideElements.includes("search") && (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className={cn(
                                "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition relative",
                                forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                            )}
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                    )}

                    {!hideElements.includes("cart") && (
                        <Link
                            href="/cart"
                            className={cn(
                                "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition relative",
                                forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                            )}
                            aria-label="Cart"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {mounted && totalItems > 0 && (
                                <span className={cn(
                                    "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold",
                                    forceLightMode ? "bg-black text-white" : "bg-foreground text-background"
                                )}>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {!hideElements.includes("auth") && (
                        <Link
                            href="/auth"
                            className={cn(
                                "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition",
                                forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                            )}
                            aria-label="Account"
                        >
                            <User className="h-4 w-4" />
                        </Link>
                    )}

                    {!hideThemeToggle && <ThemeToggle />}
                </div>

                <div className="flex items-center gap-3 md:hidden">
                    {/* Mobile Search Button */}
                    {!hideElements.includes("search") && (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className={cn(
                                "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition relative",
                                forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                            )}
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                    )}

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col space-y-1.5"
                        aria-label="Open menu"
                        onClick={() => setMobileOpen((open) => !open)}
                    >
                        <span className={cn("block h-0.5 w-6", forceLightMode ? "bg-black" : "bg-foreground")} />
                        <span className={cn("block h-0.5 w-6", forceLightMode ? "bg-black" : "bg-foreground")} />
                        <span className={cn("block h-0.5 w-5", forceLightMode ? "bg-black" : "bg-foreground")} />
                    </motion.button>
                </div>
            </header>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-background/95 backdrop-blur-md px-6 py-24 md:px-12"
                    >
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-8 right-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/30 bg-background hover:bg-foreground hover:text-background transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="w-full max-w-4xl mx-auto space-y-8">
                            <h2 className="text-sm font-bold tracking-widest uppercase text-foreground/50">
                                Search 46
                            </h2>
                            <form className="relative" onSubmit={(e) => { e.preventDefault(); /* Implement actual search redirect or filter logic here */ setSearchOpen(false); }}>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="COLLECTIONS, ITEMS, STYLES..."
                                    className="w-full bg-transparent border-b-2 border-foreground/30 pb-4 text-3xl md:text-5xl lg:text-7xl font-light tracking-widest text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground transition-colors"
                                />
                                <button type="submit" className="absolute right-0 bottom-4 text-foreground hover:text-foreground/70 transition-colors">
                                    <Search className="h-8 w-8 md:h-12 md:w-12" />
                                </button>
                            </form>
                            <div className="pt-8 flex flex-col gap-4">
                                <p className="text-xs font-bold tracking-widest uppercase text-foreground/50">Popular</p>
                                <div className="flex flex-wrap gap-4">
                                    {["HOODIES", "TS-01", "ACCESSORIES", "NEW IN"].map((term) => (
                                        <button key={term} className="text-sm font-light tracking-widest uppercase border border-foreground/20 rounded-full px-4 py-2 hover:bg-foreground hover:text-background transition-colors">
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn("relative z-30 mt-4 w-full max-w-7xl rounded-2xl border p-4 shadow-sm md:hidden", forceLightMode ? "bg-white/95 border-black/10 text-black" : "bg-background/95 border-foreground/10")}
                    >
                        {!hideElements.includes("home") && (
                            <nav className="flex items-center justify-between">
                                <span className={cn("text-xs uppercase tracking-[0.2em]", forceLightMode ? "text-black/80" : "text-foreground/80")}>
                                    HOME
                                </span>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/"
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition",
                                            forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                                        )}
                                        aria-label="Home"
                                    >
                                        <Home className="h-4 w-4" />
                                    </Link>
                                </div>
                            </nav>
                        )}
                        {!hideElements.includes("cart") && (
                            <div className="mt-4 flex items-center justify-between">
                                <span className={cn("text-xs uppercase tracking-[0.2em]", forceLightMode ? "text-black/80" : "text-foreground/80")}>
                                    Cart ({mounted ? totalItems : 0})
                                </span>
                                <Link
                                    href="/cart"
                                    className={cn(
                                        "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition",
                                        forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                                    )}
                                    aria-label="Cart"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                </Link>
                            </div>
                        )}
                        {!hideElements.includes("auth") && (
                            <div className="mt-4 flex items-center justify-between">
                                <span className={cn("text-xs uppercase tracking-[0.2em]", forceLightMode ? "text-black/80" : "text-foreground/80")}>
                                    Account
                                </span>
                                <Link
                                    href="/auth"
                                    className={cn(
                                        "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition",
                                        forceLightMode ? "border-black/30 text-black hover:bg-black hover:text-white" : "border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                                    )}
                                    aria-label="Account"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <User className="h-4 w-4" />
                                </Link>
                            </div>
                        )}
                        {!hideThemeToggle && (
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs uppercase tracking-[0.2em] text-foreground/80">
                                    Theme
                                </span>
                                <ThemeToggle />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
