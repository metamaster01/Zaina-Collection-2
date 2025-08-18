
// import React, { useState, useEffect, useRef } from 'react';
// import { PageName, UserRole } from '../types';
// import ShoppingCartIcon from './icons/ShoppingCartIcon';
// import HeartIcon from './icons/HeartIcon';
// import SearchIcon from './icons/SearchIcon';
// import UserIcon from './icons/UserIcon';
// import MobileMenu from './MobileMenu';
// import MobileSearchOverlay from './MobileSearchOverlay';
// import GridIcon from './icons/GridIcon'; 
// import SunIcon from './icons/SunIcon'; 
// import MoonIcon from './icons/MoonIcon'; 
// import ChevronDownIcon from './icons/ChevronDownIcon';
// import { Product, NavLinkItem } from '../types';
// import ChevronRightIcon from './icons/ChevronRightIcon';

// interface HeaderProps {
//   navigateToPage: (page: PageName, data?: any) => void;
//   onLogout: () => void;
//   isLoggedIn: boolean;
//   userRole: UserRole;
//   cartItemCount: number;
//   wishlistItemCount: number;
//   isDarkMode: boolean; 
//   toggleDarkMode: () => void; 
//   storeName: string;
//   headerLinks: NavLinkItem[];
//   logoUrl?: string;
//   products: Product[];
// }

// // Recursive Dropdown Component for Desktop
// const DropdownMenu: React.FC<{ links: NavLinkItem[]; handleNavClick: (e: React.MouseEvent, link: NavLinkItem) => void }> = ({ links, handleNavClick }) => {
//     return (
//         <ul className="absolute left-0 top-full mt-0 w-56 bg-white dark:bg-dark-zaina-bg-card shadow-lg rounded-b-md py-2 z-50 animate-fade-in-up">
//             {links.filter(sl => sl.visible).sort((a, b) => a.order - b.order).map(subLink => (
//                 <li key={subLink.id} className="relative group/sub">
//                     <a href={subLink.href} onClick={(e) => handleNavClick(e, subLink)} className="flex items-center justify-between px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light">
//                         <span className="flex items-center gap-1.5">
//                             {subLink.iconUrl && <img src={subLink.iconUrl} alt={`${subLink.label} icon`} className="w-4 h-4" />}
//                             {subLink.label}
//                         </span>
//                         {subLink.subLinks && subLink.subLinks.length > 0 && <ChevronRightIcon className="w-4 h-4" />}
//                     </a>
//                     {/* Recursive render for fly-out menu */}
//                     {subLink.subLinks && subLink.subLinks.length > 0 && (
//                         <div className="absolute left-full -top-2 w-56 bg-white dark:bg-dark-zaina-bg-card shadow-lg rounded-md py-2 z-50 hidden group-hover/sub:block animate-fade-in-up">
//                            <DropdownMenu links={subLink.subLinks} handleNavClick={handleNavClick} />
//                         </div>
//                     )}
//                 </li>
//             ))}
//         </ul>
//     );
// };


// const Header: React.FC<HeaderProps> = ({ 
//     navigateToPage, 
//     onLogout, 
//     isLoggedIn, 
//     userRole, 
//     cartItemCount,
//     wishlistItemCount,
//     isDarkMode, 
//     toggleDarkMode,
//     storeName,
//     headerLinks,
//     logoUrl,
//     products
// }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);

//   const userDropdownRef = useRef<HTMLDivElement>(null);
//   const headerRef = useRef<HTMLElement>(null);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState<Product[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (headerRef.current) {
//         setIsScrolled(window.scrollY > headerRef.current.offsetTop + 5); 
//       } else {
//         setIsScrolled(window.scrollY > 5);
//       }
//     };
//     const handleClickOutside = (event: MouseEvent) => {
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
//         setShowUserDropdown(false);
//       }
//       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
//         setShowSuggestions(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
//   const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);

//   const iconSizeClass = "w-5 h-5"; 
//   const mobileIconSizeClass = "w-6 h-6";

