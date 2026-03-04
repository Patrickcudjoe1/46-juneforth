"use client";

import { useProducts } from "@/components/product-provider";
import { Package, ShoppingBag, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const { products } = useProducts();
    const totalProducts = products.length;

    // Mock metrics for aesthetic
    const metrics = [
        {
            title: "Total Products",
            value: totalProducts.toString(),
            icon: Package,
            trend: "+2 this week",
        },
        {
            title: "Active Orders",
            value: "14",
            icon: ShoppingBag,
            trend: "+3 today",
        },
        {
            title: "Total Revenue",
            value: "GH₵ 12,450",
            icon: TrendingUp,
            trend: "+15% from last month",
        },
    ];

    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-mono font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-sm font-medium opacity-60">
                    Welcome back. Here's what's happening with your store today.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                {metrics.map((metric) => (
                    <div
                        key={metric.title}
                        className="flex flex-col gap-4 p-6 rounded-xl border border-foreground/10 bg-background shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold tracking-wider uppercase opacity-70">
                                {metric.title}
                            </span>
                            <metric.icon className="h-5 w-5 opacity-60" />
                        </div>
                        <div>
                            <span className="text-3xl font-mono font-bold">{metric.value}</span>
                            <p className="mt-1 text-xs opacity-60">{metric.trend}</p>
                        </div>
                    </div>
                ))}
            </div>

            <section className="mt-8 flex flex-col gap-6">
                <h2 className="text-xl font-mono font-bold tracking-tight">Recent Additions</h2>
                <div className="rounded-xl border border-foreground/10 bg-background shadow-sm overflow-hidden">
                    <div className="divide-y divide-foreground/10">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-foreground/5 transition-colors">
                                <div className="h-12 w-12 rounded-md bg-foreground/5 overflow-hidden shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen dark:invert"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold font-mono truncate">{product.name}</p>
                                    <p className="text-xs opacity-70 truncate">{product.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold font-mono">{product.price}</p>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && (
                            <div className="p-8 text-center text-sm opacity-60">
                                No products found. Head to the Products tab to add some!
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
