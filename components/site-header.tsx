"use client";

import Link from "next/link";
import { User, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

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

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-background px-6 py-4 md:px-12">
            <div className="flex items-center min-w-[32px]">
                {leftAction || (
                    <button className="text-xl opacity-70 hover:opacity-100 transition-opacity">
                        +
                    </button>
                )}
            </div>

            <nav className="hidden items-center gap-6 md:flex text-xs font-mono tracking-widest text-foreground/70 uppercase">
                <Link href="/" className="hover:text-foreground transition-colors">NEW</Link>
                <Link href="/" className="hover:text-foreground transition-colors">MENS</Link>
                <Link href="/" className="hover:text-foreground transition-colors">WOMENS</Link>
                <Link href="/" className="hover:text-foreground transition-colors">SLIDES</Link>
                <Link href="/" className="hover:text-foreground transition-colors">ACCESSORIES</Link>
            </nav>

            <div className="flex items-center gap-6">
                {!hideThemeToggle && <ThemeToggle />}
                <Link
                    href="/cart"
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity text-foreground"
                    aria-label="Cart"
                >
                    <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                    <span className="font-mono text-xs">(0)</span>
                </Link>
            </div>
        </header>
    );
};
