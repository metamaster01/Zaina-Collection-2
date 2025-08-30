

// import React from 'react';
// import { ZAINA_BRAND_NAME, MEDIA_BASE_URL } from '../../constants';
// import { ZainaColor } from '../../types';

// const AboutUsPage: React.FC = () => {
//   const founderImageUrl = `${MEDIA_BASE_URL}/media/founder.jpg`; 
//   const backgroundTextureUrl = 'https://www.transparenttextures.com/patterns/soft-wallpaper.png'; 

//   return (
//     <div 
//         className="bg-zaina-neutral-light min-h-screen py-12 md:py-16 font-body-jost"
//         style={{ backgroundImage: `url(${backgroundTextureUrl})`}}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <section className="text-center mb-16 md:mb-20">
//           <h1 className="text-4xl md:text-6xl font-heading-playfair font-bold text-zaina-text-primary mb-4">
//             About <span className="text-zaina-primary">{ZAINA_BRAND_NAME}</span>
//           </h1>
//           <p className="text-lg md:text-xl text-zaina-slate-gray max-w-3xl mx-auto leading-relaxed">
//             Born out of tradition, styled for the now — Zaina Collection brings India's elegance to the modern woman, weaving stories of heritage into every thread.
//           </p>
//         </section>

//         <section className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-20">
//           <div className="order-2 md:order-1">
//             <h2 className="text-3xl md:text-4xl font-heading-playfair font-semibold text-zaina-text-primary mb-5">
//               Our Founder's Vision
//             </h2>
//             <p className="text-zaina-slate-gray mb-4 leading-relaxed">
//               "My journey with Zaina began with a deep love for India's rich textile heritage and a desire to see its timeless beauty embraced by contemporary women globally. I envisioned a brand that wasn't just about clothing, but about identity, confidence, and the celebration of femininity."
//             </p>
//             <p className="text-zaina-slate-gray mb-4 leading-relaxed">
//               "We strive to create pieces that are not only aesthetically stunning but also tell a story of craftsmanship, quality, and sustainable practices. Zaina is for the woman who values elegance, understands artistry, and carries her heritage with pride."
//             </p>
//             <p className="font-semibold text-zaina-primary font-heading-playfair text-lg">- Aanya Sharma, Founder</p>
//           </div>
//           <div className="order-1 md:order-2">
//             <img 
//               src={founderImageUrl} 
//               alt="Aanya Sharma, Founder of Zaina Collection" 
//               className="rounded-lg shadow-xl w-full max-w-md mx-auto aspect-[4/5] object-cover" 
//             />
//           </div>
//         </section>

//         <section className="mb-16 md:mb-20">
//           <h2 className="text-3xl md:text-4xl font-heading-playfair font-semibold text-zaina-text-primary text-center mb-10">
//             Our Core Values
//           </h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//             {[
//               { title: "Artisanal Craftsmanship", description: "Celebrating traditional techniques and skilled artisans behind every creation." },
//               { title: "Timeless Elegance", description: "Designing pieces that transcend trends, offering enduring style and sophistication." },
//               { title: "Quality & Comfort", description: "Using premium fabrics and meticulous construction for luxurious feel and wearability." },
//               { title: "Empowering Women", description: "Creating fashion that instills confidence and celebrates the strength of femininity." },
//               { title: "Ethical Practices", description: "Committing to responsible sourcing and mindful production for a sustainable future." },
//               { title: "Customer Delight", description: "Ensuring every Zaina experience is as beautiful as our garments." },
//             ].map(value => (
//               <div key={value.title} className="bg-zaina-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//                 <h3 className="text-xl font-heading-cormorant font-semibold text-zaina-primary mb-2">{value.title}</h3>
//                 <p className="text-sm text-zaina-slate-gray leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>
        
