"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "./product-provider";

export interface CartItem {
    product: Product;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, size: string) => void;
    removeItem: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        setIsMounted(true);
        const storedItems = localStorage.getItem("shopping-cart");
        if (storedItems) {
            try {
                setItems(JSON.parse(storedItems));
            } catch (error) {
                console.error("Failed to parse cart items from local storage:", error);
            }
        }
    }, []);

    // Save to local storage whenever items change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("shopping-cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (product: Product, size: string) => {
        setItems((prev) => {
            const existingItem = prev.find((i) => i.product.id === product.id && i.size === size);
            if (existingItem) {
                return prev.map((i) =>
                    i.product.id === product.id && i.size === size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { product, size, quantity: 1 }];
        });
    };

    const removeItem = (productId: string, size: string) => {
        setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
    };

    const updateQuantity = (productId: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((i) =>
                i.product.id === productId && i.size === size ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = items.reduce((sum, item) => {
        const price = parseFloat(item.product.price?.replace(/[^0-9.]/g, "") || "0");
        return sum + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
