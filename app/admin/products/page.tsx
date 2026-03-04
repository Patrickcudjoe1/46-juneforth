"use client";

import { useProducts, Product } from "@/components/product-provider";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminProducts() {
    const { products, deleteProduct } = useProducts();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            deleteProduct(id);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-mono font-bold tracking-tight">Products Catalog</h1>
                    <p className="text-sm font-medium opacity-60 mt-2">
                        Manage your store's inventory, pricing, and details.
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md text-sm font-bold tracking-widest font-mono uppercase hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>
            </header>

            <div className="flex flex-col gap-6">
                <input
                    type="text"
                    placeholder="Search products by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md bg-transparent border-b border-foreground/20 px-0 py-3 text-sm focus:border-foreground focus:outline-none transition-colors placeholder:text-foreground/40"
                />

                <div className="rounded-xl border border-foreground/10 bg-background shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-foreground/10 text-xs font-semibold tracking-wider text-foreground/60 uppercase bg-foreground/5">
                                <th className="p-4 font-mono font-normal">Image</th>
                                <th className="p-4 font-mono font-normal">Details</th>
                                <th className="p-4 font-mono font-normal">Price</th>
                                <th className="p-4 font-mono font-normal">Sizes</th>
                                <th className="p-4 font-mono font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/10">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-foreground/5 transition-colors">
                                    <td className="p-4">
                                        <div className="h-16 w-16 min-w-[64px] rounded-md bg-foreground/5 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-screen dark:invert"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-mono font-bold text-sm">{product.name}</span>
                                            <span className="text-xs opacity-70 line-clamp-1 max-w-[200px]">{product.description}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-mono font-bold text-sm tracking-widest">{product.price}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {product.sizes?.map((size) => (
                                                <span key={size} className="px-2 py-0.5 text-[10px] font-mono border border-foreground/20 rounded-full">
                                                    {size}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="p-2 opacity-60 hover:opacity-100 hover:bg-foreground/10 rounded-md transition-all"
                                                title="Edit functionality coming soon"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="p-2 opacity-60 hover:opacity-100 hover:bg-red-500 hover:text-white rounded-md transition-all"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center gap-4">
                            <p className="text-sm opacity-60">No products found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
