"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ShoppingCart, Sun, User } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

const NavLink = ({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    const className =
        "rounded-full border border-foreground/30 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-foreground transition hover:bg-foreground hover:text-background sm:text-sm md:tracking-widest uppercase";

    if (href.startsWith("http")) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className} onClick={onClick}>
            {children}
        </Link>
    );
};

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
    navLinks?: { label: string; href: string }[];
    className?: string;
    absolute?: boolean;
}

export const TransparentHeader = ({
    logoText = "46.",
    navLinks = [
        { label: "SHOP", href: "/shop" },
        { label: "LOOKBOOK", href: "/lookbook" },
    ],
    className,
    absolute = true,
}: TransparentHeaderProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={cn("w-full z-50 flex flex-col items-center", absolute ? "absolute top-8 left-0 right-0 px-8 md:px-12" : "px-6 py-8 md:px-12", className)}>
            <header className="flex w-full max-w-7xl items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="text-xl font-bold tracking-wider text-foreground">
                        {logoText}
                    </Link>
                </motion.div>

                <div className="hidden items-center gap-4 md:flex">
                    <nav className="flex items-center gap-3">
                        {navLinks.map((link) => (
                            <NavLink key={link.label} href={link.href}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                    <Link
                        href="/cart"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 bg-background/80 text-foreground shadow-sm transition hover:bg-foreground hover:text-background relative"
                        aria-label="Cart"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {mounted && totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="/auth"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 bg-background/80 text-foreground shadow-sm transition hover:bg-foreground hover:text-background"
                        aria-label="Account"
                    >
                        <User className="h-4 w-4" />
                    </Link>
                    <ThemeToggle />
                </div>

                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col space-y-1.5 md:hidden"
                    aria-label="Open menu"
                    onClick={() => setMobileOpen((open) => !open)}
                >
                    <span className="block h-0.5 w-6 bg-foreground" />
                    <span className="block h-0.5 w-6 bg-foreground" />
                    <span className="block h-0.5 w-5 bg-foreground" />
                </motion.button>
            </header>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-30 mt-4 w-full max-w-7xl rounded-2xl border border-foreground/10 bg-background/95 p-4 shadow-sm md:hidden"
                    >
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-foreground/80">
                                Cart ({mounted ? totalItems : 0})
                            </span>
                            <Link
                                href="/cart"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 bg-background/80 text-foreground shadow-sm transition hover:bg-foreground hover:text-background"
                                aria-label="Cart"
                                onClick={() => setMobileOpen(false)}
                            >
                                <ShoppingCart className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-foreground/80">
                                Account
                            </span>
                            <Link
                                href="/auth"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 bg-background/80 text-foreground shadow-sm transition hover:bg-foreground hover:text-background"
                                aria-label="Account"
                                onClick={() => setMobileOpen(false)}
                            >
                                <User className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-foreground/80">
                                Theme
                            </span>
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
