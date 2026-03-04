import Link from "next/link";

export function EssentialsSection() {
    return (
        <section className="w-full bg-white text-black">
            <div className="w-[95%] lg:w-[90%] mx-auto py-16 md:py-24">
                <h2 className="text-center text-sm md:text-base tracking-[0.25em] uppercase mb-12 md:mb-16 font-serif">
                    ESSENTIALS SPRING
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {/* Left Column Group */}
                    <div className="flex flex-col">
                        {/* Left Image Column */}
                        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-black/5">
                            <img
                                src="/images/essentials_left.png"
                                alt="Male model in brown oversized zip-up jacket over grey hoodie with suede duffel bag"
                                className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
                            />
                        </div>
                        {/* Left CTA */}
                        <div className="mt-6 flex justify-center">
                            <Link
                                href="/shop"
                                className="w-full max-w-[280px] border border-black px-6 py-4 text-center text-xs font-mono tracking-[0.2em] uppercase transition-colors hover:bg-black hover:text-white"
                            >
                                SHOP MENS
                            </Link>
                        </div>
                    </div>
                    {/* Right Column Group */}
                    <div className="flex flex-col">
                        {/* Right Image Column */}
                        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-black/5">
                            <img
                                src="/images/essentials_right.png"
                                alt="Female model in matching oversized brown track jacket and wide-leg sweatpants holding black leather clutch"
                                className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
                            />
                        </div>
                        {/* Right CTA */}
                        <div className="mt-6 flex justify-center">
                            <Link
                                href="/shop"
                                className="w-full max-w-[280px] border border-black px-6 py-4 text-center text-xs font-mono tracking-[0.2em] uppercase transition-colors hover:bg-black hover:text-white"
                            >
                                SHOP WOMENS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