//          <section className="text-center">
//             <h2 className="text-3xl md:text-4xl font-heading-playfair font-semibold text-zaina-text-primary mb-12">
//                 Our Journey
//             </h2>
//             <div className="relative max-w-2xl mx-auto before:content-[''] before:absolute before:left-1/2 before:-ml-px before:h-full before:w-0.5 before:bg-zaina-neutral-medium">
//                 <div className="mb-10 flex w-full items-center" >
//                     <div className="w-1/2 flex justify-end pr-8">
//                         <div className="bg-zaina-white p-4 rounded-lg shadow-lg text-right">
//                             <h3 className="font-semibold text-zaina-text-primary text-md">Brand Inception</h3>
//                             <p className="text-xs text-zaina-slate-gray">Zaina Collection was born with a vision.</p>
//                         </div>
//                     </div>
//                     <div className="z-10 bg-zaina-primary text-zaina-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-xl">2021</div>
//                     <div className="w-1/2"></div>
//                 </div>
//                  <div className="mb-10 flex w-full items-center">
//                     <div className="w-1/2"></div>
//                     <div className="z-10 bg-zaina-primary text-zaina-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-xl">2022</div>
//                     <div className="w-1/2 flex justify-start pl-8">
//                         <div className="bg-zaina-white p-4 rounded-lg shadow-lg text-left">
//                             <h3 className="font-semibold text-zaina-text-primary text-md">First Flagship Store</h3>
//                             <p className="text-xs text-zaina-slate-gray">Opened doors to our first customers.</p>
//                         </div>
//                     </div>
//                 </div>
//                  <div className="flex w-full items-center">
//                     <div className="w-1/2 flex justify-end pr-8">
//                         <div className="bg-zaina-white p-4 rounded-lg shadow-lg text-right">
//                             <h3 className="font-semibold text-zaina-text-primary text-md">Expanding Online</h3>
//                             <p className="text-xs text-zaina-slate-gray">Bringing Zaina to the world, digitally.</p>
//                         </div>
//                     </div>
//                     <div className="z-10 bg-zaina-primary text-zaina-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-xl">2024</div>
//                     <div className="w-1/2"></div>
//                 </div>
//             </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// export default AboutUsPage;

// "use client"

// import React from "react"
// import InstagramBanner from "../InstagramBanner"

// // NOTE: This page keeps the original logic but updates the layout/design
// // Images expected (provided by your project/assets):
// // - /images/banner-about.png
// // - /images/founder.png (primary) with fallback to /images/userfounder.png
// // - /images/about-1.png
// // - /images/about-2.png

// // If your project already provides this component, it will render.
// // Remove the import if your setup auto-registers it; path may vary in your codebase.

// function useFounderImage(srcPrimary: string, srcFallback: string) {
//   const [src, setSrc] = React.useState(srcPrimary)
//   const onError = React.useCallback(() => setSrc(srcFallback), [srcFallback])
//   return { src, onError }
// }

// export default function AboutPage() {
//   const founder = useFounderImage("/founder.png", "/images/userfounder.png")

//   return (
//     <main className="min-h-screen">
//       {/* Hero Banner */}
//       <section className="relative">
//         <img src="/banner-about.png" alt="About banner" className="h-[360px] w-full object-cover md:h-[520px]" />
//         <div className="absolute inset-0 bg-black/45" />
//         <div className="absolute inset-0 flex items-center">
//           <div className="container mx-auto px-4 md:px-8">
//             <div className="max-w-3xl text-white">
//               <h1 className="text-4xl md:text-6xl font-serif font-semibold text-balance">About Zaina collection</h1>
//               <p className="mt-4 text-base md:text-lg leading-relaxed text-white/90">
//                 Born out of tradition, styled for the now — Zaina Collection brings India&apos;s elegance to the modern
//                 woman, weaving stories of heritage into every thread.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Founder section */}
//       <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
//         <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
//               Our Founder&apos;s Vision
//             </h2>
//             <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700">
//               <p>
//                 "My journey with Zaina began with a deep love for India&apos;s rich textile heritage and a desire to see
//                 its timeless beauty embraced by contemporary women globally. I envisioned a brand that wasn&apos;t just
//                 about clothing, but about identity, confidence, and the celebration of femininity."
//               </p>
//               <p>
//                 "We strive to create pieces that are not only aesthetically stunning but also tell a story of
//                 craftsmanship, quality, and sustainable practices. Zaina is for the woman who values elegance,
//                 understands artistry, and carries her heritage with pride."
//               </p>
//               <p className="font-medium text-blue-700">— Aanya Sharma, Founder</p>
//             </div>
//           </div>

