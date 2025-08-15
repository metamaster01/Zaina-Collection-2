

// import React from 'react';
// import { ZainaColor } from '../types';
// import { MEDIA_BASE_URL } from '../constants';

// const InstagramBanner: React.FC = () => {
//   const backgroundImageUrl = `${MEDIA_BASE_URL}/media/instagram-banner.jpg`;

//   return (
//     <section 
//       className="py-20 md:py-32 bg-cover bg-center relative" 
//       style={{ backgroundImage: `url(${backgroundImageUrl})` }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//       <div className="container mx-auto px-4 relative z-10 text-center">
//         <h2 className="text-4xl md:text-5xl font-heading-cinzel font-bold text-zaina-white mb-4">
//           ZAINA ON INSTAGRAM
//         </h2>
//         <p className="text-xl md:text-2xl font-body-jost text-zaina-neutral-light mb-8">
//           Follow <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-zaina-secondary-pink underline">@ZainaCollection</a> to Know More
//         </p>
//         <a
//           href="https://instagram.com" target="_blank" rel="noopener noreferrer"
//           className="bg-zaina-cta-peach text-zaina-white font-body-jost font-semibold py-3 px-8 rounded-md hover:opacity-90 transition duration-300 transform hover:scale-105"
//         >
//           Follow Us
//         </a>
//       </div>
//     </section>
//   );
// };

// export default InstagramBanner;

"use client"

import type React from "react"

const InstagramBanner: React.FC = () => {
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/zaina_collection_orginal/", "_blank", "noopener,noreferrer")
  }

  return (
    <section className="bg-white py-16 px-16">
      {/* Discovery Section */}
      <div className="container mx-auto px-4 mb-16">
        {/* First Row - Discover Your New Favorites */}
        <div className="flex flex-col lg:flex-row items-center justify-center mb-16 gap-12">
          <div className="flex items-center gap-8">
            <h2 className="text-5xl lg:text-7xl font-bold text-blue-600">Discover Your</h2>
            <div className="relative">
              <div className="w-40 h-24 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
              <img
                src="/bag.png"
                alt="Decorative handbag"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-36 object-contain z-10"
              />
            </div>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-blue-600">New Favorites</h2>
        </div>

        {/* Second Row - Life by Personalized Shopping */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <h2 className="text-5xl lg:text-7xl font-bold text-blue-600">Life by Personalized Shopping</h2>
          <div className="relative">
            <div className="w-40 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            <img
              src="/girl.png"
              alt="Woman in traditional clothing"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-36 object-cover rounded-full z-10"
            />
          </div>
        </div>
      </div>

      {/* Instagram Banner Section */}
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 rounded-3xl p-8 md:p-16 overflow-hidden min-h-[300px]">
          <div className="absolute right-0 top-0 opacity-40">
            <img src="/prop.png" alt="Decorative prop" className="w-[28rem] h-110 md:w-[28rem] md:h-80 object-fill" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
                ZAINA COLLECTION ON
                <br />
                INSTAGRAM
              </h3>
              <p className="text-xl md:text-2xl text-black">Follow us @zaina_collection_original to know more</p>
            </div>

            <button
              onClick={handleInstagramClick}
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center gap-3 text-lg"
            >
              Follow us
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstagramBanner
