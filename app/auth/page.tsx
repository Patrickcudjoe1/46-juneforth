"use client";

import { useState } from "react";
import { TransparentHeader } from "@/components/transparent-header";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      <TransparentHeader absolute={true} />

      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md pt-24">
          <h1 className="mb-8 text-6xl md:text-8xl font-mono font-bold tracking-[0.2em] text-foreground text-center">
            46
          </h1>
          <div className="mb-12 flex justify-center space-x-8 border-b border-foreground/20 pb-4">
            <button
              onClick={() => setActiveTab("login")}
              className={`text-sm tracking-widest uppercase transition-colors ${activeTab === "login" ? "font-bold text-foreground" : "text-foreground/40 hover:text-foreground/80"}`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`text-sm tracking-widest uppercase transition-colors ${activeTab === "register" ? "font-bold text-foreground" : "text-foreground/40 hover:text-foreground/80"}`}
            >
              Register
            </button>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground/80"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-lg font-light tracking-wider outline-none transition-colors placeholder:text-foreground/20 focus:border-foreground focus:ring-0"
                placeholder="EMAIL ADDRESS"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground/80"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-lg font-light tracking-wider outline-none transition-colors placeholder:text-foreground/20 focus:border-foreground focus:ring-0"
                placeholder="PASSWORD"
              />
            </div>

            {activeTab === "register" && (
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground/80"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-lg font-light tracking-wider outline-none transition-colors placeholder:text-foreground/20 focus:border-foreground focus:ring-0"
                  placeholder="CONFIRM PASSWORD"
                />
              </div>
            )}

            <div className="pt-6 flex justify-between items-center">
              {activeTab === "login" ? (
                <button type="button" className="text-xs font-mono uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors">
                  Forgot Password?
                </button>
              ) : (
                <div /> // Spacer
              )}

              <div className="w-40">
                <InteractiveHoverButton
                  text={activeTab === "login" ? "ENTER" : "CREATE"}
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

