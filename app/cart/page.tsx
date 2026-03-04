"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { TransparentHeader } from "@/components/transparent-header";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const isEmpty = items.length === 0;

  return (
    <main className="min-h-screen bg-white text-black relative">
      <TransparentHeader
        absolute={true}
        hideThemeToggle={true}
        forceLightMode={true}
        hideElements={["cart"]}
      />
      <div className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10 mt-16 pt-24">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Cart
            </h1>
            <p className="mt-1 text-sm text-black/70">
              Review your items before checkout.
            </p>
          </div>
          <Link
            href="/shop"
            className="rounded-full border border-black/30 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-medium tracking-[0.1em] md:tracking-[0.18em] text-black transition hover:bg-black hover:text-white text-center uppercase"
          >
            Continue Shopping
          </Link>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_360px]">
          <section className="min-w-0">
            {isEmpty ? (
              <div className="rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/5">
                    <ShoppingCart className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Your cart is empty
                    </h2>
                    <p className="mt-1 text-sm text-black/70">
                      Add a few pieces to get started.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-black/90 uppercase tracking-widest"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-6 rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm">
                    {/* Product Image */}
                    <div className="h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-black/5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover mix-blend-multiply"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="font-mono text-sm tracking-widest font-bold uppercase">{item.product.name}</h3>
                          <p className="mt-1 text-xs text-black/70 uppercase">Size: {item.size}</p>
                          {item.product.material && (
                            <p className="mt-1 text-xs text-black/50">{item.product.material}</p>
                          )}
                        </div>
                        <p className="text-sm font-medium">{item.product.price}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 border border-black/20 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="px-2 text-black/70 hover:text-black transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="px-2 text-black/70 hover:text-black transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-xs text-black/50 hover:text-black underline underline-offset-4 transition-colors uppercase tracking-widest"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm sticky top-28">
            <h2 className="text-lg font-semibold tracking-tight">
              Order summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-black/70">Subtotal ({totalItems} items)</span>
                <span className="font-medium">GH₵{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black/70">Shipping</span>
                <span className="font-medium">{subtotal > 0 ? "Calculated at checkout" : "—"}</span>
              </div>
              <div className="h-px w-full bg-black/10" />
              <div className="flex items-center justify-between">
                <span className="text-black/70">Total</span>
                <span className="text-base font-semibold">GH₵{subtotal.toFixed(2)}</span>
              </div>
            </div>

            {isEmpty ? (
              <button
                type="button"
                disabled
                className="mt-6 w-full rounded-full bg-black px-5 py-3 text-sm font-medium tracking-widest text-white uppercase flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-black/90"
              >
                Checkout
              </button>
            ) : (
              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium tracking-widest text-white uppercase transition hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Checkout
              </Link>
            )}
            <p className="mt-3 text-xs text-black/60 text-center">
              {isEmpty ? "Checkout will unlock once items are added." : "Taxes computed at checkout."}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

