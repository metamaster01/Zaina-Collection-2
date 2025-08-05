
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface TrendingProductStripProps {
  title: string;
  products: Product[];
  onProductQuickView: (product: Product) => void;
  onProductQuickShop: (product: Product) => void;
  onProductCardClick?: (product: Product) => void; 
  onToggleWishlist?: (product: Product) => void;
  isProductInWishlist?: (productId: string) => boolean;
  onToggleCompare?: (product: Product) => void;
  isProductInCompare?: (productId: string) => boolean;
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
  const swiperRef = useRef<any>(null); 

  if (!products || products.length === 0) return null;

  const uniqueId = `trending-strip-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section 
      className="py-10 md:py-12 bg-zaina-sky-blue-light dark:bg-dark-zaina-sky-blue-light group/strip" 
      id="trending-strip"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading-cinzel font-bold text-center text-zaina-text-primary dark:text-dark-zaina-text-primary mb-8 md:mb-10">
          {title}
        </h2>
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            loop={products.length > 5} 
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            navigation={{
              nextEl: `.${uniqueId}-next`,
              prevEl: `.${uniqueId}-prev`,
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 25 },
              1024: { slidesPerView: 5, spaceBetween: 30 },
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
                  compact
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button 
            className={`${uniqueId}-prev absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10 p-2.5 bg-zaina-white/80 dark:bg-dark-zaina-bg-card/80 hover:bg-zaina-white dark:hover:bg-dark-zaina-bg-card rounded-full shadow-lg cursor-pointer text-zaina-primary dark:text-dark-zaina-primary opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-zaina-primary dark:focus:ring-dark-zaina-primary`} 
            aria-label="Previous trending products"
            onClick={() => swiperRef.current?.slidePrev()}
          >
              <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button 
            className={`${uniqueId}-next absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10 p-2.5 bg-zaina-white/80 dark:bg-dark-zaina-bg-card/80 hover:bg-zaina-white dark:hover:bg-dark-zaina-bg-card rounded-full shadow-lg cursor-pointer text-zaina-primary dark:text-dark-zaina-primary opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-zaina-primary dark:focus:ring-dark-zaina-primary`} 
            aria-label="Next trending products"
            onClick={() => swiperRef.current?.slideNext()}
          >
              <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProductStrip;