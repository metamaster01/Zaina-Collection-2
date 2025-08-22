// import React, { useState } from 'react';
// import { ZAINA_BRAND_NAME } from '../constants';
// import { PageName, FooterSettings } from '../types';
// import FacebookIcon from './icons/FacebookIcon';
// import InstagramIcon from './icons/InstagramIcon';
// import TwitterIcon from './icons/TwitterIcon';

// interface FooterProps {
//   navigateToPage: (page: PageName, data?: any) => void;
//   footerSettings: FooterSettings;
// }

// const Footer: React.FC<FooterProps> = ({ navigateToPage, footerSettings }) => {
//   const [newsletterEmail, setNewsletterEmail] = useState('');
//   const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);
//   const [newsletterStatus, setNewsletterStatus] = useState<'success' | 'error' | 'idle'>('idle');

//   const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setNewsletterMessage(null);
//     setNewsletterStatus('idle');

//     if (!newsletterEmail) {
//       setNewsletterMessage('Please enter your email address.');
//       setNewsletterStatus('error');
//       return;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(newsletterEmail)) {
//       setNewsletterMessage('Please enter a valid email address.');
//       setNewsletterStatus('error');
//       return;
//     }

//     console.log('Newsletter subscription for:', newsletterEmail);
//     setNewsletterMessage('Thank you for subscribing!');
//     setNewsletterStatus('success');
//     setNewsletterEmail('');
//     setTimeout(() => {
//         setNewsletterMessage(null);
//         setNewsletterStatus('idle');
//     }, 5000);
//   };

//   const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault();
//     // A more robust router would be needed here, for now we simulate simple navigation
//     // This assumes internal links start with '/'
//     if (href.startsWith('/')) {
//         const page = href.split('/')[1] as PageName;
//         // This is a simplification; a real router would parse slugs etc.
//         const policySlug = href.includes('/policies/') ? href.split('/').pop() : null;

//         if (policySlug) {
//             // This part is tricky as policyContents is local data. In a real app, this would be fetched.
//             // We'll just navigate to a generic policy page for now.
//              navigateToPage('policy', { title: policySlug.replace('-', ' ') });
//         } else {
//             navigateToPage(page);
//         }
//     } else {
//         window.open(href, '_blank', 'noopener,noreferrer');
//     }
//   };

//   return (
//     <footer className="font-body-jost bg-zaina-footer-bg dark:bg-dark-zaina-footer-bg text-zaina-cool-white-text dark:text-dark-zaina-cool-white-text">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">