//   const handleNavClick = (e: React.MouseEvent, link: NavLinkItem) => {
//     e.preventDefault();
//     setShowUserDropdown(false);
    
//     if (link.pageName) {
//         navigateToPage(link.pageName, { category: link.category });
//     } else if (link.href?.startsWith('/')) {
//         const page = link.href.split('/')[1] as PageName;
//         const data = link.href.includes('/policies/') ? { title: link.label } : null;
//         navigateToPage(page || 'home', data);
//     } else if (link.href?.startsWith('#')) {
//         const element = document.getElementById(link.href.substring(1));
//         element?.scrollIntoView({ behavior: 'smooth' });
//     } else {
//         window.open(link.href, '_blank', 'noopener,noreferrer');
//     }
//   };
  
//   const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     navigateToPage('home');
//   };

//   const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     setShowUserDropdown(false);
//     onLogout();
//   }
  
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (value.length > 1) {
//         const filteredSuggestions = products.filter(p => p.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
//         setSuggestions(filteredSuggestions);
//         setShowSuggestions(filteredSuggestions.length > 0);
//     } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//     }
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       if (searchTerm.length > 1) {
//           navigateToPage('shop', { searchTerm });
//           setSearchTerm('');
//           setShowSuggestions(false);
//       }
//   };

//   let augmentedNavLinks: NavLinkItem[] = [...headerLinks];
//   if (isLoggedIn && userRole === 'admin') {
//     if(!augmentedNavLinks.find(l => l.id === 'admin')) {
//       augmentedNavLinks.push({ id: 'admin', label: 'ADMIN PANEL', href: '#', pageName: 'adminDashboard', icon: GridIcon, type: 'link', order: 99, visible: true });
//     }
//   }

//   const visibleLinks = augmentedNavLinks
//     .filter(link => link.visible)
//     .sort((a, b) => a.order - b.order);

//   return (
//     <>
//       <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-shadow duration-300 ease-in-out">
//         <div className="bg-zaina-primary dark:bg-dark-zaina-primary text-zaina-white dark:text-dark-zaina-text-primary text-center py-1.5 px-4 text-xs sm:text-sm font-body-jost font-medium">
//           ✨ Get 10% OFF on your first order — Use code ZAINA10
//         </div>

//         <div className={`bg-zaina-white dark:bg-dark-zaina-bg-card h-[70px] md:h-[80px] hidden md:flex items-center justify-between px-6 lg:px-8 transition-shadow duration-300 ${isScrolled ? 'shadow-sm dark:shadow-md' : ''}`}>
//           <div ref={searchContainerRef} className="flex-1">
//             <div className="relative w-full max-w-xs">
//               <form onSubmit={handleSearchSubmit} role="search">
//                 <input type="search" placeholder="Search for products..." className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-transparent focus:border-zaina-primary dark:focus:border-dark-zaina-primary header-search-input text-zaina-text-primary dark:text-dark-zaina-text-primary placeholder-zaina-text-secondary dark:placeholder-dark-zaina-text-secondary font-body-inter focus:outline-none" value={searchTerm} onChange={handleSearchChange} onFocus={() => suggestions.length > 0 && setShowSuggestions(true)} />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className={`${iconSizeClass} text-zaina-text-secondary dark:text-dark-zaina-text-secondary`} /></div>
//               </form>
//                {showSuggestions && suggestions.length > 0 && (
//                 <div className="absolute top-full mt-2 w-full max-w-xs bg-zaina-white dark:bg-dark-zaina-bg-card rounded-md shadow-lg z-50 overflow-hidden border border-zaina-neutral-medium dark:border-dark-zaina-border-strong">
//                     <ul className="max-h-80 overflow-y-auto" role="listbox">
//                         {suggestions.map(product => (
//                             <li key={product.id} role="option" aria-selected="false">
//                                 <button onClick={() => { navigateToPage('productDetail', product); setShowSuggestions(false); setSearchTerm(''); }} className="w-full text-left flex items-center p-3 hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light transition-colors">
//                                     <img src={product.imageUrl} alt={product.name} className="w-10 h-12 object-cover rounded mr-3"/>
//                                     <div className="flex-grow min-w-0">
//                                         <p className="text-sm font-medium text-zaina-text-primary dark:text-dark-zaina-text-primary truncate">{product.name}</p>
//                                         <p className="text-xs text-zaina-text-secondary dark:text-dark-zaina-text-secondary">₹{product.price.toFixed(2)}</p>
//                                     </div>
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           <a href="#" onClick={handleLogoClick} className="flex-shrink-0 mx-6 hover:opacity-80 transition-opacity cursor-pointer">
//              {logoUrl ? (
//               <img src={logoUrl} alt={`${storeName} logo`} className="h-12 max-w-[200px] object-contain" />
//             ) : (
//               <span className="text-3xl lg:text-4xl font-heading-cormorant font-bold text-zaina-gold dark:text-zaina-gold">
//                 {storeName}
//               </span>
//             )}
//           </a>
//           <div className="flex-1 flex items-center justify-end space-x-4 lg:space-x-5">
//              <button onClick={toggleDarkMode} className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-gold dark:hover:text-zaina-gold transition-colors p-1.5" aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
//                 {isDarkMode ? <SunIcon className={`${iconSizeClass} text-yellow-400`} /> : <MoonIcon className={`${iconSizeClass} text-zaina-primary`} />}
//             </button>
//             <div className="relative" ref={userDropdownRef}>
//               <button onClick={() => setShowUserDropdown(!showUserDropdown)} className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary transition-colors p-1.5" aria-label="User Menu" aria-haspopup="true" aria-expanded={showUserDropdown}><UserIcon className={iconSizeClass} /></button>
//               {showUserDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-zaina-white dark:bg-dark-zaina-bg-card rounded-md shadow-lg py-1 z-50 ring-1 ring-black dark:ring-dark-zaina-border-strong ring-opacity-5">
//                   {isLoggedIn ? (<>
//                       <a href="#" onClick={(e) => {
//                           const page = userRole === 'admin' ? 'adminDashboard' : 'userDashboard';
//                           handleNavClick(e, {id: page, pageName: page, href: '#', type: 'link', label: 'Dashboard', order:0, visible:true});
//                       }} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">{userRole === 'admin' ? 'Admin Panel' : 'My Dashboard'}</a>
//                       <a href="#" onClick={(e) => handleNavClick(e, {id: 'my_orders', pageName: 'userDashboard', href: '#', type: 'link', label: 'My Orders', category: 'orders', order:0, visible:true})} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">My Orders</a>
//                       <hr className="my-1 border-zaina-neutral-medium dark:border-dark-zaina-border-strong" />
//                       <a href="#" onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">Logout</a>
//                     </>) : (
//                     <a href="#" onClick={(e) => handleNavClick(e, {id: 'auth', pageName: 'auth', href: '#', type: 'link', label: 'Login', order: 0, visible: true})} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">Login / Register</a>
//                   )}
//                 </div>
//               )}
//             </div>
//             <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('userDashboard', {section: 'wishlist'});}} className="relative text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary transition-colors p-1.5" aria-label="Wishlist"><HeartIcon className={iconSizeClass} />
//               {wishlistItemCount > 0 && <span className="absolute -top-1 -right-1.5 bg-zaina-deep-red-accent text-zaina-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">{wishlistItemCount}</span>}
//             </a>
//             <a href="#" onClick={(e) => handleNavClick(e, {id:'cart', pageName: 'cart', href: '#', type: 'link', label: 'Cart', order:0, visible: true})} className="relative text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary transition-colors p-1.5" aria-label="Shopping Cart"><ShoppingCartIcon className={iconSizeClass} />
//               {cartItemCount > 0 && <span className="absolute -top-1 -right-1.5 bg-zaina-deep-red-accent text-zaina-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">{cartItemCount}</span>}
//             </a>
//           </div>
//         </div>
        
//         <nav className="bg-zaina-white dark:bg-dark-zaina-bg-card h-[50px] hidden md:flex items-center justify-center px-6 lg:px-8 shadow-sm dark:shadow-md">
//           <ul className="flex items-center space-x-6 lg:space-x-10">
//             {visibleLinks.map(link => (
//               <li key={link.id} className="relative group h-full flex items-center">
//                 <a href={link.href} onClick={(e) => handleNavClick(e, link)} className={`relative h-full flex items-center gap-1.5 font-body-jost text-sm font-semibold tracking-wide transition-colors duration-200 
//                               ${link.isSpecial ? 'text-zaina-gold dark:text-zaina-gold hover:text-zaina-primary dark:hover:text-dark-zaina-primary' : 'text-zaina-text-primary dark:text-dark-zaina-text-primary hover:text-zaina-gold dark:hover:text-zaina-gold'}
//                               nav-link-underline`}>
//                     {link.iconUrl && <img src={link.iconUrl} alt="" className="w-5 h-5" />}
//                     {link.icon && !link.iconUrl && <link.icon className="w-4 h-4 mr-1 inline-block relative -top-px" />}
//                     {link.label}
//                     {link.tag && <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${link.tag === 'SALE' ? 'bg-red-500 text-white' : 'bg-zaina-primary text-white'}`}>{link.tag}</span>}
//                     {link.type !== 'link' && link.subLinks && link.subLinks.length > 0 && <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />}
//                 </a>

//                 {link.type === 'dropdown' && link.subLinks && link.subLinks.length > 0 && (
//                   <div className="absolute left-0 top-full mt-0 hidden group-hover:block">
//                     <DropdownMenu links={link.subLinks} handleNavClick={handleNavClick} />
//                   </div>
//                 )}
//                 {link.type === 'mega' && link.megaMenuColumns && (
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 p-6 bg-white dark:bg-dark-zaina-bg-card shadow-lg rounded-b-md z-50 animate-fade-in-up w-auto hidden group-hover:block">
//                         <div className="flex gap-8">
//                             {link.megaMenuColumns.map(column => (
//                                 <div key={column.id} className="w-48">
//                                     <h3 className="font-bold text-sm text-zaina-primary dark:text-dark-zaina-primary mb-3 px-4">{column.title}</h3>
//                                     <ul className="space-y-1">
//                                         {column.links.filter(l => l.visible).sort((a,b)=>a.order - b.order).map(colLink => (
//                                             <li key={colLink.id}>
//                                               <a href={colLink.href} onClick={(e) => handleNavClick(e, colLink)} className="flex items-center gap-1.5 px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light">
//                                                   {colLink.iconUrl && <img src={colLink.iconUrl} alt={`${colLink.label} icon`} className="w-4 h-4" />}
//                                                   <span>{colLink.label}</span>
//                                               </a>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className={`md:hidden bg-zaina-white dark:bg-dark-zaina-bg-card h-[60px] flex items-center justify-between px-4 shadow-sm dark:shadow-md ${isScrolled ? 'shadow-md dark:shadow-lg' : ''}`}>
//            <button onClick={toggleMobileSearch} className="text-zaina-text-primary dark:text-dark-zaina-text-secondary p-2" aria-label="Open search"><SearchIcon className={mobileIconSizeClass} /></button>
//            <a href="#" onClick={handleLogoClick} className="flex-shrink-0 mx-4 flex items-center justify-center">
//             {logoUrl ? (
//                 <img src={logoUrl} alt={`${storeName} logo`} className="h-9 max-w-[150px] object-contain" />
//             ) : (
//                 <span className="text-2xl font-heading-cormorant font-bold text-zaina-gold dark:text-zaina-gold">
//                     {storeName}
//                 </span>
//             )}
//            </a>
//           <button onClick={toggleMobileMenu} className="text-zaina-text-primary dark:text-dark-zaina-text-secondary p-2" aria-label="Open menu" aria-expanded={isMobileMenuOpen}>
//             <div className={`${mobileIconSizeClass} relative`}>
//                 <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : '-translate-y-1'}`}></span>
//                 <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'translate-y-[5px]'}`}></span>
//                 <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-[5px]' : 'translate-y-[11px]'}`}></span>
//             </div>
//           </button>
//         </div>
//       </header>

//       <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} navLinks={augmentedNavLinks} navigateToPage={navigateToPage} onLogout={onLogout} isLoggedIn={isLoggedIn} userRole={userRole} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
//       <MobileSearchOverlay isOpen={isMobileSearchOpen} onClose={toggleMobileSearch} navigateToPage={navigateToPage} products={products} />
      
//       <style>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.2s ease-out forwards;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Header;

"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { PageName, UserRole } from "../types"
import ShoppingCartIcon from "./icons/ShoppingCartIcon"
import HeartIcon from "./icons/HeartIcon"
import SearchIcon from "./icons/SearchIcon"
import UserIcon from "./icons/UserIcon"
import SunIcon from "./icons/SunIcon"
import MoonIcon from "./icons/MoonIcon"
import MobileMenu from "./MobileMenu"
import MobileSearchOverlay from "./MobileSearchOverlay"
import GridIcon from "./icons/GridIcon"
import ChevronDownIcon from "./icons/ChevronDownIcon"
import type { Product, NavLinkItem } from "../types"
import ChevronRightIcon from "./icons/ChevronRightIcon"

interface HeaderProps {
  navigateToPage: (page: PageName, data?: any) => void
  onLogout: () => void
  isLoggedIn: boolean
  userRole: UserRole
  cartItemCount: number
  wishlistItemCount: number
  isDarkMode: boolean
  toggleDarkMode: () => void
  storeName: string
  headerLinks: NavLinkItem[]
  logoUrl?: string
  products: Product[]
}

// Recursive Dropdown Component for Desktop
const DropdownMenu: React.FC<{
  links: NavLinkItem[]
  handleNavClick: (e: React.MouseEvent, link: NavLinkItem) => void
}> = ({ links, handleNavClick }) => {
  return (
    <ul className="absolute left-0 top-full mt-0 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-b-md py-2 z-50 animate-fade-in-up">
      {links
        .filter((sl) => sl.visible)
        .sort((a, b) => a.order - b.order)
        .map((subLink) => (
          <li key={subLink.id} className="relative group/sub">
            <a
              href={subLink.href}
              onClick={(e) => handleNavClick(e, subLink)}
              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="flex items-center gap-1.5">
                {subLink.iconUrl && (
                  <img src={subLink.iconUrl || "/placeholder.svg"} alt={`${subLink.label} icon`} className="w-4 h-4" />
                )}
                {subLink.label}
              </span>
              {subLink.subLinks && subLink.subLinks.length > 0 && <ChevronRightIcon className="w-4 h-4" />}
            </a>
            {/* Recursive render for fly-out menu */}
            {subLink.subLinks && subLink.subLinks.length > 0 && (
              <div className="absolute left-full -top-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 hidden group-hover/sub:block animate-fade-in-up">
                <DropdownMenu links={subLink.subLinks} handleNavClick={handleNavClick} />
              </div>
            )}
          </li>
        ))}
    </ul>
  )
}

const Header: React.FC<HeaderProps> = ({
  navigateToPage,
  onLogout,
  isLoggedIn,
  userRole,
  cartItemCount,
  wishlistItemCount,
  isDarkMode,
  toggleDarkMode,
  storeName,
  headerLinks,
  logoUrl,
  products,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const userDropdownRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsScrolled(window.scrollY > headerRef.current.offsetTop + 5)
      } else {
        setIsScrolled(window.scrollY > 5)
      }
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen)

  const iconSizeClass = "w-5 h-5"
  const mobileIconSizeClass = "w-6 h-6"

  const handleNavClick = (e: React.MouseEvent, link: NavLinkItem) => {
    e.preventDefault()
    setShowUserDropdown(false)

    if (link.pageName) {
      navigateToPage(link.pageName, { category: link.category })
    } else if (link.href?.startsWith("/")) {
      const page = link.href.split("/")[1] as PageName
      const data = link.href.includes("/policies/") ? { title: link.label } : null
      navigateToPage(page || "home", data)
    } else if (link.href?.startsWith("#")) {
      const element = document.getElementById(link.href.substring(1))
      element?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.open(link.href, "_blank", "noopener,noreferrer")
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigateToPage("home")
  }

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setShowUserDropdown(false)
    onLogout()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.length > 1) {
      const filteredSuggestions = products.filter((p) => p.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
      setSuggestions(filteredSuggestions)
      setShowSuggestions(filteredSuggestions.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.length > 1) {
      navigateToPage("shop", { searchTerm })
      setSearchTerm("")
      setShowSuggestions(false)
    }
  }

  const augmentedNavLinks: NavLinkItem[] = [...headerLinks]
  if (isLoggedIn && userRole === "admin") {
    if (!augmentedNavLinks.find((l) => l.id === "admin")) {
      augmentedNavLinks.push({
        id: "admin",
        label: "ADMIN PANEL",
        href: "#",
        pageName: "adminDashboard",
        icon: GridIcon,
        type: "link",
        order: 99,
        visible: true,
      })
    }
  }

  const visibleLinks = augmentedNavLinks.filter((link) => link.visible).sort((a, b) => a.order - b.order)

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-shadow duration-300 ease-in-out overflow-hidden"
      >

        <div
          className={`bg-white h-[80px] hidden md:flex items-center justify-between px-6 lg:px-8 transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}
        >
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <a
              href="#"
              onClick={handleLogoClick}
              className="flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/logo.png" alt={`${storeName} logo`} className="h-16 w-auto object-contain" />
            </a>

            {/* Navigation Menu */}
            <nav className="flex items-center space-x-6">
              {visibleLinks.map((link) => (
                <div key={link.id} className="relative group">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative flex items-center gap-1.5 font-medium text-sm tracking-wide transition-colors duration-200 py-2
                                ${link.isSpecial ? "text-orange-600 hover:text-orange-700" : "text-gray-700 hover:text-blue-600"}
                                nav-link-underline`}
                  >
                    {link.iconUrl && <img src={link.iconUrl || "/placeholder.svg"} alt="" className="w-4 h-4" />}
                    {link.icon && !link.iconUrl && <link.icon className="w-4 h-4 mr-1 inline-block relative -top-px" />}
                    {link.label}
                    {link.tag && (
                      <span
                        className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-sm ${link.tag === "SALE" ? "bg-red-500 text-white" : "bg-blue-600 text-white"}`}
                      >
                        {link.tag}
                      </span>
                    )}
                    {link.type !== "link" && link.subLinks && link.subLinks.length > 0 && (
                      <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>

                  {link.type === "dropdown" && link.subLinks && link.subLinks.length > 0 && (
                    <div className="absolute left-0 top-full mt-0 hidden group-hover:block">
                      <DropdownMenu links={link.subLinks} handleNavClick={handleNavClick} />
                    </div>
                  )}
                  {link.type === "mega" && link.megaMenuColumns && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 p-6 bg-white shadow-lg rounded-b-md z-50 animate-fade-in-up w-auto hidden group-hover:block">
                      <div className="flex gap-8">
                        {link.megaMenuColumns.map((column) => (
                          <div key={column.id} className="w-48">
                            <h3 className="font-bold text-sm text-blue-600 mb-3 px-4">{column.title}</h3>
                            <ul className="space-y-1">
                              {column.links
                                .filter((l) => l.visible)
                                .sort((a, b) => a.order - b.order)
                                .map((colLink) => (
                                  <li key={colLink.id}>
                                    <a
                                      href={colLink.href}
                                      onClick={(e) => handleNavClick(e, colLink)}
                                      className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      {colLink.iconUrl && (
                                        <img
                                          src={colLink.iconUrl || "/placeholder.svg"}
                                          alt={`${colLink.label} icon`}
                                          className="w-4 h-4"
                                        />
                                      )}
        
                                      <span>{colLink.label}</span>
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Center-Right - Search */}
          <div ref={searchContainerRef} className="flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearchSubmit} role="search">
                <input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50 text-gray-700 placeholder-gray-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className={`${iconSizeClass} text-gray-400`} />
                </div>
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200">
                  <ul className="max-h-80 overflow-y-auto" role="listbox">
                    {suggestions.map((product) => (
                      <li key={product.id} role="option" aria-selected="false">
                        <button
                          onClick={() => {
                            navigateToPage("productDetail", product)
                            setShowSuggestions(false)
                            setSearchTerm("")
                          }}
                          className="w-full text-left flex items-center p-3 hover:bg-gray-50 transition-colors"
                        >
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="w-10 h-12 object-cover rounded mr-3"
                          />
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">₹{product.price.toFixed(2)}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Night Mode and Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <SunIcon className={iconSizeClass} /> : <MoonIcon className={iconSizeClass} />}
            </button>

            <a
              href="#"
              onClick={(e) =>
                handleNavClick(e, {
                  id: "cart",
                  pageName: "cart",
                  href: "#",
                  type: "link",
                  label: "Cart",
                  order: 0,
                  visible: true,
                })
              }
              className="relative text-gray-600 hover:text-gray-900 transition-colors p-2"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className={iconSizeClass} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigateToPage("userDashboard", { section: "wishlist" })
              }}
              className="relative text-gray-600 hover:text-gray-900 transition-colors p-2"
              aria-label="Wishlist"
            >
              <HeartIcon className={iconSizeClass} />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </a>

            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                aria-label="User Menu"
                aria-haspopup="true"
                aria-expanded={showUserDropdown}
              >
                <UserIcon className={iconSizeClass} />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  {isLoggedIn ? (
                    <>
                      <a
                        href="#"
                        onClick={(e) => {
                          const page = userRole === "admin" ? "adminDashboard" : "userDashboard"
                          handleNavClick(e, {
                            id: page,
                            pageName: page,
                            href: "#",
                            type: "link",
                            label: "Dashboard",
                            order: 0,
                            visible: true,
                          })
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {userRole === "admin" ? "Admin Panel" : "My Dashboard"}
                      </a>
                      <a
                        href="#"
                        onClick={(e) =>
                          handleNavClick(e, {
                            id: "my_orders",
                            pageName: "userDashboard",
                            href: "#",
                            type: "link",
                            label: "My Orders",
                            category: "orders",
                            order: 0,
                            visible: true,
                          })
                        }
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Orders
                      </a>
                      <hr className="my-1 border-gray-200" />
                      <a
                        href="#"
                        onClick={handleLogoutClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Logout
                      </a>
                    </>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) =>
                        handleNavClick(e, {
                          id: "auth",
                          pageName: "auth",
                          href: "#",
                          type: "link",
                          label: "Login",
                          order: 0,
                          visible: true,
                        })
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Login / Register
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`md:hidden bg-white h-[60px] flex items-center justify-between px-4 shadow-sm ${isScrolled ? "shadow-md" : ""}`}
        >
          <button onClick={toggleMobileSearch} className="text-gray-600 p-2" aria-label="Open search">
            <SearchIcon className={mobileIconSizeClass} />
          </button>
          <a href="#" onClick={handleLogoClick} className="flex-shrink-0 mx-4 flex items-center justify-center">
            <img src="/logo.png" alt={`${storeName} logo`} className="h-8 w-auto object-contain" />
          </a>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 p-2"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`${mobileIconSizeClass} relative`}>
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? "rotate-45 translate-y-[5px]" : "-translate-y-1"}`}
              ></span>
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "translate-y-[5px]"}`}
              ></span>
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? "-rotate-45 translate-y-[5px]" : "translate-y-[11px]"}`}
              ></span>
            </div>
          </button>
        </div>
        <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm font-medium">
          ✨ Get 10% OFF on your first order — Use code ZAINA10
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        navLinks={augmentedNavLinks}
        navigateToPage={navigateToPage}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <MobileSearchOverlay
        isOpen={isMobileSearchOpen}
        onClose={toggleMobileSearch}
        navigateToPage={navigateToPage}
        products={products}
      />

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out forwards;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #2563eb;
          transition: width 0.3s ease;
        }
        .nav-link-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default Header
