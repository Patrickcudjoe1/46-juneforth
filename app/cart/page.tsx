import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const isEmpty = true;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Cart
            </h1>
            <p className="mt-1 text-sm text-foreground/70">
              Review your items before checkout.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-foreground/30 px-4 py-2 text-sm font-medium tracking-[0.18em] text-foreground transition hover:bg-foreground hover:text-background"
          >
            Continue
          </Link>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_360px]">
          <section className="min-w-0">
            {isEmpty ? (
              <div className="rounded-2xl border border-foreground/10 bg-background/80 p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5">
                    <ShoppingCart className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Your cart is empty
                    </h2>
                    <p className="mt-1 text-sm text-foreground/70">
                      Add a few pieces to get started.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
                  >
                    Back home
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center rounded-full border border-foreground/30 px-5 py-2 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-background"
                  >
                    shop
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-foreground/10 bg-background/80 p-8 shadow-sm">
                <p className="text-sm text-foreground/70">
                  Items rendering goes here.
                </p>
              </div>
            )}
          </section>

          <aside className="h-fit rounded-2xl border border-foreground/10 bg-background/80 p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight">
              Order summary
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-foreground/70">Subtotal</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/70">Shipping</span>
                <span className="font-medium">—</span>
              </div>
              <div className="h-px w-full bg-foreground/10" />
              <div className="flex items-center justify-between">
                <span className="text-foreground/70">Total</span>
                <span className="text-base font-semibold">$0.00</span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-6 w-full rounded-full bg-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground/60"
            >
              Checkout
            </button>
            <p className="mt-3 text-xs text-foreground/60">
              Checkout will unlock once items are added.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

