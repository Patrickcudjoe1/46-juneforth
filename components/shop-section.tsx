"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { ArrowLeft } from "lucide-react";

export interface Product {
    id: string;
    name: string;
    image: string;
    images?: string[];
    price?: string;
    description?: string;
    sizes?: string[];
    material?: string;
}

const products: Product[] = [
    {
        id: "1",
        name: "PK-01",
        price: "$100",
        description: "Insulated puffer jacket with fur-trimmed hood",
        material: "100% Nylon, Down Fill",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        image: "/images/look_2_new_1772586200765.png",
        images: [
            "/images/look_2_new_1772586200765.png",
        ],
    },
    {
        id: "2",
        name: "JC-10",
        price: "$120",
        description: "Classic bomber jacket with ribbed details",
        material: "100% Polyester",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_1_new_1772586185397.png",
        images: [
            "/images/look_1_new_1772586185397.png",
        ],
    },
    {
        id: "3",
        name: "JC-11",
        price: "$130",
        description: "Oversized utility jacket",
        material: "Cotton Blend",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_3_new_1772586220448.png",
        images: [
            "/images/look_3_new_1772586220448.png",
        ],
    },
    {
        id: "4",
        name: "SL-03",
        price: "$80",
        image: "/images/look_4_new_1772586238413.png",
        images: [
            "/images/look_4_new_1772586238413.png",
        ],
    },
    {
        id: "5",
        name: "BL-01",
        price: "$150",
        image: "/images/look_5_1772585794296.png",
        images: [
            "/images/look_5_1772585794296.png",
        ],
    },
    {
        id: "6",
        name: "HD-01",
        price: "$105",
        image: "/images/look_6_new_1772586258677.png",
        images: [
            "/images/look_6_new_1772586258677.png",
        ],
    },
    {
        id: "7",
        name: "SN-01",
        price: "$110",
        image: "/images/look_7_new_1772586448482.png",
        images: [
            "/images/look_7_new_1772586448482.png",
        ],
    },
    {
        id: "8",
        name: "BP-01",
        price: "$140",
        image: "/images/look_8_new_1772586466007.png",
        images: [
            "/images/look_8_new_1772586466007.png",
        ],
    },
    {
        id: "9",
        name: "KN-01",
        price: "$40",
        image: "/images/look_9_new_1772586482070.png",
        images: [
            "/images/look_9_new_1772586482070.png",
        ],
    },
    {
        id: "10",
        name: "SL-02",
        price: "$60",
        image: "/images/look_10_new_1772586516143.png",
        images: [
            "/images/look_10_new_1772586516143.png",
        ],
    },
    {
        id: "11",
        name: "TS-01",
        price: "$35",
        image: "/images/look_11_new_1772586534268.png",
        images: [
            "/images/look_11_new_1772586534268.png",
        ],
    },
    {
        id: "12",
        name: "CB-01",
        price: "$120",
        image: "/images/look_12_new_1772586550894.png",
        images: [
            "/images/look_12_new_1772586550894.png",
        ],
    },
];

import { motion, AnimatePresence } from "framer-motion";

