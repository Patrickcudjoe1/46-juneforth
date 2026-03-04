import { ShopSection } from "@/components/shop-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop | 46.",
    description: "Browse our collections and latest arrivals.",
};

export default function ShopPage() {
    return (
        <main>
            <ShopSection />
        </main>
    );
}
