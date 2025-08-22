
// import React, { useState } from 'react';
// import { Product } from '../types'; 
// import EyeIcon from './icons/EyeIcon';
// import HeartIcon from './icons/HeartIcon';
// import ShoppingCartIcon from './icons/ShoppingCartIcon';
// import SparkleIcon from './icons/SparkleIcon'; 
// import ScaleIcon from './icons/ScaleIcon';

// interface ProductCardProps {
//   product: Product;
//   onQuickView: (product: Product) => void;
//   onQuickShop: (product: Product) => void; 
//   onProductCardClick?: (product: Product) => void; 
//   onToggleWishlist?: (product: Product) => void;
//   isWishlisted?: boolean;
//   onToggleCompare?: (product: Product) => void;
//   isCompared?: boolean;
//   compact?: boolean;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ 
//   product, 
//   onQuickView, 
//   onQuickShop, 
//   onProductCardClick,
//   onToggleWishlist,
//   isWishlisted = false,
//   onToggleCompare,
//   isCompared = false,
//   compact = false,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   const currentImageUrl = isHovered && product.hoverImageUrl ? product.hoverImageUrl : product.imageUrl;

//   const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    
//     if ((e.target as HTMLElement).closest('button')) {
//       return;
//     }
//     if (onProductCardClick) {
//       onProductCardClick(product);
//     }
//   };


//   return (
//     <div 
//       className="bg-zaina-white dark:bg-dark-zaina-bg-card rounded-md overflow-hidden group relative transition-all duration-300 ease-out flex flex-col h-full product-card-hover-cursor shadow-sm hover:shadow-xl dark:shadow-md dark:hover:shadow-black/20 transform hover:-translate-y-2"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       role="group"
//       aria-label={`Product: ${product.name}`}
//       onClick={handleCardClick} 
//       style={{ cursor: onProductCardClick ? 'pointer' : 'default' }}
//     >
//       <div className={`relative ${compact ? 'aspect-square' : 'aspect-[3/4]'} overflow-hidden`}>
//         <img 
//           src={currentImageUrl} 
//           alt={product.name} 
//           className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
//           loading="lazy" 
//         />
        
//         {onToggleWishlist && (
//             <button
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     onToggleWishlist(product);
//                 }}
//                 className="absolute top-2.5 right-2.5 p-2 bg-zaina-white/80 dark:bg-dark-zaina-bg-card/80 rounded-full shadow-md hover:scale-110 transition-all duration-200 z-10"
//                 aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                 title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//             >
//                 <HeartIcon 
//                     className={`w-5 h-5 ${isWishlisted ? 'text-zaina-deep-red-accent' : 'text-zaina-text-secondary/80 dark:text-dark-zaina-text-secondary/80'}`} 
//                     isFilled={isWishlisted} 
//                 />
//             </button>
//         )}
        
//         {(product.isNew || product.isBestSeller) && (
//            <span className={`absolute top-2.5 left-2.5 text-xs font-semibold px-2 py-1 rounded-sm 
//                             ${product.isBestSeller ? 'bg-zaina-gold text-zaina-text-primary dark:bg-zaina-gold dark:text-dark-zaina-bg-card' : `bg-zaina-primary text-zaina-white dark:bg-dark-zaina-primary dark:text-dark-zaina-text-primary`}`}>
//             {product.isBestSeller ? 'Best Seller' : 'New'}
//           </span>
//         )}

//         {/* Quick Actions Overlay - appears on hover */}
//         <div className="absolute inset-x-0 bottom-0 p-3 flex space-x-1.5 sm:space-x-2.5 justify-center">
//           <button 
//             onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
//             className={`p-2.5 bg-zaina-white/90 dark:bg-dark-zaina-bg-card/90 text-zaina-text-primary dark:text-dark-zaina-text-primary rounded-md shadow-md 
//                        hover:bg-zaina-primary hover:text-zaina-white dark:hover:bg-dark-zaina-primary dark:hover:text-dark-zaina-text-primary
//                        transition-all duration-300 ease-out 
//                        focus:outline-none focus:ring-2 focus:ring-zaina-primary dark:focus:ring-dark-zaina-primary focus:ring-opacity-50
//                        ${isHovered ? 'opacity-100 translate-y-0 scale-100 delay-100' : 'opacity-0 translate-y-4 scale-95'}`}
//             title="Quick View"
//             aria-label="Quick view product"
//           >
//             <EyeIcon className="w-5 h-5" />
//           </button>
//           <button 
//             onClick={(e) => { e.stopPropagation(); onQuickShop(product); }}
//             className={`p-2.5 bg-zaina-white/90 dark:bg-dark-zaina-bg-card/90 text-zaina-text-primary dark:text-dark-zaina-text-primary rounded-md shadow-md 
//                        hover:bg-zaina-primary hover:text-zaina-white dark:hover:bg-dark-zaina-primary dark:hover:text-dark-zaina-text-primary
//                        transition-all duration-300 ease-out 
//                        focus:outline-none focus:ring-2 focus:ring-zaina-primary dark:focus:ring-dark-zaina-primary focus:ring-opacity-50
//                        ${isHovered ? 'opacity-100 translate-y-0 scale-100 delay-200' : 'opacity-0 translate-y-4 scale-95'}`}
//             title="Quick Shop"
//             aria-label="Quick shop product"
//           >
//             <ShoppingCartIcon className="w-5 h-5" />
//           </button>
//            {onToggleCompare && (
//              <button 
//                 onClick={(e) => { e.stopPropagation(); onToggleCompare(product); }}
//                 className={`p-2.5 bg-zaina-white/90 dark:bg-dark-zaina-bg-card/90 rounded-md shadow-md 
//                            transition-all duration-300 ease-out 
//                            focus:outline-none focus:ring-2 focus:ring-zaina-primary dark:focus:ring-dark-zaina-primary focus:ring-opacity-50
//                            ${isHovered ? 'opacity-100 translate-y-0 scale-100 delay-300' : 'opacity-0 translate-y-4 scale-95'}
//                            ${isCompared ? 'bg-zaina-primary text-zaina-white dark:bg-dark-zaina-primary dark:text-dark-zaina-text-primary' : 'text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-primary hover:text-zaina-white dark:hover:bg-dark-zaina-primary dark:hover:text-dark-zaina-text-primary'}`}
//                 title={isCompared ? "Remove from Compare" : "Add to Compare"}
//                 aria-label={isCompared ? "Remove from Compare" : "Add to Compare"}
//               >
//                 <ScaleIcon className="w-5 h-5" />
//               </button>
//            )}
//         </div>
//       </div>
      