//           {/* Social and Brand Column */}
//           <div className="text-center md:text-left">
//             <h3 className="font-heading-playfair text-base font-semibold text-zaina-gold dark:text-zaina-gold uppercase tracking-wider mb-5">
//               {ZAINA_BRAND_NAME}
//             </h3>
//             <div className="flex space-x-5 justify-center md:justify-start">
//               {footerSettings.socialLinks.facebook && (
//                 <a href={footerSettings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-current hover:text-zaina-footer-link-hover dark:hover:text-dark-zaina-footer-link-hover transition-colors duration-300">
//                   <FacebookIcon className="w-6 h-6" />
//                 </a>
//               )}
//               {footerSettings.socialLinks.instagram && (
//                 <a href={footerSettings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-current hover:text-zaina-footer-link-hover dark:hover:text-dark-zaina-footer-link-hover transition-colors duration-300">
//                   <InstagramIcon className="w-6 h-6" />
//                 </a>
//               )}
//               {footerSettings.socialLinks.twitter && (
//                  <a href={footerSettings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-current hover:text-zaina-footer-link-hover dark:hover:text-dark-zaina-footer-link-hover transition-colors duration-300">
//                   <TwitterIcon className="w-6 h-6" />
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* Dynamic Columns */}
//           {footerSettings.columns.map((col) => (
//             <div key={col.id} className="text-center md:text-left">
//               <h3 className="font-heading-playfair text-base font-semibold text-zaina-gold dark:text-zaina-gold uppercase tracking-wider mb-5">
//                 {col.title}
//               </h3>
//               <ul className="space-y-2.5">
//                 {col.links.map(link => (
//                   <li key={link.id}>
//                     <a href={link.href} onClick={(e) => handleFooterLinkClick(e, link.href)} className="text-sm hover:text-zaina-footer-link-hover dark:hover:text-dark-zaina-footer-link-hover transition-all duration-300 font-medium">
//                       {link.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           {/* Newsletter Column */}
//           <div className="text-center md:text-left">
//             <h3 className="font-heading-playfair text-base font-semibold text-zaina-gold dark:text-zaina-gold uppercase tracking-wider mb-5">
//               Newsletter
//             </h3>
//              <p className="text-sm text-zaina-slate-gray-text dark:text-dark-zaina-slate-gray-text mb-4">
//               Sign up for the latest news, offers and styles
//             </p>
//             <form onSubmit={handleNewsletterSubmit} className="space-y-3">
//               <div>
//                 <input
//                   type="email"
//                   value={newsletterEmail}
//                   onChange={(e) => setNewsletterEmail(e.target.value)}
//                   placeholder="Email address"
//                   className={`w-full px-4 py-2.5 text-sm bg-zaina-input-bg-footer dark:bg-dark-zaina-input-bg-footer border border-zaina-slate-gray/30 dark:border-dark-zaina-slate-gray-text/30 rounded-md focus:ring-1 focus:ring-zaina-footer-link-hover dark:focus:ring-dark-zaina-footer-link-hover focus:border-zaina-footer-link-hover dark:focus:border-dark-zaina-footer-link-hover outline-none transition-colors text-zaina-text-primary dark:text-dark-zaina-cool-white-text placeholder-zaina-slate-gray-text/70 dark:placeholder-dark-zaina-slate-gray-text/70`}
//                   aria-label="Email address for newsletter"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-zaina-gold text-zaina-white dark:text-dark-zaina-text-primary font-semibold py-2.5 px-5 rounded-md text-sm
//                             hover:opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zaina-gold dark:focus:ring-zaina-gold focus:ring-offset-2 focus:ring-offset-zaina-footer-bg dark:focus:ring-offset-dark-zaina-footer-bg`}
//               >
//                 Subscribe
//               </button>
//             </form>
//             {newsletterMessage && (
//               <p className={`mt-3 text-xs ${newsletterStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
//                 {newsletterMessage}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="bg-zaina-footer-bg dark:bg-dark-zaina-footer-bg border-t border-zaina-text-primary/30 dark:border-dark-zaina-text-secondary/30 py-4">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p className="text-xs text-zaina-slate-gray-text dark:text-dark-zaina-slate-gray-text">
//             {footerSettings.copyrightText}
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

//Second Code
// "use client"

// import type React from "react"
// import { useState } from "react"
// import type { PageName, FooterSettings } from "../types"
// import FacebookIcon from "./icons/FacebookIcon"
// import InstagramIcon from "./icons/InstagramIcon"
// import YouTubeIcon from "./icons/YouTubeIcon"

// interface FooterProps {
//   navigateToPage: (page: PageName, data?: any) => void
//   footerSettings: FooterSettings
// }

// const Footer: React.FC<FooterProps> = ({ navigateToPage, footerSettings }) => {
//   const [newsletterEmail, setNewsletterEmail] = useState("")
//   const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null)
//   const [newsletterStatus, setNewsletterStatus] = useState<"success" | "error" | "idle">("idle")

//   const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setNewsletterMessage(null)
//     setNewsletterStatus("idle")

