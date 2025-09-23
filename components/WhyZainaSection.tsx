import React from 'react';
import { MEDIA_BASE_URL } from '../constants';

const WhyZainaSection: React.FC = () => {
  const artisanImageUrl = `${MEDIA_BASE_URL}/media/artisan.jpg`;

  return (
    <section
      id="why-zaina"
      className="py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left animate-on-scroll">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zaina-primary mb-2 font-['Poppins']">
              Why ZAINA
            </h2>
            <div className="h-0.5 w-16 bg-zaina-primary/50 mb-4 mx-auto md:mx-0"></div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading-cinzel font-bold text-zaina-text-primary mb-5">
              Clothing & jewellery for every day and every celebration.
            </h3>

            <p className="text-zaina-text-secondary font-['Poppins'] text-base md:text-lg leading-relaxed mb-8">
              ZAINA Collection is a modern women’s brand with a full range of clothing and jewellery—available online and in-store. 
              Thoughtful design, quality materials, and easy fits that feel good from first wear.
            </p>

            {/* Primary CTA only (custom, professional styling) */}
            <a
              href="/about"
              className="inline-block rounded-lg px-8 py-3 font-['Poppins'] font-semibold
                         bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900/10
                         hover:bg-neutral-800 hover:shadow-md transition duration-300"
            >
              Discover Our Story
            </a>
          </div>

          {/* Image */}
          <div className="md:w-1/2 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-[4/3] rounded-xl shadow-2xl overflow-hidden group">
              <img
                src="/why-zaina.png"
                alt="ZAINA—women’s clothing and jewellery crafted with care"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyZainaSection;
