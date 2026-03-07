"use client";

import { useState } from "react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <main className="flex min-h-screen flex-col items-center pt-40 pb-20 px-6 md:px-12">
        <div className="w-full max-w-sm">
          {/* Simplified Navigation Toggle */}
          <div className="mb-16 flex justify-start space-x-10">
            <button
              onClick={() => setActiveTab("login")}
              className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 relative ${activeTab === "login" ? "text-black font-bold" : "text-black/30 hover:text-black/60"}`}
            >
              Login
              {activeTab === "login" && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-black" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 relative ${activeTab === "register" ? "text-black font-bold" : "text-black/30 hover:text-black/60"}`}
            >
              Register
              {activeTab === "register" && (
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-black" />
              )}
            </button>
          </div>

          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[9px] uppercase tracking-[0.2em] text-black/40"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full border-b border-black/10 bg-transparent px-0 py-2 text-sm font-light tracking-widest outline-none transition-all focus:border-black"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-[9px] uppercase tracking-[0.2em] text-black/40"
                >
                  Password
                </label>
                {activeTab === "login" && (
                  <button type="button" className="text-[8px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <input
                id="password"
                type="password"
                required
                className="w-full border-b border-black/10 bg-transparent px-0 py-2 text-sm font-light tracking-widest outline-none transition-all focus:border-black"
                placeholder="••••••••"
              />
            </div>

            {activeTab === "register" && (
              <div className="space-y-1">
                <label
                  htmlFor="confirm-password"
                  className="block text-[9px] uppercase tracking-[0.2em] text-black/40"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  className="w-full border-b border-black/10 bg-transparent px-0 py-2 text-sm font-light tracking-widest outline-none transition-all focus:border-black"
                  placeholder="••••••••"
                />
              </div>
            )}

            <div className="pt-8">
              <div className="w-full">
                <InteractiveHoverButton
                  text={activeTab === "login" ? "CONTINUE" : "CREATE ACCOUNT"}
                />
              </div>
            </div>
          </form>

          <div className="mt-12 text-center">
            <Link href="/" className="text-[9px] uppercase tracking-[0.2em] text-black/30 hover:text-black transition-colors">
              Back to Store
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

