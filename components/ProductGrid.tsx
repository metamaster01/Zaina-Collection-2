// import React from 'react';
// import { Product } from '../types';
// import ProductCard from './ProductCard';

// interface ProductGridProps {
//   title: string;
//   products: Product[];
//   onProductQuickView: (product: Product) => void;
//   onProductQuickShop: (product: Product) => void;
//   onProductCardClick?: (product: Product) => void;
//   sectionBgColor?: string;
//   titleColor?: string;
//   onToggleWishlist?: (product: Product) => void;
//   isProductInWishlist?: (productId: string) => boolean;
//   onToggleCompare?: (product: Product) => void;
//   isProductInCompare?: (productId: string) => boolean;
// }

// const ProductGrid: React.FC<ProductGridProps> = ({
//   title,
//   products,
//   onProductQuickView,
//   onProductQuickShop,
//   onProductCardClick,
//   sectionBgColor = 'bg-zaina-neutral-light dark:bg-dark-zaina-neutral-light',
//   titleColor = 'text-zaina-text-primary dark:text-dark-zaina-text-primary',
//   onToggleWishlist,
//   isProductInWishlist,
//   onToggleCompare,
//   isProductInCompare,
// }) => {
//   if (!products) {
//     return (
//       <section className={`py-12 md:py-16 ${sectionBgColor}`}>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className={`text-3xl md:text-4xl font-heading-cormorant font-semibold ${titleColor} mb-4`}>{title}</h2>
//           <p className={`${titleColor === 'text-zaina-text-primary' ? 'text-zaina-text-primary/70 dark:text-dark-zaina-text-primary/70' : 'text-current/70'} font-body-inter`}>Loading products...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className={`py-12 md:py-16 ${sectionBgColor}`} id={title.toLowerCase().replace(/\s+/g, '-')}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {title && <h2 className={`text-3xl md:text-4xl font-heading-cormorant font-semibold text-center ${titleColor} mb-10 md:mb-12`}>{title}</h2>}

//         {products.length === 0 && (
//              <p className={`${titleColor === 'text-zaina-text-primary' ? 'text-zaina-text-primary/70 dark:text-dark-zaina-text-primary/70' : 'text-current/70'} text-center font-body-inter`}>No products currently available in this collection.</p>
//         )}

//         {products.length > 0 && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
//             {products.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onQuickView={onProductQuickView}
//                   onQuickShop={onProductQuickShop}
//                   onProductCardClick={onProductCardClick}
//                   onToggleWishlist={onToggleWishlist}
//                   isWishlisted={isProductInWishlist ? isProductInWishlist(product.id) : false}
//                   onToggleCompare={onToggleCompare}
//                   isCompared={isProductInCompare ? isProductInCompare(product.id) : false}
//                 />
//             ))}
//             </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductGrid;

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  title: string;
  products?: Product[];
  onProductQuickView: (product: Product) => void;
  onProductQuickShop: (product: Product) => void;
  onProductCardClick?: (product: Product) => void;
  sectionBgColor?: string;
  titleColor?: string;
  onToggleWishlist?: (product: Product) => void;
  isProductInWishlist?: (productId: string) => boolean;
  onToggleCompare?: (product: Product) => void;
  isProductInCompare?: (productId: string) => boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products: productsProp, // keep raw prop so we can detect "loading"
  onProductQuickView,
  onProductQuickShop,
  onProductCardClick,
  sectionBgColor = "bg-white",
  titleColor = "text-gray-900",
  onToggleWishlist,
  isProductInWishlist,
  onToggleCompare,
  isProductInCompare,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track screen size
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024); // Tailwind lg breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // // Initial slice logic: 6 for desktop, 3 for mobile
  // const initialCount = isDesktop ? 6 : 6
  // const displayProducts = isExpanded ? products : products.slice(0, initialCount)

  // Normalize products & loading state
  const isLoading = productsProp === undefined;
  const products = Array.isArray(productsProp) ? productsProp : []; // always an array after this line

  // Initial slice logic (desktop vs mobile)
  const initialCount = isDesktop ? 9 : 9;
  const displayProducts = isExpanded
    ? products
    : products.slice(0, initialCount);

  if (isLoading) {
    return (
      <section className={`py-12 md:py-16 ${sectionBgColor}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${titleColor} mb-4`}>
            {title}
          </h2>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (!products) {
    return (
      <section className={`py-12 md:py-16 ${sectionBgColor}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${titleColor} mb-4`}>
            {title}
          </h2>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-12 md:py-16 ${sectionBgColor} relative overflow-hidden px-4 sm:px-4 md:px-10 lg:px-16`}
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {title && (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-1">Trending Now</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${titleColor} mb-2`}>
              {title}
            </h2>
            <p className="text-gray-600 text-sm">
              Our finest loved styles that'll become a staple in your wardrobe
            </p>
          </div>
        )}

        {products.length === 0 && (
          <p className="text-gray-600 text-center">
            No products currently available in this collection.
          </p>
        )}

        {products.length > 0 && (
          <>
            {/* grid stays same, just product count changes */}
            <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => (
                <ProductCard
                  key={String((product as any).id ?? (product as any)._id)}
                  product={product}
                  onQuickView={() => onProductQuickView(product)}
                  onQuickShop={() => onProductQuickShop(product)}
                  onCardClick={() => onProductCardClick?.(product)}
                  onProductCardClick={() => onProductCardClick?.(product)}
                  onToggleWishlist={onToggleWishlist}
                  isInWishlist={
                    isProductInWishlist?.(
                      String((product as any).id ?? (product as any)._id)
                    ) ?? false
                  }
                  isWishlisted={
                    isProductInWishlist?.(
                      String((product as any).id ?? (product as any)._id)
                    ) ?? false
                  }
                  onToggleCompare={onToggleCompare}
                  isInCompare={
                    isProductInCompare?.(
                      String((product as any).id ?? (product as any)._id)
                    ) ?? false
                  }
                  isCompared={
                    isProductInCompare?.(
                      String((product as any).id ?? (product as any)._id)
                    ) ?? false
                  }
                />
              ))}
            </div>

            {products.length > initialCount && (
              <div className="text-center mt-8">
                {!isExpanded ? (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    View more
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    View less
                    <svg
                      className="w-4 h-4 ml-1 transform rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
