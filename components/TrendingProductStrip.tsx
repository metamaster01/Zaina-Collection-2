
// import React, { useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// import { Product } from '../types';
// import ProductCard from './ProductCard';
// import ChevronLeftIcon from './icons/ChevronLeftIcon';
// import ChevronRightIcon from './icons/ChevronRightIcon';

// interface TrendingProductStripProps {
//   title: string;
//   products: Product[];
//   onProductQuickView: (product: Product) => void;
//   onProductQuickShop: (product: Product) => void;
//   onProductCardClick?: (product: Product) => void; 
//   onToggleWishlist?: (product: Product) => void;
//   isProductInWishlist?: (productId: string) => boolean;
//   onToggleCompare?: (product: Product) => void;
//   isProductInCompare?: (productId: string) => boolean;
// }

// const TrendingProductStrip: React.FC<TrendingProductStripProps> = ({ 
//   title, 
//   products, 
//   onProductQuickView, 
//   onProductQuickShop,
//   onProductCardClick,
//   onToggleWishlist,
//   isProductInWishlist,
//   onToggleCompare,
//   isProductInCompare,
// }) => {
//   const swiperRef = useRef<any>(null); 

//   if (!products || products.length === 0) return null;

//   const uniqueId = `trending-strip-${title.toLowerCase().replace(/\s+/g, '-')}`;

//   return (
//     <section 
//       className="py-10 md:py-12 bg-zaina-sky-blue-light dark:bg-dark-zaina-sky-blue-light group/strip" 
//       id="trending-strip"
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-heading-cinzel font-bold text-center text-zaina-text-primary dark:text-dark-zaina-text-primary mb-8 md:mb-10">
//           {title}
//         </h2>
//         <div className="relative">
//           <Swiper
//             onSwiper={(swiper) => {
//               swiperRef.current = swiper;
//             }}
//             modules={[Autoplay, Navigation]}
//             spaceBetween={20}
//             slidesPerView={2}
//             loop={products.length > 5} 
//             autoplay={{
//               delay: 3500,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true, 
//             }}
//             navigation={{
//               nextEl: `.${uniqueId}-next`,
//               prevEl: `.${uniqueId}-prev`,
//             }}
//             breakpoints={{
//               640: { slidesPerView: 3, spaceBetween: 20 },
//               768: { slidesPerView: 4, spaceBetween: 25 },
//               1024: { slidesPerView: 5, spaceBetween: 30 },
//             }}
//             className="pb-2" 
//           >
//             {products.map((product) => (
//               <SwiperSlide key={product.id} className="h-auto">
//                 <ProductCard 
//                   product={product} 
//                   onQuickView={onProductQuickView} 
//                   onQuickShop={onProductQuickShop}
//                   onProductCardClick={onProductCardClick}
//                   onToggleWishlist={onToggleWishlist}
//                   isWishlisted={isProductInWishlist ? isProductInWishlist(product.id) : false}
//                   onToggleCompare={onToggleCompare}
//                   isCompared={isProductInCompare ? isProductInCompare(product.id) : false}
//                   compact
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
          
//           <button 
//             className={`${uniqueId}-prev absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2.5 bg-zaina-white/80 dark:bg-dark-zaina-bg-card/80 hover:bg-zaina-white dark:hover:bg-dark-zaina-bg-card rounded-full shadow-lg cursor-pointer text-zaina-primary dark:text-dark-zaina-primary opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-zaina-primary dark:focus:ring-dark-zaina-primary`} 
//             aria-label="Previous trending products"
//             onClick={() => swiperRef.current?.slidePrev()}
//           >
//               <ChevronLeftIcon className="w-6 h-6" />
//           </button>
//           <button 
//             className={`${uniqueId}-next absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10 p-2.5 bg-zaina-white/80 dark:bg-dark-zaina-bg-card/80 hover:bg-zaina-white dark:hover:bg-dark-zaina-bg-card rounded-full shadow-lg cursor-pointer text-zaina-primary dark:text-dark-zaina-primary opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-zaina-primary dark:focus:ring-dark-zaina-primary`} 
//             aria-label="Next trending products"
//             onClick={() => swiperRef.current?.slideNext()}
//           >
//               <ChevronRightIcon className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingProductStrip;

"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import type { Product } from "../types"
import ProductCard from "./ProductCard"
import ChevronLeftIcon from "./icons/ChevronLeftIcon"
import ChevronRightIcon from "./icons/ChevronRightIcon"

interface TrendingProductStripProps {
  title: string
  products: Product[]
  onProductQuickView: (product: Product) => void
  onProductQuickShop: (product: Product) => void
  onProductCardClick?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isProductInWishlist?: (productId: string) => boolean
  onToggleCompare?: (product: Product) => void
  isProductInCompare?: (productId: string) => boolean
}

const TrendingProductStrip: React.FC<TrendingProductStripProps> = ({
  title,
  products,
  onProductQuickView,
  onProductQuickShop,
  onProductCardClick,
  onToggleWishlist,
  isProductInWishlist,
  onToggleCompare,
  isProductInCompare,
}) => {
  const swiperRef = useRef<any>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)

  if (!products || products.length === 0) return null

  const uniqueId = `trending-strip-${title.toLowerCase().replace(/\s+/g, "-")}`

  const handleViewMore = () => {
    setIsExpanded(true)
    setAutoplayEnabled(false)
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop()
    }
  }

  const handleViewLess = () => {
    setIsExpanded(false)
    setAutoplayEnabled(true)
    if (swiperRef.current) {
      swiperRef.current.autoplay.start()
    }
  }

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden px-10 sm:px-10 md:px-10 lg:px-16">
      <div className="absolute top-8 right-8 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300">
          <path d="M50 0 L60 35 L100 35 L72 57 L82 92 L50 70 L18 92 L28 57 L0 35 L40 35 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-12 left-8 w-16 h-16 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-orange-300">
          <circle cx="50" cy="50" r="20" fill="currentColor" />
          <path
            d="M50 10 L55 40 L50 30 L45 40 Z M90 50 L60 55 L70 50 L60 45 Z M50 90 L45 60 L50 70 L55 60 Z M10 50 L40 45 L30 50 L40 55 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-2">
          <p className="text-sm text-gray-600 mb-1">Handpicked For You</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm">Shop iconic luxe essentials for a perfect look</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
          </div>
        </div>

        {!isExpanded ? (
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={products.length > 3}
              autoplay={
                autoplayEnabled
                  ? {
                      delay: 2500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              navigation={{
                nextEl: `.${uniqueId}-next`,
                prevEl: `.${uniqueId}-prev`,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              className="pb-2"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard
                    product={product}
                    onQuickView={onProductQuickView}
                    onQuickShop={onProductQuickShop}
                    onProductCardClick={onProductCardClick}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={isProductInWishlist ? isProductInWishlist(product.id) : false}
                    onToggleCompare={onToggleCompare}
                    isCompared={isProductInCompare ? isProductInCompare(product.id) : false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={`${uniqueId}-prev absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-gray-50 rounded-full shadow-lg cursor-pointer text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="Previous products"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              className={`${uniqueId}-next absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 p-3 bg-white hover:bg-gray-50 rounded-full shadow-lg cursor-pointer text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="Next products"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
        )}

        <div className="text-center mt-8">
          {!isExpanded ? (
            <button
              onClick={handleViewMore}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              View more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleViewLess}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-100"
            >
              View less
              <svg className="w-4 h-4 ml-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default TrendingProductStrip
