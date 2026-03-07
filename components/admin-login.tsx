"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminLogin = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2500); // 2.5s splash screen

        return () => clearTimeout(timer);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login - in a real app, this would involve API calls
        setTimeout(() => {
            setIsLoading(false);
            router.push("/admin");
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-[#ededed] font-sans selection:bg-white selection:text-black">
            <AnimatePresence mode="wait">
                {showSplash ? (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1 }}
                            className="relative"
                        >
                            <img
                                src="/images/LOGO.jpg"
                                alt="JUNEFORTH"
                                className="h-48 lg:h-72 w-auto object-contain"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
                                className="absolute -bottom-4 left-0 h-[1px] bg-white/30"
                            />
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="login-form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full max-w-md px-8 py-12 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden relative group"
                    >
                        {/* Subtle Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/5 blur-[80px] rounded-full" />

                        <div className="relative z-10">
                            <div className="mb-10 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <img
                                        src="/images/LOGO.jpg"
                                        alt="JUNEFORTH"
                                        className="h-32 mx-auto mb-12 opacity-90 object-contain"
                                    />
                                </motion.div>
                                <h1 className="text-2xl font-light tracking-[0.3em] uppercase mb-2">Admin Portal</h1>
                                <p className="text-xs text-white/40 tracking-[0.1em] uppercase">Enter your credentials to manage SPECTRA</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Username</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                                        <input
                                            type="text"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-4 pl-12 pr-4 text-sm outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                                            placeholder="admin@spectra.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-white/60 transition-colors" />
                                        <input
                                            type="password"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-4 pl-12 pr-4 text-sm outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black py-4 rounded-lg text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[#f0f0f0] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
                                >
                                    {isLoading ? (
                                        <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
