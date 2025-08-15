
// import React, { useState } from 'react';
// import { NavLinkItem, PageName, UserRole } from '../types'; 
// import { ZAINA_BRAND_NAME } from '../constants';
// import UserIcon from './icons/UserIcon';
// import ShoppingCartIcon from './icons/ShoppingCartIcon';
// import HeartIcon from './icons/HeartIcon';
// import GridIcon from './icons/GridIcon'; 
// import LogOutIcon from './icons/LogOutIcon';
// import SunIcon from './icons/SunIcon';
// import MoonIcon from './icons/MoonIcon';
// import ChevronDownIcon from './icons/ChevronDownIcon';

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   navLinks: NavLinkItem[]; 
//   navigateToPage: (page: PageName, data?: any) => void;
//   onLogout: () => void;
//   isLoggedIn: boolean;
//   userRole: UserRole;
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const RecursiveMobileNavLink: React.FC<{ link: NavLinkItem; handleLinkClick: (e: React.MouseEvent, page: PageName, data?: any) => void; }> = ({ link, handleLinkClick }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const hasSubLinks = link.subLinks && link.subLinks.length > 0;

//     if (!link.visible) return null;

//     const onToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
//         if (hasSubLinks) {
//             e.preventDefault();
//             setIsOpen(!isOpen);
//         } else {
//             handleLinkClick(e, (link.pageName || 'shop') as PageName, { category: link.category || link.label });
//         }
//     };
    
//     return (
//       <div>
//         <a href={link.href} onClick={onToggle} className={`flex items-center justify-between py-3 px-3 rounded-md text-base font-body-jost font-medium transition-colors duration-200 ${link.isSpecial ? `text-zaina-deep-red-accent dark:text-dark-zaina-cta-peach` : `text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70`}`}>
//           <span className="flex items-center">
//             {link.icon && <link.icon className="w-5 h-5 mr-3" />}
//             {link.label}
//           </span>
//           {hasSubLinks && <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
//         </a>
//         {isOpen && hasSubLinks && (
//           <div className="pl-4 ml-3 border-l-2 border-gray-200 dark:border-gray-600 space-y-1 mt-1">
//             {link.subLinks.map(subLink => (
//               <RecursiveMobileNavLink key={subLink.id} link={subLink} handleLinkClick={handleLinkClick} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
// };


// const MobileMenu: React.FC<MobileMenuProps> = ({ 
//     isOpen, 
//     onClose, 
//     navLinks, 
//     navigateToPage, 
//     onLogout, 
//     isLoggedIn, 
//     userRole,
//     isDarkMode,
//     toggleDarkMode
//  }) => {
//   if (!isOpen) return null;

//   const iconSize = "w-5 h-5 mr-3";

//   const handleLinkClick = (e: React.MouseEvent, page: PageName, data?: any) => {
//     e.preventDefault();
//     navigateToPage(page, data);
//     onClose(); 
//   };

//   const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     navigateToPage('home');
//     onClose();
//   };

//   const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     onLogout();
//     onClose();
//   }

//   const sortedNavLinks = navLinks.filter(l => l.visible).sort((a, b) => a.order - b.order);

//   return (
//     <div 
//       className="fixed inset-0 z-[60] md:hidden" 
//       role="dialog" 
//       aria-modal="true"
//       aria-labelledby="mobile-menu-title"
//     >
//       <div 
//         className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity duration-300 ease-in-out" 
//         onClick={onClose}
//       ></div>

//       <div className={`absolute top-0 left-0 h-full w-full max-w-xs sm:max-w-sm bg-zaina-white/95 dark:bg-dark-zaina-neutral-medium/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out transform`}
//            style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
//       >
//         <div className="flex flex-col h-full overflow-y-auto">
//           <div className={`flex items-center justify-between p-4 border-b border-zaina-neutral-medium/50 dark:border-dark-zaina-border-strong/50`}>
//             <a href="/" onClick={handleLogoClick} className={`text-xl font-heading-cormorant font-bold text-zaina-primary dark:text-dark-zaina-primary cursor-pointer`}>
//               {ZAINA_BRAND_NAME}
//             </a>
//             <button onClick={onClose} className={`text-zaina-deep-navy dark:text-dark-zaina-text-secondary p-2`} aria-label="Close menu">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//             </button>
//           </div>

//           <nav className="flex-grow px-2 py-4 space-y-1">
//             {sortedNavLinks.map(link => (
//                 <RecursiveMobileNavLink key={link.id} link={link} handleLinkClick={handleLinkClick} />
//             ))}
//           </nav>

//           <div className={`px-4 py-6 border-t border-zaina-neutral-medium/50 dark:border-dark-zaina-border-strong/50 space-y-3`}>
//             {isLoggedIn ? (
//               <>
//                 {userRole === 'user' && (
//                   <a href="#" onClick={(e) => handleLinkClick(e, 'userDashboard')} className={`flex items-center py-2.5 px-3 rounded-md text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70 dark:hover:bg-dark-zaina-border-strong hover:text-zaina-primary dark:hover:text-dark-zaina-primary font-body-jost text-base`}>
//                     <GridIcon className={`${iconSize} text-zaina-slate-gray dark:text-dark-zaina-text-secondary}`} /> My Dashboard
//                   </a>
//                 )}
//                 {userRole === 'admin' && (
//                   <a href="#" onClick={(e) => handleLinkClick(e, 'adminDashboard')} className={`flex items-center py-2.5 px-3 rounded-md text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70 dark:hover:bg-dark-zaina-border-strong hover:text-zaina-primary dark:hover:text-dark-zaina-primary font-body-jost text-base`}>
//                     <GridIcon className={`${iconSize} text-zaina-primary dark:text-dark-zaina-primary}`} /> Admin Panel
//                   </a>
//                 )}
//               </>
//             ) : (
//               <a href="#" onClick={(e) => handleLinkClick(e, 'auth')} className={`flex items-center py-2.5 px-3 rounded-md text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70 dark:hover:bg-dark-zaina-border-strong hover:text-zaina-primary dark:hover:text-dark-zaina-primary font-body-jost text-base`}>
//                 <UserIcon className={`${iconSize} text-zaina-slate-gray dark:text-dark-zaina-text-secondary}`} /> Login / Register
//               </a>
//             )}
//             <a href="#" onClick={(e) => handleLinkClick(e, 'cart')} className={`flex items-center py-2.5 px-3 rounded-md text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70 dark:hover:bg-dark-zaina-border-strong hover:text-zaina-primary dark:hover:text-dark-zaina-primary font-body-jost text-base`}>
//               <ShoppingCartIcon className={`${iconSize} text-zaina-slate-gray dark:text-dark-zaina-text-secondary}`} /> My Cart
//             </a>
//             <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('userDashboard', {section: 'wishlist'}); onClose(); }} className={`flex items-center py-2.5 px-3 rounded-md text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70 dark:hover:bg-dark-zaina-border-strong hover:text-zaina-primary dark:hover:text-dark-zaina-primary font-body-jost text-base`}>
//               <HeartIcon className={`${iconSize} text-zaina-slate-gray dark:text-dark-zaina-text-secondary}`} /> Wishlist
//             </a>
//              <button 
//                 onClick={() => { toggleDarkMode(); onClose(); }}
//                 className={`w-full flex items-center py-2.5 px-3 rounded-md text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70 dark:hover:bg-dark-zaina-border-strong hover:text-zaina-primary dark:hover:text-dark-zaina-primary font-body-jost text-base`}
//               >
//                 {isDarkMode ? <SunIcon className={`${iconSize} text-yellow-400`} /> : <MoonIcon className={`${iconSize} text-zaina-primary`} />}
//                 <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//             </button>
//             {isLoggedIn && (
//                <a href="#" onClick={handleLogoutClick} className={`flex items-center py-2.5 px-3 rounded-md text-zaina-deep-navy dark:text-dark-zaina-text-primary hover:bg-zaina-neutral-medium/70 dark:hover:bg-dark-zaina-border-strong hover:text-zaina-primary dark:hover:text-dark-zaina-primary font-body-jost text-base`}>
//                 <LogOutIcon className={`${iconSize} text-zaina-slate-gray dark:text-dark-zaina-text-secondary}`} /> Logout
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;

"use client"

import type React from "react"
import { useState } from "react"
import type { NavLinkItem, PageName, UserRole } from "../types"
import { ZAINA_BRAND_NAME } from "../constants"
import UserIcon from "./icons/UserIcon"
import ShoppingCartIcon from "./icons/ShoppingCartIcon"
import HeartIcon from "./icons/HeartIcon"
import GridIcon from "./icons/GridIcon"
import LogOutIcon from "./icons/LogOutIcon"
import SunIcon from "./icons/SunIcon"
import MoonIcon from "./icons/MoonIcon"
import ChevronDownIcon from "./icons/ChevronDownIcon"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: NavLinkItem[]
  navigateToPage: (page: PageName, data?: any) => void
  onLogout: () => void
  isLoggedIn: boolean
  userRole: UserRole
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const RecursiveMobileNavLink: React.FC<{
  link: NavLinkItem
  handleLinkClick: (e: React.MouseEvent, page: PageName, data?: any) => void
}> = ({ link, handleLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubLinks = link.subLinks && link.subLinks.length > 0

  if (!link.visible) return null

  const onToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasSubLinks) {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else {
      handleLinkClick(e, (link.pageName || "shop") as PageName, { category: link.category || link.label })
    }
  }

  return (
    <div>
      <a
        href={link.href}
        onClick={onToggle}
        className={`flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium transition-colors duration-200 ${link.isSpecial ? `text-orange-600` : `text-gray-700 hover:bg-gray-50`}`}
      >
        <span className="flex items-center">
          {link.icon && <link.icon className="w-5 h-5 mr-3 text-gray-500" />}
          {link.label}
        </span>
        {hasSubLinks && (
          <ChevronDownIcon className={`w-5 h-5 transition-transform text-gray-400 ${isOpen ? "rotate-180" : ""}`} />
        )}
      </a>
      {isOpen && hasSubLinks && (
        <div className="pl-4 ml-3 border-l-2 border-gray-100 space-y-1 mt-1">
          {link.subLinks.map((subLink) => (
            <RecursiveMobileNavLink key={subLink.id} link={subLink} handleLinkClick={handleLinkClick} />
          ))}
        </div>
      )}
    </div>
  )
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  navigateToPage,
  onLogout,
  isLoggedIn,
  userRole,
  isDarkMode,
  toggleDarkMode,
}) => {
  if (!isOpen) return null

  const iconSize = "w-5 h-5 mr-3"

  const handleLinkClick = (e: React.MouseEvent, page: PageName, data?: any) => {
    e.preventDefault()
    navigateToPage(page, data)
    onClose()
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigateToPage("home")
    onClose()
  }

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onLogout()
    onClose()
  }

  const sortedNavLinks = navLinks.filter((l) => l.visible).sort((a, b) => a.order - b.order)

  return (
    <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 ease-in-out" onClick={onClose}></div>

      <div
        className={`absolute top-0 left-0 h-full w-full max-w-xs sm:max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out transform`}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className={`flex items-center justify-between p-4 border-b border-gray-100`}>
            <a href="/" onClick={handleLogoClick} className={`cursor-pointer`}>
              <img src="/logo.png" alt={ZAINA_BRAND_NAME} className="h-8 w-auto object-contain" />
            </a>
            <button onClick={onClose} className={`text-gray-600 p-2`} aria-label="Close menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <nav className="flex-grow px-2 py-4 space-y-1">
            {sortedNavLinks.map((link) => (
              <RecursiveMobileNavLink key={link.id} link={link} handleLinkClick={handleLinkClick} />
            ))}
          </nav>

          <div className={`px-4 py-6 border-t border-gray-100 space-y-3`}>
            {isLoggedIn ? (
              <>
                {userRole === "user" && (
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "userDashboard")}
                    className={`flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-base`}
                  >
                    <GridIcon className={`${iconSize} text-gray-500`} /> My Dashboard
                  </a>
                )}
                {userRole === "admin" && (
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "adminDashboard")}
                    className={`flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-base`}
                  >
                    <GridIcon className={`${iconSize} text-blue-600`} /> Admin Panel
                  </a>
                )}
              </>
            ) : (
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, "auth")}
                className={`flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-base`}
              >
                <UserIcon className={`${iconSize} text-gray-500`} /> Login / Register
              </a>
            )}
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, "cart")}
              className={`flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-base`}
            >
              <ShoppingCartIcon className={`${iconSize} text-gray-500`} /> My Cart
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigateToPage("userDashboard", { section: "wishlist" })
                onClose()
              }}
              className={`flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-base`}
            >
              <HeartIcon className={`${iconSize} text-gray-500`} /> Wishlist
            </a>
            <button
              onClick={() => {
                toggleDarkMode()
                onClose()
              }}
              className={`w-full flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-base`}
            >
              {isDarkMode ? (
                <SunIcon className={`${iconSize} text-yellow-500`} />
              ) : (
                <MoonIcon className={`${iconSize} text-blue-600`} />
              )}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            {isLoggedIn && (
              <a
                href="#"
                onClick={handleLogoutClick}
                className={`flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-base`}
              >
                <LogOutIcon className={`${iconSize} text-gray-500`} /> Logout
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu

