"use client";

import Link from "next/link";
import { User, ShoppingCart } from "lucide-react";
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

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-background px-6 py-4 md:px-12">
            <div className="flex items-center min-w-[32px]">
                {leftAction || (
                    <button className="text-xl opacity-70 hover:opacity-100 transition-opacity">
                        +
                    </button>
                )}
            </div>

            <nav className="flex flex-1 items-center gap-5 md:gap-8 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] text-xs md:text-sm font-mono tracking-widest text-foreground/70 mx-4 justify-start md:justify-center pb-0">
                <Link href="/" className="font-bold text-foreground transition-colors uppercase">NEW</Link>
                <Link href="/" className="hover:text-foreground transition-colors uppercase">MENS</Link>
                <Link href="/" className="hover:text-foreground transition-colors uppercase">WOMENS</Link>
                <Link href="/" className="hover:text-foreground transition-colors uppercase">SLIDES</Link>
                <Link href="/" className="hover:text-foreground transition-colors uppercase">ACCESSORIES</Link>
            </nav>

            <div className="flex items-center gap-6">
                {!hideThemeToggle && <ThemeToggle />}
                <Link
                    href="/cart"
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity text-foreground"
                    aria-label="Cart"
                >
                    <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                    <span className="font-mono text-xs">({totalItems})</span>
                </Link>
            </div>
        </header>
    );
};