//       <div className={`${compact ? 'p-3' : 'p-4'} text-center flex-grow flex flex-col justify-between`}>
//         <div>
//           <h3 className={`${compact ? 'text-base' : 'text-lg'} font-heading-cormorant font-medium text-zaina-text-primary dark:text-dark-zaina-text-primary mb-1 truncate`} title={product.name}>
//             {product.name}
//           </h3>
//           <p className={`${compact ? 'text-xs mb-1' : 'text-sm mb-2'} text-zaina-text-secondary dark:text-dark-zaina-text-secondary font-body-inter`}>{product.category}</p>
//           <div className={`flex items-center justify-center ${compact ? '' : 'mb-2'}`}>
//             <p className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-zaina-gold dark:text-zaina-gold font-body-jost`}>₹{product.price.toFixed(2)}</p>
//             {product.mrp > product.price && (
//               <p className="text-sm text-zaina-text-secondary/70 dark:text-dark-zaina-text-secondary/70 line-through ml-2 font-body-jost">₹{product.mrp.toFixed(2)}</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

"use client"

import type React from "react"
import { useState } from "react"
import type { Product } from "../types"
import EyeIcon from "./icons/EyeIcon"
import HeartIcon from "./icons/HeartIcon"
import ScaleIcon from "./icons/ScaleIcon"

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
  onQuickShop: (product: Product) => void
  onProductCardClick?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isWishlisted?: boolean
  onToggleCompare?: (product: Product) => void
  isCompared?: boolean
  compact?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickShop,
  onProductCardClick,
  onToggleWishlist,
  isWishlisted = false,
  onToggleCompare,
  isCompared = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const currentImageUrl = isHovered && product.hoverImageUrl ? product.hoverImageUrl : product.imageUrl

  const discount =
    product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return
    // On mobile, clicking card/image/title will shop now
    if (window.innerWidth < 768) {
      onQuickShop(product)
    } else if (onProductCardClick) {
      onProductCardClick(product)
    }
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden group relative transition-all duration-300 ease-out flex flex-col h-full shadow-sm hover:shadow-lg transform hover:-translate-y-1 border-2 border-dashed border-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="relative aspect-[3/4] overflow-hidden p-2 sm:p-6">
        <img
          src={currentImageUrl || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-2xl"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
            -{discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleWishlist(product)
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-10"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <HeartIcon
              className={`w-5 h-5 ${isWishlisted ? "text-red-500" : "text-gray-400"}`}
              isFilled={isWishlisted}
            />
          </button>
        )}

        {/* New / Best Seller */}
        {(product.isNew || product.isBestSeller) && (
          <span
            className={`absolute bottom-3 left-3 text-xs font-medium px-3 py-1 rounded-full ${
              product.isBestSeller ? "bg-pink-400 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {product.isBestSeller ? "Best seller" : "New"}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 text-left flex-grow flex flex-col">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center justify-between mt-auto mb-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-orange-500">₹{product.price.toFixed(2)}</span>
              {product.mrp > product.price && (
                <span className="text-sm text-gray-400 line-through">₹{product.mrp.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Shop Now button - only on desktop */}
        <div className="hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onQuickShop(product)
            }}
            className="w-full py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Shop Now</span>
            <img src="/arrow.png" alt="" className="w-4 h-4" />
          </button>
        </div>

        {/* Hover icons (desktop only) */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 p-3 flex space-x-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onQuickView(product)
            }}
            className="p-2 bg-white/90 text-gray-700 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200"
            title="Quick View"
            aria-label="Quick view product"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleCompare(product)
              }}
              className={`p-2 rounded-full shadow-md transition-all duration-200 ${
                isCompared ? "bg-blue-600 text-white" : "bg-white/90 text-gray-700 hover:bg-gray-50"
              }`}
              title={isCompared ? "Remove from Compare" : "Add to Compare"}
              aria-label={isCompared ? "Remove from Compare" : "Add to Compare"}
            >
              <ScaleIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