//           <div className="flex justify-center md:justify-end">
//             <img
//               src={founder.src || "/placeholder.svg"}
//               onError={founder.onError}
//               alt="Founder portrait"
//               width={499}
//               height={433}
//               className="h-auto w-full max-w-[499px] rounded-[16px] object-cover shadow-xl"
//               style={{ opacity: 1, transform: "rotate(0deg)" }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Values with supporting images */}
//       <section className="container mx-auto px-4 md:px-8 pb-8 md:pb-12">
//         <div className="grid gap-10 md:grid-cols-2 md:gap-16">
//           {/* Left images */}
//           <div className="space-y-6">
//             <img src="/about-1.png" alt="Craft detail" className="w-full rounded-2xl object-cover shadow-md" />
//             <img src="/about-2.png" alt="Jewelry detail" className="w-full rounded-2xl object-cover shadow-md" />
//           </div>

//           {/* Right values */}
//           <div>
//             <h3 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">Our Core values</h3>
//             <ul className="mt-6 divide-y divide-neutral-200">
//               {[
//                 {
//                   title: "Artisanal Craftsmanship",
//                   description: "Celebrating traditional techniques and skilled artisans behind every creation.",
//                 },
//                 {
//                   title: "Timeless Elegance",
//                   description: "Designing pieces that transcend trends, offering enduring style and sophistication.",
//                 },
//                 {
//                   title: "Quality & Comfort",
//                   description: "Using premium fabrics and meticulous construction for luxurious feel and wearability.",
//                 },
//                 {
//                   title: "Empowering Women",
//                   description: "Creating fashion that instills confidence and celebrates the strength of femininity.",
//                 },
//                 {
//                   title: "Ethical Practices",
//                   description: "Committing to responsible sourcing and mindful production for a sustainable future.",
//                 },
//                 {
//                   title: "Customer Delight",
//                   description: "Ensuring every Zaina experience is as beautiful as our garments.",
//                 },
//               ].map((v) => (
//                 <li key={v.title} className="py-4">
//                   <h4 className="text-base font-medium text-blue-700">{v.title}</h4>
//                   <p className="mt-1 text-sm text-neutral-700">{v.description}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Journey timeline */}
//       <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
//         <h3 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">Our Journey</h3>
//         <div className="mt-8 grid gap-8 md:grid-cols-3">
//           <div>
//             <div className="text-blue-700 font-medium">2021</div>
//             <div className="mt-1 text-sm font-semibold text-neutral-900">Brand Inception</div>
//             <p className="mt-1 text-sm text-neutral-700">Zaina Collection was born with a vision.</p>
//           </div>
//           <div>
//             <div className="text-blue-700 font-medium">2022</div>
//             <div className="mt-1 text-sm font-semibold text-neutral-900">First Flagship Store</div>
//             <p className="mt-1 text-sm text-neutral-700">Opened doors to our first customers.</p>
//           </div>
//           <div>
//             <div className="text-blue-700 font-medium">2024</div>
//             <div className="mt-1 text-sm font-semibold text-neutral-900">Expanding Online</div>
//             <p className="mt-1 text-sm text-neutral-700">Bringing Zaina to the world, digitally.</p>
//           </div>
//         </div>
//       </section>

//       {/* Instagram section (already exists in your project) */}
//       {/* <section className="bg-black py-12 md:py-16">
//         <div className="container mx-auto px-4 md:px-8">
  
//           <InstagramBanner />
//         </div>
//       </section> */}

//       <InstagramBanner />
//     </main>
//   )
// }

"use client"

import React from "react"
import InstagramBanner from "../InstagramBanner"

function useFounderImage(srcPrimary: string, srcFallback: string) {
  const [src, setSrc] = React.useState(srcPrimary)
  const onError = React.useCallback(() => setSrc(srcFallback), [srcFallback])
  return { src, onError }
}