export function ShopSection() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showProductInfo, setShowProductInfo] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"compact" | "focus">("compact");

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
        if (selectedSize) {
            alert(`Added ${selectedProduct?.name} (Size: ${selectedSize}) to cart!`);
            handleClose();
        }
    };

    const handlePrevImage = () => {
        if (selectedProduct?.images) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedProduct.images!.length - 1 : prev - 1
            );
        }
    };

    const handleNextImage = () => {
        if (selectedProduct?.images) {
            setCurrentImageIndex((prev) =>
                prev === selectedProduct.images!.length - 1 ? 0 : prev + 1
            );
        }
    };

    const toggleViewMode = () => {
        setViewMode((prev) => (prev === "compact" ? "focus" : "compact"));
    };

    const leftAction = (
        <button
            onClick={toggleViewMode}
            className="text-xl opacity-70 hover:opacity-100 transition-opacity min-w-[32px] text-left"
        >
            {viewMode === "compact" ? "+" : "<"}
        </button>
    );

    if (selectedProduct) {
        return (
            <div
                className="min-h-screen bg-background text-foreground"
                style={{ "--background": "#ffffff", "--foreground": "#171717" } as React.CSSProperties}
            >
                <SiteHeader leftAction={leftAction} hideThemeToggle />

                {/* Back Button */}
                <button
                    onClick={handleClose}
                    className="fixed top-24 left-6 z-40 p-2 rounded-full bg-background/50 backdrop-blur-md shadow-sm border border-border/50 hover:bg-background transition-colors text-foreground"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Product Detail View */}
                <div className="flex flex-col items-center justify-center min-h-screen px-6 py-28">
                    {/* Image Carousel */}
                    <div className="relative w-full max-w-2xl mb-8 group">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-foreground/5 dark:bg-foreground/10">
                            <img
                                src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                            />
                        </div>

                        {/* Navigation Arrows */}
                        {selectedProduct.images && selectedProduct.images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 border border-border hover:bg-background transition shadow-sm text-foreground opacity-0 group-hover:opacity-100"
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 border border-border hover:bg-background transition shadow-sm text-foreground opacity-0 group-hover:opacity-100"
                                >
                                    &gt;
                                </button>
                            </>
                        )}
                    </div>

                    {/* Image Dots */}
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                        <div className="flex gap-2 mb-6">
                            {selectedProduct.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-foreground" : "bg-foreground/20 hover:bg-foreground/50"
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Product Info */}
                    <div className="text-center space-y-4 max-w-md w-full">
                        <h1 className="text-xl font-medium tracking-widest">{selectedProduct.name}</h1>
                        {selectedProduct.price && (
                            <p className="text-lg text-foreground/80">{selectedProduct.price}</p>
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
                                    <p className="text-sm text-foreground/70 mt-4 leading-relaxed">{selectedProduct.description}</p>
                                )}

                                {/* Material */}
                                {selectedProduct.material && (
                                    <div className="mt-6 text-left border-t border-border/50 pt-4">
                                        <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Material</p>
                                        <p className="text-sm font-medium">{selectedProduct.material}</p>
                                    </div>
                                )}

                                {/* Sizes */}
                                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                                    <div className="mt-6 border-t border-border/50 pt-4">
                                        <p className="text-xs uppercase tracking-wider text-foreground/50 mb-3 text-left">Size</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProduct.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 border rounded-full transition-colors text-sm font-medium ${selectedSize === size
                                                        ? "border-foreground bg-foreground text-background"
                                                        : "border-border hover:border-foreground/50 text-foreground"
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
                                    disabled={!selectedSize}
                                    className="mt-8 relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full border border-foreground bg-foreground text-background text-sm font-medium tracking-widest hover:bg-background hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.03]">
                                        ADD TO CART
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
        <div
            className="min-h-screen bg-background text-foreground transition-colors duration-500"
            style={{ "--background": "#ffffff", "--foreground": "#171717", "--border": "#e5e5e5" } as React.CSSProperties}
        >
            <SiteHeader leftAction={leftAction} hideThemeToggle />

            {/* Main Content */}
            <main className="pt-[73px]">

                {/* Product Grid */}
                <div className={`grid auto-rows-min gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 px-6 md:px-12 py-12 transition-all duration-700 ease-in-out ${viewMode === "focus"
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-3 md:grid-cols-6"
                    }`}>
                    <AnimatePresence>
                        {products.map((product) => (
                            <motion.button
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="group flex flex-col items-center gap-4 w-full"
                            >
                                <motion.div
                                    layout
                                    className="relative aspect-[4/5] w-full overflow-hidden"
                                >
                                    <motion.img
                                        layout
                                        src={product.image}
                                        alt={product.name}
                                        className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </motion.div>

                                <motion.div layout className="flex flex-col items-center">
                                    <p className="font-mono text-xs md:text-sm tracking-widest text-center text-foreground font-bold">{product.name}</p>
                                </motion.div>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
