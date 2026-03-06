"use client";

import { usePathname } from "next/navigation";
import { JuneforthHeader } from "./juneforth-header";

export function HeaderWrapper() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return null;

    return <JuneforthHeader />;
}