//     if (!newsletterEmail) {
//       setNewsletterMessage("Please enter your email address.")
//       setNewsletterStatus("error")
//       return
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(newsletterEmail)) {
//       setNewsletterMessage("Please enter a valid email address.")
//       setNewsletterStatus("error")
//       return
//     }

//     console.log("Newsletter subscription for:", newsletterEmail)
//     setNewsletterMessage("Thank you for subscribing!")
//     setNewsletterStatus("success")
//     setNewsletterEmail("")
//     setTimeout(() => {
//       setNewsletterMessage(null)
//       setNewsletterStatus("idle")
//     }, 5000)
//   }

//   const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
//     e.preventDefault()
//     // A more robust router would be needed here, for now we simulate simple navigation
//     // This assumes internal links start with '/'
//     if (href.startsWith("/")) {
//       const page = href.split("/")[1] as PageName
//       // This is a simplification; a real router would parse slugs etc.
//       const policySlug = href.includes("/policies/") ? href.split("/").pop() : null

//       if (policySlug) {
//         // This part is tricky as policyContents is local data. In a real app, this would be fetched.
//         // We'll just navigate to a generic policy page for now.
//         navigateToPage("policy", { title: policySlug.replace("-", " ") })
//       } else {
//         navigateToPage(page)
//       }
//     } else {
//       window.open(href, "_blank", "noopener,noreferrer")
//     }
//   }

//   return (
//     <footer className="font-body-jost relative overflow-hidden">
//       {/* Newsletter Section */}
//       <div className="bg-gray-100 py-12">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             <div className="text-center md:text-left">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Subscribe To Our News letter</h2>
//               <p className="text-gray-600">Sign up for the latest news, offers and styles</p>
//             </div>
//             <div className="w-full md:w-auto md:min-w-[400px]">
//               <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
//                 <input
//                   type="email"
//                   value={newsletterEmail}
//                   onChange={(e) => setNewsletterEmail(e.target.value)}
//                   placeholder="Enter email address"
//                   className="flex-1 px-6 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400 shadow-sm"
//                   aria-label="Email address for newsletter"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 whitespace-nowrap shadow-lg"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//               {newsletterMessage && (
//                 <p
//                   className={`mt-3 text-sm text-center ${newsletterStatus === "success" ? "text-green-600" : "text-red-600"}`}
//                 >
//                   {newsletterMessage}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Section */}
//       <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
//         <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none z-10">
//           <img src="/flower-left.png" alt="" className="w-full h-full object-contain" />
//         </div>
//         <div className="absolute top-1/2 right-0 w-48 h-48 pointer-events-none transform -translate-y-1/2 z-10">
//           <img src="/flower-right.png" alt="" className="w-full h-full object-contain" />
//         </div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
//             <div className="text-center md:text-left">
//               <div className="mb-8">
//                 <img src="/logo.png" alt="Zaina Collection" className="h-40 w-40 mx-auto md:mx-0" />
//               </div>
//             </div>

//             {footerSettings.columns.map((col) => (
//               <div key={col.id} className="text-center md:text-left">
//                 <h3 className="font-semibold text-white text-lg mb-6">{col.title}</h3>
//                 <ul className="space-y-3">
//                   {col.links.map((link) => (
//                     <li key={link.id}>
//                       <a
//                         href={link.href}
//                         onClick={(e) => handleFooterLinkClick(e, link.href)}
//                         className="text-blue-100 hover:text-white transition-colors duration-300"
//                       >
//                         {link.label}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-16 pt-8">
//             <p className="text-blue-100 text-sm">{footerSettings.copyrightText}</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white py-4">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center">
//             <div className="flex space-x-6">
//               {footerSettings.socialLinks.facebook && (
//                 <a
//                   href={footerSettings.socialLinks.facebook}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Facebook"
//                   className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
//                 >
//                   <FacebookIcon className="w-6 h-6" />
//                 </a>
//               )}
//               {footerSettings.socialLinks.instagram && (
//                 <a
//                   href={footerSettings.socialLinks.instagram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Instagram"
//                   className="text-pink-600 hover:text-pink-800 transition-colors duration-300"
//                 >
//                   <InstagramIcon className="w-6 h-6" />
//                 </a>
//               )}
//               {footerSettings.socialLinks.youtube && (
//                 <a
//                   href={footerSettings.socialLinks.youtube}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="YouTube"
//                   className="text-red-600 hover:text-red-800 transition-colors duration-300"
//                 >
//                   <YouTubeIcon className="w-6 h-6" />
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

"use client";

import type React from "react";
import { useState } from "react";
import type { PageName, FooterSettings } from "../types";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import YouTubeIcon from "./icons/YouTubeIcon";

interface FooterProps {
  navigateToPage: (page: PageName, data?: any) => void;
  footerSettings: FooterSettings;
}

const Footer: React.FC<FooterProps> = ({ navigateToPage, footerSettings }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(
    null
  );
  const [newsletterStatus, setNewsletterStatus] = useState<
    "success" | "error" | "idle"
  >("idle");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterMessage(null);
    setNewsletterStatus("idle");

    if (!newsletterEmail) {
      setNewsletterMessage("Please enter your email address.");
      setNewsletterStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterMessage("Please enter a valid email address.");
      setNewsletterStatus("error");
      return;
    }

    console.log("Newsletter subscription for:", newsletterEmail);
    setNewsletterMessage("Thank you for subscribing!");
    setNewsletterStatus("success");
    setNewsletterEmail("");
    setTimeout(() => {
      setNewsletterMessage(null);
      setNewsletterStatus("idle");
    }, 5000);
  };

  const handleFooterLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      const page = href.split("/")[1] as PageName;
      const policySlug = href.includes("/policies/")
        ? href.split("/").pop()
        : null;

      if (policySlug) {
        navigateToPage("policy", { title: policySlug.replace("-", " ") });
      } else {
        navigateToPage(page);
      }
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer className="font-body-jost relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Subscribe To Our Newsletter
              </h2>
              <p className="text-gray-600">
                Sign up for the latest news, offers and styles
              </p>
            </div>
            <div className="w-full md:w-auto md:min-w-[400px]">
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 px-6 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-400 shadow-sm"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 whitespace-nowrap shadow-lg"
                >
                  Subscribe
                </button>
              </form>
              {newsletterMessage && (
                <p
                  className={`mt-3 text-sm text-center ${
                    newsletterStatus === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative">
        {/* Flowers - Desktop */}
        <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none z-10 hidden md:block">
          <img
            src="/flower-left.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-1/2 right-0 w-48 h-48 pointer-events-none transform -translate-y-1/2 z-10 hidden md:block">
          <img
            src="/flower-right.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Flowers - Mobile (bottom corners only) */}
        <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none z-10 md:hidden">
          <img
            src="/flower-left.png"
            alt=""
            className="w-full h-full object-contain opacity-70"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none z-10 md:hidden">
          <img
            src="/flower-right.png"
            alt=""
            className="w-full h-full object-contain opacity-70"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1 text-center md:text-left">
              <div className="mb-8">
                <img
                  src="/logo2.png"
                  alt="Zaina Collection"
                  className="h-32 w-32 mx-auto md:mx-0 rounded-full"
                />
              </div>
            </div>

            {footerSettings.columns.map((col) => (
              <div key={col.id} className="text-center md:text-left">
                <h3 className="font-semibold text-white text-lg mb-6">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={(e) => handleFooterLinkClick(e, link.href)}
                        className="text-blue-100 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright + Social */}
          <div className="flex flex-col items-center mt-16 pt-8 border-t border-blue-500 relative z-30">
            <div className="flex space-x-6 mb-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577092958455"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-blue-200 hover:text-white transition-colors duration-300"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/zaina_collection_orginal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-pink-200 hover:text-white transition-colors duration-300"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@ZainaCollection01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-red-300 hover:text-white transition-colors duration-300"
              >
                <YouTubeIcon className="w-6 h-6" />
              </a>
            </div>

            <p className="text-blue-100 text-sm text-center relative z-30">
              {footerSettings.copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

