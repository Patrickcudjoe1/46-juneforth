"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { TransparentHeader } from "@/components/transparent-header";

export default function CheckoutPage() {
    const { items, subtotal, totalItems } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("card");

    return (
        <main className="min-h-screen bg-white text-black font-mono relative">
            <TransparentHeader
                absolute={true}
                forceLightMode={true}
                disableThemeToggle={true}
                hideElements={["cart"]}
            />
            <div className="mx-auto w-full max-w-6xl px-6 pb-10 md:px-10 pt-40">
                <header className="mb-10 flex items-center justify-between">
                    <Link
                        href="/cart"
                        className="text-xs uppercase tracking-widest text-black/70 transition-colors hover:text-black hover:underline underline-offset-4"
                    >
                        ← Back to Cart
                    </Link>
                    <h1 className="text-xl font-bold tracking-widest uppercase">Checkout</h1>
                </header>

                <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
                    {/* Left Column: Form */}
                    <section className="space-y-12">

                        {/* Contact / Shipping */}
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold tracking-widest border-b border-black pb-2 uppercase">Shipping Information</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-black/70">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                                        placeholder="JANE"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-black/70">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                                        placeholder="DOE"
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <label htmlFor="address" className="text-xs uppercase tracking-widest text-black/70">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                                        placeholder="123 BRUTALIST AVE"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-xs uppercase tracking-widest text-black/70">City</label>
                                    <input
                                        id="city"
                                        type="text"
                                        className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                                        placeholder="NEW YORK"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="zip" className="text-xs uppercase tracking-widest text-black/70">Postal Code</label>
                                    <input
                                        id="zip"
                                        type="text"
                                        className="w-full border border-black/20 bg-transparent px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                                        placeholder="10001"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold tracking-widest border-b border-black pb-2 uppercase flex items-center justify-between">
                                Payment Details
                            </h2>

                            {/* Payment Method Toggle */}
                            <div className="flex gap-4 border-b border-black/10 pb-4">
                                <button
                                    onClick={() => setPaymentMethod("card")}
                                    className={`text-xs font-bold tracking-widest uppercase pb-1 transition-colors ${paymentMethod === "card" ? "text-black border-b-2 border-black" : "text-black/50 hover:text-black/80"}`}
                                >
                                    Credit Card
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("momo")}
                                    className={`text-xs font-bold tracking-widest uppercase pb-1 transition-colors ${paymentMethod === "momo" ? "text-black border-b-2 border-black" : "text-black/50 hover:text-black/80"}`}
                                >
                                    Mobile Money
                                </button>
                            </div>

                            {paymentMethod === "card" ? (
                                <div className="grid gap-4 animate-in fade-in duration-300">
                                    <div className="space-y-2">
                                        <label htmlFor="card" className="text-xs uppercase tracking-widest text-black/70">Card Number</label>
                                        <input
                                            id="card"
                                            type="text"
                                            className="w-full border border-black/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-black focus:outline-none"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="exp" className="text-xs uppercase tracking-widest text-black/70">Expiration</label>
                                            <input
                                                id="exp"
                                                type="text"
                                                className="w-full border border-black/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-black focus:outline-none"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="cvc" className="text-xs uppercase tracking-widest text-black/70">Security Code</label>
                                            <input
                                                id="cvc"
                                                type="text"
                                                className="w-full border border-black/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-black focus:outline-none"
                                                placeholder="CVC"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-4 animate-in fade-in duration-300">
                                    <div className="space-y-2">
                                        <label htmlFor="network" className="text-xs uppercase tracking-widest text-black/70">Network Provider</label>
                                        <select
                                            id="network"
                                            defaultValue=""
                                            className="w-full border border-black/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-black focus:outline-none appearance-none"
                                        >
                                            <option value="" disabled>SELECT NETWORK</option>
                                            <option value="mtn">MTN MOBILE MONEY</option>
                                            <option value="vodafone">TELECEL CASH</option>
                                            <option value="airteltigo">AT MONEY</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="momoNumber" className="text-xs uppercase tracking-widest text-black/70">Mobile Money Number</label>
                                        <input
                                            id="momoNumber"
                                            type="tel"
                                            className="w-full border border-black/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-black focus:outline-none"
                                            placeholder="024 000 0000"
                                        />
                                    </div>
                                    <p className="text-xs text-black/50 tracking-wide mt-2">
                                        You will receive a prompt on your phone to authorize this transaction.
                                    </p>
                                </div>
                            )}

                        </div>

                        <button
                            type="button"
                            className="mt-8 flex w-full items-center justify-center border border-black bg-black px-6 py-4 text-sm font-bold tracking-widest text-white uppercase transition hover:bg-transparent hover:text-black"
                        >
                            Confirm Order
                        </button>
                    </section>

                    {/* Right Column: Order Summary */}
                    <aside className="sticky top-28 h-fit border border-black/10 p-8 space-y-8">
                        <h2 className="text-sm font-bold tracking-widest uppercase pb-4 border-b border-black/10">Order Summary</h2>

                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20">
                            {items.map((item) => (
                                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                                    <div className="h-20 w-16 shrink-0 bg-black/5">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <div className="flex justify-between">
                                            <h3 className="text-xs font-bold tracking-widest uppercase">{item.product.name}</h3>
                                            <p className="text-xs">{item.product.price}</p>
                                        </div>
                                        <p className="text-xs text-black/60 uppercase mt-1">Size: {item.size} <span className="mx-1">|</span> Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-black/10 text-xs tracking-widest uppercase">
                            <div className="flex justify-between">
                                <span className="text-black/70">Subtotal</span>
                                <span>GH₵{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black/70">Shipping</span>
                                <span>Calculated at next step</span>
                            </div>
                            <div className="flex justify-between font-bold pt-4 border-t border-black/10">
                                <span>Total</span>
                                <span>GH₵{subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
