"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  image: string;
  images?: string[];
  price?: string;
  description?: string;
  sizes?: string[];
  material?: string;
}

// Use images from public/images folder
const products: Product[] = [
  { id: "1", name: "PK-01", price: "$100", description: "Insulated puffer jacket with fur-trimmed hood", material: "100% Nylon, Down Fill", sizes: ["XS","S","M","L","XL","XXL"], image: "/images/J4-1.png", images: ["/images/J4-1.png","/images/J4-3.jpg","/images/J4-7.jpg","/images/J4-9.jpg"] },
  { id: "2", name: "JC-10", price: "$120", description: "Classic bomber jacket with ribbed details", material: "100% Polyester", sizes: ["S","M","L","XL"], image: "/images/J4-10.jpg", images: ["/images/J4-10.jpg","/images/J4-11.jpg"] },
  { id: "3", name: "JC-11", price: "$130", description: "Oversized utility jacket", material: "Cotton Blend", sizes: ["S","M","L","XL"], image: "/images/J4-13.jpg", images: ["/images/J4-13.jpg"] },
  { id: "4", name: "SL-03", price: "$80", image: "/images/J4-14.jpg", images: ["/images/J4-14.jpg"] },
  { id: "5", name: "BL-01", price: "$150", image: "/images/look_1_new_1772586185397.png", images: ["/images/look_1_new_1772586185397.png"] },
  { id: "6", name: "SG-03", price: "$45", image: "/images/look_2_1772585734074.png", images: ["/images/look_2_1772585734074.png"] },
  { id: "7", name: "BP-02", price: "$90", image: "/images/look_3_new_1772586220448.png", images: ["/images/look_3_new_1772586220448.png"] },
  { id: "8", name: "PK-01", price: "$110", image: "/images/look_4_new_1772586238413.png", images: ["/images/look_4_new_1772586238413.png"] },
  { id: "9", name: "WD-02", price: "$160", image: "/images/look_5_1772585794296.png", images: ["/images/look_5_1772585794296.png"] },
  { id: "10", name: "SL-01", price: "$70", image: "/images/look_6_new_1772586258677.png", images: ["/images/look_6_new_1772586258677.png"] },
  { id: "11", name: "CT-01", price: "$140", image: "/images/look_7_new_1772586448482.png", images: ["/images/look_7_new_1772586448482.png"] },
  { id: "12", name: "BG-03", price: "$95", image: "/images/look_8_new_1772586466007.png", images: ["/images/look_8_new_1772586466007.png"] },
];

export default function YeezyStore() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

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
      setCurrentImageIndex((prev) => prev === 0 ? selectedProduct.images!.length - 1 : prev - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedProduct?.images) {
      setCurrentImageIndex((prev) => prev === selectedProduct.images!.length - 1 ? 0 : prev + 1);
    }
  };

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <button onClick={handleClose} className="fixed top-6 left-6 z-50 text-2xl hover:opacity-70 transition-opacity">&lt;</button>

        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          <div className="relative w-full max-w-2xl mb-8">
            <div className="relative aspect-square">
              <img src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
            </div>

            {selectedProduct.images && selectedProduct.images.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl hover:opacity-70 transition-opacity">&lt;</button>
                <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl hover:opacity-70 transition-opacity">&gt;</button>
              </>
            )}
          </div>

          {selectedProduct.images && selectedProduct.images.length > 1 && (
            <div className="flex gap-2 mb-6">
              {selectedProduct.images.map((_, index) => (
                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-black" : "bg-neutral-300"}`} />
              ))}
            </div>
          )}

          <div className="text-center space-y-4 max-w-md">
            <h1 className="text-xl font-medium tracking-widest">{selectedProduct.name}</h1>
            {selectedProduct.price && <p className="text-lg">{selectedProduct.price}</p>}

            {!showProductInfo ? (
              <button onClick={() => setShowProductInfo(true)} className="text-2xl hover:opacity-70 transition-opacity mt-6">+</button>
            ) : (
              <>
                {selectedProduct.description && <p className="text-sm text-neutral-600 mt-4">{selectedProduct.description}</p>}
                {selectedProduct.material && (
                  <div className="mt-4 text-left">
                    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Material</p>
                    <p className="text-sm">{selectedProduct.material}</p>
                  </div>
                )}

                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Size</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedProduct.sizes.map((size) => (
                        <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border transition-colors text-sm ${selectedSize === size ? "border-black bg-black text-white" : "border-neutral-300 hover:border-black"}`}>{size}</button>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={handleAddToCart} disabled={!selectedSize} className="mt-6 px-8 py-3 bg-black text-white text-sm font-medium tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">ADD TO CART</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between px-6 py-4">
          <button onClick={() => setIsEnlarged(!isEnlarged)} className="text-2xl hover:opacity-70 transition-opacity">{isEnlarged ? "<" : "+"}</button>
          <nav className="flex items-center gap-4 md:gap-8 text-xs md:text-sm tracking-wider">
            <a href="#" className="font-bold">NEW</a>
            <a href="#" className="text-neutral-400 hover:text-black transition-colors">MENS</a>
            <a href="#" className="text-neutral-400 hover:text-black transition-colors">WOMENS</a>
            <a href="#" className="hidden sm:inline text-neutral-400 hover:text-black transition-colors">SLIDES</a>
            <a href="#" className="hidden sm:inline text-neutral-400 hover:text-black transition-colors">ACCESSORIES</a>
          </nav>
          <button onClick={() => setShowAuth(true)} className="text-sm tracking-wider hover:opacity-70 transition-opacity">SIGN IN</button>
        </div>
      </header>

      {showAuth && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md p-8 relative">
            <button onClick={() => setShowAuth(false)} className="absolute top-6 right-6 text-2xl hover:opacity-70 transition-opacity">×</button>

            <div className="space-y-6">
              <h2 className="text-2xl font-medium tracking-wider text-center">{isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}</h2>

              <div className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-wider text-neutral-500">Name</Label>
                    <Input id="name" type="text" className="border-neutral-300 focus:border-black" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-neutral-500">Email</Label>
                  <Input id="email" type="email" className="border-neutral-300 focus:border-black" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs uppercase tracking-wider text-neutral-500">Password</Label>
                  <Input id="password" type="password" className="border-neutral-300 focus:border-black" />
                </div>
              </div>

              <Button className="w-full bg-black text-white hover:bg-neutral-800 text-sm tracking-widest">{isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}</Button>

              <div className="text-center">
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-neutral-600 hover:text-black transition-colors">{isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pt-[73px]">
        <div className={`grid gap-0 transition-all duration-300 ${isEnlarged ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-3 lg:grid-cols-6"}`}>
          {products.map((product) => (
            <button key={product.id} onClick={() => handleProductClick(product)} className="group relative aspect-[3/4] overflow-hidden hover:opacity-90 transition-opacity">
              <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover object-center" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-xs font-medium tracking-widest text-center text-white">{product.name}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
