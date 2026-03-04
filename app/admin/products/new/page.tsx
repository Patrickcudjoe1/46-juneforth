"use client";

import { useState } from "react";
import { useProducts, Product } from "@/components/product-provider";
import { useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
    const { addProduct } = useProducts();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        material: "",
        sizes: "S, M, L",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Ensure it's an image
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setPreviewImage(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !previewImage) {
            alert("Please fill in the product name, price, and upload an image.");
            return;
        }

        setIsLoading(true);

        try {
            // Clean up sizes string to array
            const sizesArray = formData.sizes
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

            const newProduct: Product = {
                id: Date.now().toString(), // Simple unique ID generator
                name: formData.name,
                price: formData.price.startsWith("GH₵") ? formData.price : `GH₵${formData.price}`,
                description: formData.description,
                material: formData.material,
                sizes: sizesArray,
                image: previewImage,
                images: [previewImage],
            };

            addProduct(newProduct);

            // Redirect back to products table
            router.push("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Failed to add product. Ensure image is not too large for local storage.");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            <header className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 border border-foreground/10 rounded-full hover:bg-foreground/5 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-mono font-bold tracking-tight">Add New Product</h1>
                    <p className="text-sm font-medium opacity-60">
                        Create a new item in your store's catalog.
                    </p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-background border border-foreground/10 rounded-xl p-6 md:p-8 shadow-sm">

                {/* Image Upload Area */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold font-mono tracking-widest uppercase opacity-70">
                        Product Media (Required)
                    </label>
                    <div className="relative border-2 border-dashed border-foreground/20 rounded-xl h-64 flex flex-col items-center justify-center overflow-hidden hover:bg-foreground/5 transition-colors group">
                        {previewImage ? (
                            <>
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPreviewImage(null)}
                                    className="absolute top-4 right-4 p-2 bg-background border border-foreground/10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-4 text-center p-6">
                                <div className="p-4 rounded-full bg-foreground/5 text-foreground/60">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold font-mono">Click to upload image</p>
                                    <p className="text-xs opacity-60 mt-1">SVG, PNG, JPG or GIF (max. 2MB for local storage)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs font-bold font-mono tracking-widest uppercase opacity-70">
                                Product Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="e.g. BL-01 Oversized Blazer"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-sm focus:border-foreground focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="text-xs font-bold font-mono tracking-widest uppercase opacity-70">
                                Price (GH₵)
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                placeholder="150"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-sm focus:border-foreground focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="sizes" className="text-xs font-bold font-mono tracking-widest uppercase opacity-70">
                                Sizes (Comma separated)
                            </label>
                            <input
                                id="sizes"
                                name="sizes"
                                type="text"
                                placeholder="S, M, L, XL"
                                value={formData.sizes}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-sm focus:border-foreground focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="material" className="text-xs font-bold font-mono tracking-widest uppercase opacity-70">
                                Material
                            </label>
                            <input
                                id="material"
                                name="material"
                                type="text"
                                placeholder="e.g. 100% Cotton"
                                value={formData.material}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-sm focus:border-foreground focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Detailed Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 h-full">
                            <label htmlFor="description" className="text-xs font-bold font-mono tracking-widest uppercase opacity-70">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Write a detailed description of the product..."
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full h-[250px] bg-transparent border border-foreground/20 px-4 py-3 text-sm rounded-md focus:border-foreground focus:outline-none transition-colors resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-foreground/10 flex justify-end gap-4">
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 border border-foreground/20 rounded-md text-sm font-bold tracking-widest font-mono uppercase hover:bg-foreground/5 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-foreground text-background rounded-md text-sm font-bold tracking-widest font-mono uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
