

// import React, { useState, useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import type { Swiper as SwiperCore } from 'swiper/types';
// import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
// import { HeroSlide as HeroSlideType, ZainaColor } from '../types'; 

// interface HeroSliderProps {
//     slides: HeroSlideType[];
// }

// const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
//   const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [autoplayProgress, setAutoplayProgress] = useState(0);

//   const activeSlides = slides.filter(s => s.isActive).sort((a,b) => a.order - b.order);

//   const autoplayDelay = 7000; // ms
  
//   const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, ctaLink?: string) => {
//     if (ctaLink && ctaLink.startsWith('#')) {
//       e.preventDefault();
//       const targetElement = document.getElementById(ctaLink.substring(1));
//       targetElement?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     if (swiperInstance) {
//       setAutoplayProgress(0); 
//       setTimeout(() => setAutoplayProgress(1), 50); 
//     }
//   }, [activeIndex, swiperInstance]);
  
//   if (activeSlides.length === 0) {
//       return (
//         <section className="relative h-[80vh] md:h-screen w-full bg-zaina-sky-blue-light dark:bg-dark-zaina-neutral-light flex items-center justify-center">
//             <p className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary">No active slides. Please add them in the admin panel.</p>
//         </section>
//       );
//   }

//   return (
//     <section className="relative h-[80vh] md:h-screen w-full bg-zaina-sky-blue-light dark:bg-dark-zaina-neutral-light overflow-hidden group/hero" aria-label="Hero Showcase">
//       <Swiper
//         modules={[Autoplay, EffectFade, Navigation]}
//         spaceBetween={0}
//         slidesPerView={1}
//         loop={activeSlides.length > 1}
//         autoplay={{ 
//             delay: autoplayDelay, 
//             disableOnInteraction: false 
//         }}
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         navigation={{
//             nextEl: '.hero-swiper-button-next',
//             prevEl: '.hero-swiper-button-prev',
//         }}
//         onSwiper={(swiper) => setSwiperInstance(swiper)}
//         onSlideChange={(swiper) => {
//             setActiveIndex(swiper.realIndex);
//             setAutoplayProgress(0); 
//             setTimeout(() => setAutoplayProgress(1), 50); 
//         }}
//         className="h-full w-full"
//       >
//         {activeSlides.map((slide: HeroSlideType, index: number) => (
//           <SwiperSlide key={slide.id} className="relative group/slide">
//             <div className="absolute inset-0 w-full h-full">
//               <img 
//                 src={slide.imageUrl} 
//                 alt={slide.title || `ZAINA Collection Showcase Image ${index + 1}`}
//                 className="w-full h-full object-cover hero-image-animate" 
//                 loading={index === 0 ? "eager" : "lazy"}
//               />
//             </div>
            
//             {slide.modelImageUrl && (
//                  <div className="absolute inset-0 flex items-center justify-center z-5">
//                     <img 
//                         src={slide.modelImageUrl} 
//                         alt={`Model for ${slide.title}`}
//                         className="max-h-full max-w-full object-contain hero-model-animate"
//                         loading={index === 0 ? "eager" : "lazy"}
//                     />
//                  </div>
//             )}

//             {/* Slide Content Overlay */}
//             <div className={`absolute inset-0 z-10 flex flex-col justify-end items-start p-8 sm:p-12 md:p-16 lg:p-24 bg-gradient-to-t from-black/60 via-black/30 to-transparent`}>
//                 <div className="w-full max-w-2xl"> {/* Container for text content */}
//                     {slide.title && (
//                         <h2 className={`text-3xl sm:text-4xl md:text-5xl font-heading-cinzel font-bold text-zaina-white dark:text-dark-zaina-text-primary mb-3 md:mb-4 shadow-text transition-all duration-700 ease-out 
//                                      ${activeIndex === index ? 'opacity-100 translate-y-0 delay-[400ms]' : 'opacity-0 translate-y-5'}`}>
//                         {slide.title}
//                         </h2>
//                     )}
//                     {slide.caption && (
//                         <p className={`text-base sm:text-lg md:text-xl font-body-jost text-zaina-white dark:text-dark-zaina-text-primary mb-4 md:mb-6 max-w-lg shadow-text transition-all duration-700 ease-out 
//                                       ${activeIndex === index ? 'opacity-100 translate-y-0 delay-[600ms]' : 'opacity-0 translate-y-5'}`}>
//                         {slide.caption}
//                         </p>
//                     )}
//                     {slide.ctaText && slide.ctaLink && (
//                         <a
//                         href={slide.ctaLink}
//                         onClick={(e) => handleCtaClick(e, slide.ctaLink)}
//                         className={`inline-block bg-zaina-gold text-zaina-white dark:text-dark-zaina-text-primary font-body-jost font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-md 
//                                     hover:opacity-90 hover:shadow-lg transform hover:scale-105 transition-all duration-700 ease-out text-sm md:text-base
//                                     ${activeIndex === index ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-5'}`}
//                         >
//                         {slide.ctaText}
//                         </a>
//                     )}
//                      {slide.ratingText && (
//                         <p className={`mt-4 text-xs font-body-jost text-zaina-neutral-light/80 dark:text-dark-zaina-text-secondary/80 tracking-wider shadow-text transition-all duration-700 ease-out
//                                        ${activeIndex === index ? 'opacity-100 translate-y-0 delay-[1000ms]' : 'opacity-0 translate-y-5'}`}>
//                             {slide.ratingText}
//                         </p>
//                     )}
//                 </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Custom Navigation Arrows */}
//       <button 
//         className="hero-swiper-button-prev swiper-button-prev opacity-0 group-hover/hero:opacity-70 hover:!opacity-100 !left-4 md:!left-6 lg:!left-8 z-20"
//         aria-label="Previous slide"
//       ></button>
//       <button 
//         className="hero-swiper-button-next swiper-button-next opacity-0 group-hover/hero:opacity-70 hover:!opacity-100 !right-4 md:!right-6 lg:!right-8 z-20"
//         aria-label="Next slide"
//       ></button>
      
//       {/* Numbered Pagination */}
//       {activeSlides.length > 1 && (
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3 items-center p-1.5 bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-lg">
//           {activeSlides.map((slide, index) => (
//             <React.Fragment key={`nav-${slide.id}`}>
//               <button
//                 onClick={() => {
//                   swiperInstance?.slideToLoop(index);
//                   setAutoplayProgress(0); 
//                   setTimeout(() => setAutoplayProgress(1), 50);
//                 }}
//                 className={`font-body-jost text-xs md:text-sm tracking-wider py-1 px-2.5 rounded transition-all duration-300 ease-out focus:outline-none focus:ring-1 focus:ring-zaina-white/50 dark:focus:ring-dark-zaina-neutral-light/50
//                             ${activeIndex === index 
//                               ? 'text-zaina-text-primary dark:text-dark-zaina-bg-card bg-zaina-gold dark:bg-zaina-gold font-semibold scale-110' 
//                               : 'text-zaina-white/80 dark:text-dark-zaina-neutral-light/80 hover:text-zaina-white dark:hover:text-dark-zaina-neutral-light hover:bg-white/20 dark:hover:bg-dark-zaina-neutral-light/30'}`}
//                 aria-label={`Go to slide ${index + 1}: ${slide.title || `Slide ${index+1}` }`}
//                 aria-current={activeIndex === index ? "true" : "false"}
//               >
//                 {String(index + 1).padStart(2, '0')}
//               </button>
//               {index < activeSlides.length - 1 && (
//                 <span className="text-zaina-white/40 dark:text-dark-zaina-neutral-light/40 select-none text-sm">|</span>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       )}

//       {/* Autoplay Progress Bar */}
//       <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 dark:bg-black/40 z-20 overflow-hidden">
//         <div 
//           className="h-full bg-zaina-gold dark:bg-zaina-gold"
//           style={{ 
//             width: `${autoplayProgress * 100}%`,
//             transition: autoplayProgress === 0 ? 'none' : `width ${autoplayDelay / 1000}s linear`
//           }}
//         ></div>
//       </div>
      
//       <style>{`
//         .hero-image-animate {
//           animation: slowZoom 20s ease-in-out infinite alternate;
//         }
//         @keyframes slowZoom {
//           0% { transform: scale(1.0); }
//           100% { transform: scale(1.1); }
//         }
        
//         .swiper-slide-active .hero-model-animate { 
//             animation: modelFadeIn 1.5s ease-out 0.7s forwards;
//             opacity: 0;
//         }
//         @keyframes modelFadeIn {
//             from { opacity: 0; transform: scale(0.95) translateY(10px); }
//             to { opacity: 1; transform: scale(1) translateY(0); }
//         }
        
//         .shadow-text {
//             text-shadow: 0px 1px 3px rgba(0,0,0,0.5);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSlider;

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperCore } from "swiper/types"
import { Autoplay, EffectFade, Navigation } from "swiper/modules"
import type { HeroSlide as HeroSlideType } from "../types"

interface HeroSliderProps {
  slides: HeroSlideType[]
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayProgress, setAutoplayProgress] = useState(0)

  const activeSlides = slides.filter((s) => s.isActive).sort((a, b) => a.order - b.order)

  const autoplayDelay = 4000 // ms

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, ctaLink?: string) => {
    if (ctaLink && ctaLink.startsWith("#")) {
      e.preventDefault()
      const targetElement = document.getElementById(ctaLink.substring(1))
      targetElement?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (swiperInstance) {
      setAutoplayProgress(0)
      setTimeout(() => setAutoplayProgress(1), 50)
    }
  }, [activeIndex, swiperInstance])

  if (activeSlides.length === 0) {
    return (
      <section className="relative h-[80vh] md:h-screen w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No active slides. Please add them in the admin panel.</p>
      </section>
    )
  }

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden group/hero" aria-label="Hero Showcase">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={activeSlides.length > 1}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: ".hero-swiper-button-next",
          prevEl: ".hero-swiper-button-prev",
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
          setAutoplayProgress(0)
          setTimeout(() => setAutoplayProgress(1), 50)
        }}
        className="h-full w-full"
      >
        {activeSlides.map((slide: HeroSlideType, index: number) => (
          <SwiperSlide key={slide.id} className="relative group/slide">
            {slide.imageUrl ? (
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={slide.title || `Hero slide ${index + 1}`}
                  className="w-full h-full object-fit"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Add image from admin panel</p>
              </div>
            )}

            <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-8 sm:p-12 md:p-16 lg:p-24">
              <div className="w-full max-w-2xl">
                {slide.title && (
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-medium text-black mb-4 transition-all duration-700 ease-out 
                                     ${activeIndex === index ? "opacity-100 translate-y-0 delay-[200ms]" : "opacity-0 translate-y-5"}`}
                  >
                    {slide.title}
                  </h3>
                )}

                {slide.caption && (
                  <h1
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-8 md:mb-12 leading-tight transition-all duration-700 ease-out 
                                      ${activeIndex === index ? "opacity-100 translate-y-0 delay-[400ms]" : "opacity-0 translate-y-5"}`}
                  >
                    {slide.caption}
                  </h1>
                )}

                {slide.ctaText && slide.ctaLink && (
                  <a
                    href={slide.ctaLink}
                    onClick={(e) => handleCtaClick(e, slide.ctaLink)}
                    className={`inline-block bg-transparent text-black font-semibold py-4 px-8 md:py-5 md:px-12 rounded-lg border-2 border-black
                                    hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300 text-lg md:text-xl
                                    ${activeIndex === index ? "opacity-100 translate-y-0 delay-[600ms]" : "opacity-0 translate-y-5"}`}
                  >
                    {slide.ctaText}
                  </a>
                )}

                {/* Rating text */}
                {slide.ratingText && (
                  <p
                    className={`mt-6 text-sm text-black/70 tracking-wider transition-all duration-700 ease-out
                                       ${activeIndex === index ? "opacity-100 translate-y-0 delay-[800ms]" : "opacity-0 translate-y-5"}`}
                  >
                    {slide.ratingText}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="hero-swiper-button-prev swiper-button-prev opacity-0 group-hover/hero:opacity-70 hover:!opacity-100 !left-4 md:!left-6 lg:!left-8 z-20 !text-black"
        aria-label="Previous slide"
      ></button>
      <button
        className="hero-swiper-button-next swiper-button-next opacity-0 group-hover/hero:opacity-70 hover:!opacity-100 !right-4 md:!right-6 lg:!right-8 z-20 !text-black"
        aria-label="Next slide"
      ></button>

      {activeSlides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 items-center">
          {activeSlides.map((slide, index) => (
            <button
              key={`nav-${slide.id}`}
              onClick={() => {
                swiperInstance?.slideToLoop(index)
                setAutoplayProgress(0)
                setTimeout(() => setAutoplayProgress(1), 50)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ease-out focus:outline-none
                          ${activeIndex === index ? "bg-black scale-125" : "bg-black/40 hover:bg-black/60"}`}
              aria-label={`Go to slide ${index + 1}: ${slide.title || `Slide ${index + 1}`}`}
              aria-current={activeIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      )}

      <style>{`
        .hero-image-animate {
          animation: slowZoom 20s ease-in-out infinite alternate;
        }
        @keyframes slowZoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.1); }
        }
        
        .swiper-slide-active .hero-model-animate { 
            animation: modelFadeIn 1.5s ease-out 0.7s forwards;
            opacity: 0;
        }
        @keyframes modelFadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .swiper-button-prev,
        .swiper-button-next {
          color: black !important;
        }
        
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 24px !important;
          font-weight: bold;
        }
      `}</style>
    </section>
  )
}

export default HeroSlider
