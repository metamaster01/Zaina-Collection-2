
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


"use client"

import type React from "react"
import { useState } from "react"
import type { Product } from "../types"
import ProductCard from "./ProductCard"

interface ProductGridProps {
  title: string
  products: Product[]
  onProductQuickView: (product: Product) => void
  onProductQuickShop: (product: Product) => void
  onProductCardClick?: (product: Product) => void
  sectionBgColor?: string
  titleColor?: string
  onToggleWishlist?: (product: Product) => void
  isProductInWishlist?: (productId: string) => boolean
  onToggleCompare?: (product: Product) => void
  isProductInCompare?: (productId: string) => boolean
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
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
  const [isExpanded, setIsExpanded] = useState(false)
  const displayProducts = isExpanded ? products : products.slice(0, 3)

  if (!products) {
    return (
      <section className={`py-12 md:py-16 ${sectionBgColor}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${titleColor} mb-4`}>{title}</h2>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`py-12 md:py-16 ${sectionBgColor} relative overflow-hidden px-10 sm:px-10 md:px-10 lg:px-16`}
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <div className="absolute top-8 left-8 w-20 h-20 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
          <path d="M50 0 L60 35 L100 35 L72 57 L82 92 L50 70 L18 92 L28 57 L0 35 L40 35 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-orange-300">
          <circle cx="50" cy="50" r="15" fill="currentColor" />
          <path
            d="M50 15 L53 35 L50 30 L47 35 Z M85 50 L65 53 L70 50 L65 47 Z M50 85 L47 65 L50 70 L53 65 Z M15 50 L35 47 L30 50 L35 53 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {title && (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-1">Trending Now</p>
            <h2 className={`text-3xl md:text-4xl font-bold ${titleColor} mb-2`}>{title}</h2>
            <p className="text-gray-600 text-sm">Our finest loved styles that'll become a staple in your wardrobe</p>

            <div className="flex justify-center mt-4 mb-8">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {products.length === 0 && (
          <p className="text-gray-600 text-center">No products currently available in this collection.</p>
        )}

        {products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onProductQuickView}
                  onQuickShop={onProductQuickShop}
                  onProductCardClick={onProductCardClick}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={isProductInWishlist ? isProductInWishlist(product.id) : false}
                  onToggleCompare={onToggleCompare}
                  isCompared={isProductInCompare ? isProductInCompare(product.id) : false}
                />
              ))}
            </div>

            {products.length > 3 && (
              <div className="text-center mt-8">
                {!isExpanded ? (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    View more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
