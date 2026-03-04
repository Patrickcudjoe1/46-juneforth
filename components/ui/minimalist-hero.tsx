"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Moon, ShoppingCart, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: string;
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

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
    "rounded-full border border-foreground/30 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-foreground transition hover:bg-foreground hover:text-background sm:text-sm md:tracking-widest";

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

export const MinimalistHero = ({
  logoText,
  navLinks,
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
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider"
        >
          {logoText}
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 bg-background/80 text-foreground shadow-sm transition hover:bg-foreground hover:text-background"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
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

      {mobileOpen && (
        <div className="relative z-30 mt-4 w-full max-w-7xl rounded-2xl border border-foreground/10 bg-background/95 p-4 shadow-sm md:hidden">
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
              Cart
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
        </div>
      )}

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
          className="z-20 order-4 mt-12 flex w-full flex-col items-center gap-4 md:hidden"
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

