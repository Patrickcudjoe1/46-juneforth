"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

// We will define the base initial products here temporarily, or extract from shop-section later.
// Let's create the default catalog.

const initialProducts: Product[] = [
    {
        id: "1",
        name: "PK-01",
        price: "GH₵100",
        description: "Insulated puffer jacket with fur-trimmed hood",
        material: "100% Nylon, Down Fill",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        image: "/images/look_2_new_1772586200765.png",
        images: ["/images/look_2_new_1772586200765.png"],
    },
    {
        id: "2",
        name: "JC-10",
        price: "GH₵120",
        description: "Classic bomber jacket with ribbed details",
        material: "100% Polyester",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_1_new_1772586185397.png",
        images: ["/images/look_1_new_1772586185397.png"],
    },
    {
        id: "3",
        name: "JC-11",
        price: "GH₵130",
        description: "Oversized utility jacket",
        material: "Cotton Blend",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_3_new_1772586220448.png",
        images: ["/images/look_3_new_1772586220448.png"],
    },
    {
        id: "4",
        name: "JC-12",
        price: "GH₵140",
        description: "Lightweight windbreaker",
        material: "100% Nylon",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_4_new_1772586238413.png",
        images: ["/images/look_4_new_1772586238413.png"],
    },
    {
        id: "5",
        name: "JC-13",
        price: "GH₵150",
        description: "Denim trucker jacket",
        material: "100% Cotton",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_6_new_1772586258677.png",
        images: ["/images/look_6_new_1772586258677.png"],
    },
    {
        id: "6",
        name: "JC-14",
        price: "GH₵160",
        description: "Leather moto jacket",
        material: "100% Leather",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/J4-1.png",
        images: ["/images/J4-1.png"],
    },
    {
        id: "7",
        name: "BL-01",
        price: "GH₵90",
        description: "Sleek tailored black blazer",
        material: "Wool Blend",
        sizes: ["S", "M", "L"],
        image: "/images/look_7_new_1772586448482.png",
        images: ["/images/look_7_new_1772586448482.png"],
    },
    {
        id: "8",
        name: "BL-02",
        price: "GH₵95",
        description: "Oversized minimalist blazer",
        material: "Polyester Viscose",
        sizes: ["S", "M", "L"],
        image: "/images/look_8_new_1772586466007.png",
        images: ["/images/look_8_new_1772586466007.png"],
    },
    {
        id: "9",
        name: "BL-03",
        price: "GH₵110",
        description: "Structured double-breasted blazer",
        material: "100% Wool",
        sizes: ["S", "M", "L"],
        image: "/images/look_9_new_1772586482070.png",
        images: ["/images/look_9_new_1772586482070.png"],
    },
    {
        id: "10",
        name: "BL-04",
        price: "GH₵105",
        description: "Casual linen blend blazer",
        material: "Linen Blend",
        sizes: ["S", "M", "L"],
        image: "/images/look_10_new_1772586516143.png",
        images: ["/images/look_10_new_1772586516143.png"],
    },
    {
        id: "11",
        name: "BL-05",
        price: "GH₵120",
        description: "Premium fitted charcoal blazer",
        material: "Wool Blend",
        sizes: ["M", "L", "XL"],
        image: "/images/look_11_new_1772586534268.png",
        images: ["/images/look_11_new_1772586534268.png"],
    },
    {
        id: "12",
        name: "BL-06",
        price: "GH₵130",
        description: "Textured weave statement blazer",
        material: "Poly-Cotton Blend",
        sizes: ["S", "M", "L"],
        image: "/images/look_12_new_1772586550894.png",
        images: ["/images/look_12_new_1772586550894.png"],
    },
    {
        id: "13",
        name: "TS-01",
        price: "GH₵85",
        description: "Essential minimalist tee",
        material: "100% Organic Cotton",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_1_1772585711621.png",
        images: ["/images/look_1_1772585711621.png"],
    },
    {
        id: "14",
        name: "TS-02",
        price: "GH₵90",
        description: "Heavyweight boxy t-shirt",
        material: "100% Cotton",
        sizes: ["S", "M", "L"],
        image: "/images/look_2_1772585734074.png",
        images: ["/images/look_2_1772585734074.png"],
    },
    {
        id: "15",
        name: "TS-03",
        price: "GH₵85",
        description: "Classic relaxed fit tee",
        material: "Cotton Blend",
        sizes: ["M", "L", "XL"],
        image: "/images/look_3_1772585750331.png",
        images: ["/images/look_3_1772585750331.png"],
    },
    {
        id: "16",
        name: "TS-04",
        price: "GH₵95",
        description: "Premium supima cotton t-shirt",
        material: "Supima Cotton",
        sizes: ["S", "M", "L"],
        image: "/images/look_4_1772585768417.png",
        images: ["/images/look_4_1772585768417.png"],
    },
    {
        id: "17",
        name: "TS-05",
        price: "GH₵80",
        description: "Lightweight summer tee",
        material: "100% Cotton",
        sizes: ["S", "M", "L", "XL"],
        image: "/images/look_5_1772585794296.png",
        images: ["/images/look_5_1772585794296.png"],
    },
    {
        id: "18",
        name: "TS-06",
        price: "GH₵100",
        description: "Textured oversized t-shirt",
        material: "Cotton Jersey",
        sizes: ["M", "L", "XL"],
        image: "/images/look_6_1772585808512.png",
        images: ["/images/look_6_1772585808512.png"],
    },
];

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load from local storage on mount
        const storedProducts = localStorage.getItem("site_products");
        if (storedProducts) {
            try {
                setProducts(JSON.parse(storedProducts));
            } catch (error) {
                console.error("Failed to parse products from local storage", error);
                setProducts(initialProducts);
            }
        } else {
            // First time load, set initial products
            setProducts(initialProducts);
            localStorage.setItem("site_products", JSON.stringify(initialProducts));
        }
        setIsLoading(false);
    }, []);

    const addProduct = (product: Product) => {
        setProducts((prev) => {
            const newProducts = [product, ...prev];
            localStorage.setItem("site_products", JSON.stringify(newProducts));
            return newProducts;
        });
    };

    const updateProduct = (id: string, updatedFields: Partial<Product>) => {
        setProducts((prev) => {
            const newProducts = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
            localStorage.setItem("site_products", JSON.stringify(newProducts));
            return newProducts;
        });
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => {
            const newProducts = prev.filter((p) => p.id !== id);
            localStorage.setItem("site_products", JSON.stringify(newProducts));
            return newProducts;
        });
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                isLoading,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