export default function AboutPage() {
  const founder = useFounderImage("/founder.png", "/userfounder.png")

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative">
        <img src="/banner-about.png" alt="About banner" className="h-[360px] w-full object-cover md:h-[520px]" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-6xl font-serif font-semibold text-balance">About Zaina collection</h1>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-white/90">
                Born out of tradition, styled for the now — Zaina Collection brings India&apos;s elegance to the modern
                woman, weaving stories of heritage into every thread.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder section */}
      <section className="container mx-auto px-24 am:px-8 py-12 md:py-16 ">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
              Our Founder&apos;s Vision
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700">
              <p>
                "My journey with Zaina began with a deep love for India&apos;s rich textile heritage and a desire to see
                its timeless beauty embraced by contemporary women globally. I envisioned a brand that wasn&apos;t just
                about clothing, but about identity, confidence, and the celebration of femininity."
              </p>
              <p>
                "We strive to create pieces that are not only aesthetically stunning but also tell a story of
                craftsmanship, quality, and sustainable practices. Zaina is for the woman who values elegance,
                understands artistry, and carries her heritage with pride."
              </p>
              <p className="font-medium text-blue-700 flex items-center gap-2">
                <img
                  src="/founder-icon.png"
                  alt="Founder icon"
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full"
                />
                — Zaina, Founder
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={founder.src || "/placeholder.svg"}
              onError={founder.onError}
              alt="Founder portrait"
              width={499}
              height={433}
              className="w-[499px] h-[433px] rounded-[16px] object-cover shadow-xl"
              style={{ opacity: 1, transform: "rotate(0deg)" }}
            />
          </div>
        </div>
      </section>

      {/* Values with supporting images */}
      <section className="container mx-auto px-24 md:px-24 pb-8 md:pb-12">
        <div className="grid gap-6 md:grid-cols-2 md:gap-6">
          {/* Left images */}
          <div className="space-y-6">
            <img
              src="/about-1.png"
              alt="Craft detail"
              width={499}
              height={559}
              className="w-[499px] h-[559px] rounded-[16px] object-cover shadow-md mx-auto md:mx-0"
            />
            {/* <img
              src="/about-2.png"
              alt="Jewelry detail"
              width={399}
              height={396}
              className="w-[399px] h-[396px] rounded-[16px] object-cover shadow-md mx-auto md:mx-0"
            /> */}
          </div>

          {/* Right values */}
          <div>
            <h3 className="text-3xl md:text-3xl font-serif font-semibold text-neutral-900">Our Core values</h3>
            <ul className="mt-6 divide-y divide-neutral-200">
              {[
                {
                  title: "Artisanal Craftsmanship",
                  description: "Celebrating traditional techniques and skilled artisans behind every creation.",
                },
                {
                  title: "Timeless Elegance",
                  description: "Designing pieces that transcend trends, offering enduring style and sophistication.",
                },
                {
                  title: "Quality & Comfort",
                  description: "Using premium fabrics and meticulous construction for luxurious feel and wearability.",
                },
                {
                  title: "Empowering Women",
                  description: "Creating fashion that instills confidence and celebrates the strength of femininity.",
                },
                {
                  title: "Ethical Practices",
                  description: "Committing to responsible sourcing and mindful production for a sustainable future.",
                },
                {
                  title: "Customer Delight",
                  description: "Ensuring every Zaina experience is as beautiful as our garments.",
                },
              ].map((v) => (
                <li key={v.title} className="py-4">
                  <h4 className="text-base font-medium text-blue-700">{v.title}</h4>
                  <p className="mt-1 text-sm text-neutral-700">{v.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="container mx-auto px-24 md:px-24 py-12 md:py-16 justify-center  ">
        <h3 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 justify-center  text-center item-center">Our Journey</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-3 text-center">
          <div>
            <div className="text-blue-700 font-medium">2021</div>
            <div className="mt-1 text-sm font-semibold text-neutral-900">Brand Inception</div>
            <p className="mt-1 text-sm text-neutral-700">Zaina Collection was born with a vision.</p>
          </div>
          <div>
            <div className="text-blue-700 font-medium">2022</div>
            <div className="mt-1 text-sm font-semibold text-neutral-900">First Flagship Store</div>
            <p className="mt-1 text-sm text-neutral-700">Opened doors to our first customers.</p>
          </div>
          <div>
            <div className="text-blue-700 font-medium">2024</div>
            <div className="mt-1 text-sm font-semibold text-neutral-900">Expanding Online</div>
            <p className="mt-1 text-sm text-neutral-700">Bringing Zaina to the world, digitally.</p>
          </div>
        </div>
      </section>

      {/* Instagram section on white background as requested */}
      <InstagramBanner />
    </main>
  )
}
