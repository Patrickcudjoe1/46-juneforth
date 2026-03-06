"use client";

import { useState } from "react";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

import { useProducts, Product } from '@/components/product-provider';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ShopSection() {
    const { addItem, totalItems } = useCart();
    const { products, isLoading } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showProductInfo, setShowProductInfo] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Column Toggling State
    const [mobileColumns, setMobileColumns] = useState(3); // 3, 2, 1
    const [isDesktopLarge, setIsDesktopLarge] = useState(false); // 6 or 3 columns

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setCurrentImageIndex(0);
        setShowProductInfo(false);
        setSelectedSize(null);
    };

    const handleClose = () => {
        setSelectedProduct(null);
        setCurrentImageIndex(0);
        setShowProductInfo(false);
        setSelectedSize(null);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            const hasSizes = selectedProduct.sizes && selectedProduct.sizes.length > 0;
            if (hasSizes && !selectedSize) return;

            addItem(selectedProduct, selectedSize || "OS");
            handleClose();
        }
    };

    const toggleColumns = () => {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop) {
            setIsDesktopLarge(!isDesktopLarge);
        } else {
            setMobileColumns((prev) => (prev === 1 ? 3 : prev - 1));
        }
    };

    const getToggleIcon = () => {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
        if (isDesktop) {
            return isDesktopLarge ? <span className="text-2xl font-bold">&lt;</span> : <span className="text-2xl font-bold">+</span>;
        } else {
            return mobileColumns === 1 ? <span className="text-2xl font-bold">&lt;</span> : <span className="text-2xl font-bold">+</span>;
        }
    };

    if (selectedProduct) {
        return (
            <div className="min-h-screen bg-white text-black font-sans transition-colors duration-500">
                {/* Back Button */}
                <button
                    onClick={handleClose}
                    className="fixed top-6 left-6 z-[120] p-2 rounded-full bg-background/50 backdrop-blur-md shadow-sm border border-border/50 hover:bg-background transition-colors text-foreground"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Product Detail View */}
                <div className="flex flex-col items-center justify-center min-h-screen px-6 py-28">
                    {/* Image Carousel */}
                    <div className="relative w-full max-w-2xl mb-8 group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
                            <img
                                src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Navigation Arrows */}
                        {selectedProduct.images && selectedProduct.images.length > 1 && (
                            <>
                                <button
                                    onClick={() => {
                                        if (selectedProduct?.images) {
                                            setCurrentImageIndex((prev) =>
                                                prev === 0 ? selectedProduct.images!.length - 1 : prev - 1
                                            );
                                        }
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 border border-border hover:bg-background transition shadow-sm text-foreground opacity-0 group-hover:opacity-100"
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={() => {
                                        if (selectedProduct?.images) {
                                            setCurrentImageIndex((prev) =>
                                                prev === selectedProduct.images!.length - 1 ? 0 : prev + 1
                                            );
                                        }
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 border border-border hover:bg-background transition shadow-sm text-foreground opacity-0 group-hover:opacity-100"
                                >
                                    &gt;
                                </button>
                            </>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="text-center space-y-4 max-w-md w-full">
                        <h1 className="text-sm font-bold tracking-[0.2em] uppercase">{selectedProduct.name}</h1>
                        {/* Material */}
                        {selectedProduct.material && (
                            <p className="text-[10px] uppercase tracking-wider text-black/50">{selectedProduct.material}</p>
                        )}

                        {!showProductInfo ? (
                            <button
                                onClick={() => setShowProductInfo(true)}
                                className="text-2xl opacity-70 hover:opacity-100 transition-opacity mt-6"
                            >
                                +
                            </button>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Description */}
                                {selectedProduct.description && (
                                    <p className="text-[11px] text-black/70 mt-4 leading-relaxed tracking-wider uppercase">{selectedProduct.description}</p>
                                )}

                                {/* Sizes */}
                                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                                    <div className="mt-6 pt-4">
                                        <div className="flex flex-wrap justify-center gap-4">
                                            {selectedProduct.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`text-[10px] tracking-widest uppercase transition-colors ${selectedSize === size
                                                        ? "font-bold underline underline-offset-4"
                                                        : "text-black/40 hover:text-black"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleAddToCart}
                                    disabled={!!(selectedProduct.sizes && selectedProduct.sizes.length > 0) && !selectedSize}
                                    className="mt-8 relative inline-flex h-12 w-full items-center justify-center border border-black bg-white text-black text-[11px] font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group">
                                    <span className="relative z-10">
                                        ADD TO BAG
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            <style dangerouslySetInnerHTML={{
                __html: `
                header:not(.shop-header) { display: none !important; }
            ` }} />
            {/* Specialized Shop Header */}
            <div className="fixed top-0 left-0 right-0 z-[110] bg-white transition-all duration-300 border-b border-black/5 shop-header">
                <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
                    {/* Left: Column Toggle */}
                    <div className="w-1/4">
                        <button
                            onClick={toggleColumns}
                            className="hover:opacity-60 transition-opacity font-light text-2xl leading-none"
                        >
                            {getToggleIcon()}
                        </button>
                    </div>

                    {/* Right: Cart */}
                    <div className="w-1/4 flex justify-end">
                        <Link href="/cart" className="hover:opacity-60 transition-opacity relative">
                            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-[80px] pb-24">
                {/* Product Grid */}
                <div
                    className={cn(
                        "grid gap-x-2 gap-y-12 px-2 md:px-6 transition-all duration-500 ease-in-out",
                        // Mobile/Tablet columns
                        mobileColumns === 1 ? "grid-cols-1" :
                            mobileColumns === 2 ? "grid-cols-2" : "grid-cols-3",
                        // Desktop columns override
                        isDesktopLarge ? "lg:grid-cols-3" : "lg:grid-cols-6"
                    )}
                >
                    <AnimatePresence mode="popLayout">
                        {products.map((product) => (
                            <motion.button
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="group flex flex-col items-center gap-3 w-full"
                            >
                                <motion.div
                                    layout
                                    className="relative aspect-square w-full bg-white flex items-center justify-center p-2"
                                >
                                    <motion.img
                                        layout
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-auto object-contain transition-transform duration-700 ease-out grayscale-[10%]"
                                    />
                                </motion.div>

                                <motion.div layout className="flex flex-col items-center">
                                    <p className="text-[9px] md:text-[10px] tracking-[0.2em] text-center text-black font-bold uppercase transition-opacity group-hover:opacity-60">{product.name}</p>
                                </motion.div>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div >
    );
}
