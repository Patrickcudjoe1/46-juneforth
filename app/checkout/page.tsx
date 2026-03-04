"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function CheckoutPage() {
    const { items, subtotal, totalItems } = useCart();

    return (
        <main className="min-h-screen bg-background text-foreground font-mono">
            <div className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 mt-16">
                <header className="mb-10 flex items-center justify-between">
                    <Link
                        href="/cart"
                        className="text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground hover:underline underline-offset-4"
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
                            <h2 className="text-sm font-bold tracking-widest border-b border-foreground pb-2 uppercase">Shipping Information</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-foreground/70">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm transition focus:border-foreground focus:outline-none"
                                        placeholder="JANE"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-foreground/70">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm transition focus:border-foreground focus:outline-none"
                                        placeholder="DOE"
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <label htmlFor="address" className="text-xs uppercase tracking-widest text-foreground/70">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm transition focus:border-foreground focus:outline-none"
                                        placeholder="123 BRUTALIST AVE"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-xs uppercase tracking-widest text-foreground/70">City</label>
                                    <input
                                        id="city"
                                        type="text"
                                        className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm transition focus:border-foreground focus:outline-none"
                                        placeholder="NEW YORK"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="zip" className="text-xs uppercase tracking-widest text-foreground/70">Postal Code</label>
                                    <input
                                        id="zip"
                                        type="text"
                                        className="w-full border border-foreground/20 bg-transparent px-4 py-3 text-sm transition focus:border-foreground focus:outline-none"
                                        placeholder="10001"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold tracking-widest border-b border-foreground pb-2 uppercase">Payment Details</h2>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="card" className="text-xs uppercase tracking-widest text-foreground/70">Card Number</label>
                                    <input
                                        id="card"
                                        type="text"
                                        className="w-full border border-foreground/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-foreground focus:outline-none"
                                        placeholder="0000 0000 0000 0000"
                                    />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="exp" className="text-xs uppercase tracking-widest text-foreground/70">Expiration</label>
                                        <input
                                            id="exp"
                                            type="text"
                                            className="w-full border border-foreground/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-foreground focus:outline-none"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="cvc" className="text-xs uppercase tracking-widest text-foreground/70">Security Code</label>
                                        <input
                                            id="cvc"
                                            type="text"
                                            className="w-full border border-foreground/20 bg-transparent px-4 py-3 font-mono text-sm tracking-widest transition focus:border-foreground focus:outline-none"
                                            placeholder="CVC"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-8 flex w-full items-center justify-center border border-foreground bg-foreground px-6 py-4 text-sm font-bold tracking-widest text-background uppercase transition hover:bg-transparent hover:text-foreground"
                        >
                            Confirm Order
                        </button>
                    </section>

                    {/* Right Column: Order Summary */}
                    <aside className="sticky top-28 h-fit border border-foreground/10 p-8 space-y-8">
                        <h2 className="text-sm font-bold tracking-widest uppercase pb-4 border-b border-foreground/10">Order Summary</h2>

                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/20">
                            {items.map((item) => (
                                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                                    <div className="h-20 w-16 shrink-0 bg-foreground/5 dark:bg-foreground/10">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-normal"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <div className="flex justify-between">
                                            <h3 className="text-xs font-bold tracking-widest uppercase">{item.product.name}</h3>
                                            <p className="text-xs">{item.product.price}</p>
                                        </div>
                                        <p className="text-xs text-foreground/60 uppercase mt-1">Size: {item.size} <span className="mx-1">|</span> Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-foreground/10 text-xs tracking-widest uppercase">
                            <div className="flex justify-between">
                                <span className="text-foreground/70">Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground/70">Shipping</span>
                                <span>Calculated at next step</span>
                            </div>
                            <div className="flex justify-between font-bold pt-4 border-t border-foreground/10">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
