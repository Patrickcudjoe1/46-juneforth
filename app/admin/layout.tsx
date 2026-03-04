"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Tag, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Tag },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen w-full bg-[#fcfcfc] text-[#111111] dark:bg-[#111111] dark:text-[#fcfcfc] font-sans">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[#111]/10 dark:border-[#fcfcfc]/10 bg-background sm:flex">
                <div className="flex h-16 shrink-0 items-center px-6 border-b border-[#111]/10 dark:border-[#fcfcfc]/10">
                    <Link href="/admin" className="font-mono text-xl font-bold tracking-widest">
                        46 ADMIN
                    </Link>
                </div>
                <div className="flex flex-col flex-1 gap-1 px-4 py-8 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${isActive
                                        ? "bg-[#111] text-[#fcfcfc] dark:bg-[#fcfcfc] dark:text-[#111]"
                                        : "text-[#111]/70 hover:bg-[#111]/5 hover:text-[#111] dark:text-[#fcfcfc]/70 dark:hover:bg-[#fcfcfc]/10 dark:hover:text-[#fcfcfc]"
                                    }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <div className="p-4 border-t border-[#111]/10 dark:border-[#fcfcfc]/10">
                    <Link
                        href="/"
                        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-[#111]/70 hover:bg-[#111]/5 hover:text-[#111] dark:text-[#fcfcfc]/70 dark:hover:bg-[#fcfcfc]/10 dark:hover:text-[#fcfcfc] transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Exit to Store
                    </Link>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex w-full flex-col sm:pl-64">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#111]/10 dark:border-[#fcfcfc]/10 bg-background px-4 sm:hidden">
                    <Link href="/admin" className="font-mono text-lg font-bold tracking-widest">
                        46 ADMIN
                    </Link>
                </header>

                <main className="flex-1 p-6 md:p-8 lg:p-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
