// // import React, { useState, useEffect, useRef } from 'react';
// // import { PageName, UserRole } from '../types';
// // import ShoppingCartIcon from './icons/ShoppingCartIcon';
// // import HeartIcon from './icons/HeartIcon';
// // import SearchIcon from './icons/SearchIcon';
// // import UserIcon from './icons/UserIcon';
// // import MobileMenu from './MobileMenu';
// // import MobileSearchOverlay from './MobileSearchOverlay';
// // import GridIcon from './icons/GridIcon';
// // import SunIcon from './icons/SunIcon';
// // import MoonIcon from './icons/MoonIcon';
// // import ChevronDownIcon from './icons/ChevronDownIcon';
// // import { Product, NavLinkItem } from '../types';
// // import ChevronRightIcon from './icons/ChevronRightIcon';

// // interface HeaderProps {
// //   navigateToPage: (page: PageName, data?: any) => void;
// //   onLogout: () => void;
// //   isLoggedIn: boolean;
// //   userRole: UserRole;
// //   cartItemCount: number;
// //   wishlistItemCount: number;
// //   isDarkMode: boolean;
// //   toggleDarkMode: () => void;
// //   storeName: string;
// //   headerLinks: NavLinkItem[];
// //   logoUrl?: string;
// //   products: Product[];
// // }

// // // Recursive Dropdown Component for Desktop
// // const DropdownMenu: React.FC<{ links: NavLinkItem[]; handleNavClick: (e: React.MouseEvent, link: NavLinkItem) => void }> = ({ links, handleNavClick }) => {
// //     return (
// //         <ul className="absolute left-0 top-full mt-0 w-56 bg-white dark:bg-dark-zaina-bg-card shadow-lg rounded-b-md py-2 z-50 animate-fade-in-up">
// //             {links.filter(sl => sl.visible).sort((a, b) => a.order - b.order).map(subLink => (
// //                 <li key={subLink.id} className="relative group/sub">
// //                     <a href={subLink.href} onClick={(e) => handleNavClick(e, subLink)} className="flex items-center justify-between px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light">
// //                         <span className="flex items-center gap-1.5">
// //                             {subLink.iconUrl && <img src={subLink.iconUrl} alt={`${subLink.label} icon`} className="w-4 h-4" />}
// //                             {subLink.label}
// //                         </span>
// //                         {subLink.subLinks && subLink.subLinks.length > 0 && <ChevronRightIcon className="w-4 h-4" />}
// //                     </a>
// //                     {/* Recursive render for fly-out menu */}
// //                     {subLink.subLinks && subLink.subLinks.length > 0 && (
// //                         <div className="absolute left-full -top-2 w-56 bg-white dark:bg-dark-zaina-bg-card shadow-lg rounded-md py-2 z-50 hidden group-hover/sub:block animate-fade-in-up">
// //                            <DropdownMenu links={subLink.subLinks} handleNavClick={handleNavClick} />
// //                         </div>
// //                     )}
// //                 </li>
// //             ))}
// //         </ul>
// //     );
// // };

// // const Header: React.FC<HeaderProps> = ({
// //     navigateToPage,
// //     onLogout,
// //     isLoggedIn,
// //     userRole,
// //     cartItemCount,
// //     wishlistItemCount,
// //     isDarkMode,
// //     toggleDarkMode,
// //     storeName,
// //     headerLinks,
// //     logoUrl,
// //     products
// // }) => {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
// //   const [showUserDropdown, setShowUserDropdown] = useState(false);

// //   const userDropdownRef = useRef<HTMLDivElement>(null);
// //   const headerRef = useRef<HTMLElement>(null);

// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [suggestions, setSuggestions] = useState<Product[]>([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const searchContainerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (headerRef.current) {
// //         setIsScrolled(window.scrollY > headerRef.current.offsetTop + 5);
// //       } else {
// //         setIsScrolled(window.scrollY > 5);
// //       }
// //     };
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
// //         setShowUserDropdown(false);
// //       }
// //       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
// //         setShowSuggestions(false);
// //       }
// //     };

// //     window.addEventListener('scroll', handleScroll, { passive: true });
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
// //   const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);

// //   const iconSizeClass = "w-5 h-5";
// //   const mobileIconSizeClass = "w-6 h-6";

// //   const handleNavClick = (e: React.MouseEvent, link: NavLinkItem) => {
// //     e.preventDefault();
// //     setShowUserDropdown(false);

// //     if (link.pageName) {
// //         navigateToPage(link.pageName, { category: link.category });
// //     } else if (link.href?.startsWith('/')) {
// //         const page = link.href.split('/')[1] as PageName;
// //         const data = link.href.includes('/policies/') ? { title: link.label } : null;
// //         navigateToPage(page || 'home', data);
// //     } else if (link.href?.startsWith('#')) {
// //         const element = document.getElementById(link.href.substring(1));
// //         element?.scrollIntoView({ behavior: 'smooth' });
// //     } else {
// //         window.open(link.href, '_blank', 'noopener,noreferrer');
// //     }
// //   };

// //   const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
// //     e.preventDefault();
// //     navigateToPage('home');
// //   };

// //   const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
// //     e.preventDefault();
// //     setShowUserDropdown(false);
// //     onLogout();
// //   }

// //   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const value = e.target.value;
// //     setSearchTerm(value);
// //     if (value.length > 1) {
// //         const filteredSuggestions = products.filter(p => p.name.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
// //         setSuggestions(filteredSuggestions);
// //         setShowSuggestions(filteredSuggestions.length > 0);
// //     } else {
// //         setSuggestions([]);
// //         setShowSuggestions(false);
// //     }
// //   };

// //   const handleSearchSubmit = (e: React.FormEvent) => {
// //       e.preventDefault();
// //       if (searchTerm.length > 1) {
// //           navigateToPage('shop', { searchTerm });
// //           setSearchTerm('');
// //           setShowSuggestions(false);
// //       }
// //   };

// //   let augmentedNavLinks: NavLinkItem[] = [...headerLinks];
// //   if (isLoggedIn && userRole === 'admin') {
// //     if(!augmentedNavLinks.find(l => l.id === 'admin')) {
// //       augmentedNavLinks.push({ id: 'admin', label: 'ADMIN PANEL', href: '#', pageName: 'adminDashboard', icon: GridIcon, type: 'link', order: 99, visible: true });
// //     }
// //   }

// //   const visibleLinks = augmentedNavLinks
// //     .filter(link => link.visible)
// //     .sort((a, b) => a.order - b.order);

// //   return (
// //     <>
// //       <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-shadow duration-300 ease-in-out">
// //         <div className="bg-zaina-primary dark:bg-dark-zaina-primary text-zaina-white dark:text-dark-zaina-text-primary text-center py-1.5 px-4 text-xs sm:text-sm font-body-jost font-medium">
// //           ✨ Get 10% OFF on your first order — Use code ZAINA10
// //         </div>

// //         <div className={`bg-zaina-white dark:bg-dark-zaina-bg-card h-[70px] md:h-[80px] hidden md:flex items-center justify-between px-6 lg:px-8 transition-shadow duration-300 ${isScrolled ? 'shadow-sm dark:shadow-md' : ''}`}>
// //           <div ref={searchContainerRef} className="flex-1">
// //             <div className="relative w-full max-w-xs">
// //               <form onSubmit={handleSearchSubmit} role="search">
// //                 <input type="search" placeholder="Search for products..." className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-transparent focus:border-zaina-primary dark:focus:border-dark-zaina-primary header-search-input text-zaina-text-primary dark:text-dark-zaina-text-primary placeholder-zaina-text-secondary dark:placeholder-dark-zaina-text-secondary font-body-inter focus:outline-none" value={searchTerm} onChange={handleSearchChange} onFocus={() => suggestions.length > 0 && setShowSuggestions(true)} />
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className={`${iconSizeClass} text-zaina-text-secondary dark:text-dark-zaina-text-secondary`} /></div>
// //               </form>
// //                {showSuggestions && suggestions.length > 0 && (
// //                 <div className="absolute top-full mt-2 w-full max-w-xs bg-zaina-white dark:bg-dark-zaina-bg-card rounded-md shadow-lg z-50 overflow-hidden border border-zaina-neutral-medium dark:border-dark-zaina-border-strong">
// //                     <ul className="max-h-80 overflow-y-auto" role="listbox">
// //                         {suggestions.map(product => (
// //                             <li key={product.id} role="option" aria-selected="false">
// //                                 <button onClick={() => { navigateToPage('productDetail', product); setShowSuggestions(false); setSearchTerm(''); }} className="w-full text-left flex items-center p-3 hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light transition-colors">
// //                                     <img src={product.imageUrl} alt={product.name} className="w-10 h-12 object-cover rounded mr-3"/>
// //                                     <div className="flex-grow min-w-0">
// //                                         <p className="text-sm font-medium text-zaina-text-primary dark:text-dark-zaina-text-primary truncate">{product.name}</p>
// //                                         <p className="text-xs text-zaina-text-secondary dark:text-dark-zaina-text-secondary">₹{product.price.toFixed(2)}</p>
// //                                     </div>
// //                                 </button>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //           <a href="#" onClick={handleLogoClick} className="flex-shrink-0 mx-6 hover:opacity-80 transition-opacity cursor-pointer">
// //              {logoUrl ? (
// //               <img src={logoUrl} alt={`${storeName} logo`} className="h-12 max-w-[200px] object-contain" />
// //             ) : (
// //               <span className="text-3xl lg:text-4xl font-heading-cormorant font-bold text-zaina-gold dark:text-zaina-gold">
// //                 {storeName}
// //               </span>
// //             )}
// //           </a>
// //           <div className="flex-1 flex items-center justify-end space-x-4 lg:space-x-5">
// //              <button onClick={toggleDarkMode} className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-gold dark:hover:text-zaina-gold transition-colors p-1.5" aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
// //                 {isDarkMode ? <SunIcon className={`${iconSizeClass} text-yellow-400`} /> : <MoonIcon className={`${iconSizeClass} text-zaina-primary`} />}
// //             </button>
// //             <div className="relative" ref={userDropdownRef}>
// //               <button onClick={() => setShowUserDropdown(!showUserDropdown)} className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary transition-colors p-1.5" aria-label="User Menu" aria-haspopup="true" aria-expanded={showUserDropdown}><UserIcon className={iconSizeClass} /></button>
// //               {showUserDropdown && (
// //                 <div className="absolute right-0 mt-2 w-48 bg-zaina-white dark:bg-dark-zaina-bg-card rounded-md shadow-lg py-1 z-50 ring-1 ring-black dark:ring-dark-zaina-border-strong ring-opacity-5">
// //                   {isLoggedIn ? (<>
// //                       <a href="#" onClick={(e) => {
// //                           const page = userRole === 'admin' ? 'adminDashboard' : 'userDashboard';
// //                           handleNavClick(e, {id: page, pageName: page, href: '#', type: 'link', label: 'Dashboard', order:0, visible:true});
// //                       }} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">{userRole === 'admin' ? 'Admin Panel' : 'My Dashboard'}</a>
// //                       <a href="#" onClick={(e) => handleNavClick(e, {id: 'my_orders', pageName: 'userDashboard', href: '#', type: 'link', label: 'My Orders', category: 'orders', order:0, visible:true})} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">My Orders</a>
// //                       <hr className="my-1 border-zaina-neutral-medium dark:border-dark-zaina-border-strong" />
// //                       <a href="#" onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">Logout</a>
// //                     </>) : (
// //                     <a href="#" onClick={(e) => handleNavClick(e, {id: 'auth', pageName: 'auth', href: '#', type: 'link', label: 'Login', order: 0, visible: true})} className="block px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light hover:text-zaina-primary dark:hover:text-dark-zaina-primary">Login / Register</a>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //             <a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('userDashboard', {section: 'wishlist'});}} className="relative text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary transition-colors p-1.5" aria-label="Wishlist"><HeartIcon className={iconSizeClass} />
// //               {wishlistItemCount > 0 && <span className="absolute -top-1 -right-1.5 bg-zaina-deep-red-accent text-zaina-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">{wishlistItemCount}</span>}
// //             </a>
// //             <a href="#" onClick={(e) => handleNavClick(e, {id:'cart', pageName: 'cart', href: '#', type: 'link', label: 'Cart', order:0, visible: true})} className="relative text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary transition-colors p-1.5" aria-label="Shopping Cart"><ShoppingCartIcon className={iconSizeClass} />
// //               {cartItemCount > 0 && <span className="absolute -top-1 -right-1.5 bg-zaina-deep-red-accent text-zaina-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">{cartItemCount}</span>}
// //             </a>
// //           </div>
// //         </div>

// //         <nav className="bg-zaina-white dark:bg-dark-zaina-bg-card h-[50px] hidden md:flex items-center justify-center px-6 lg:px-8 shadow-sm dark:shadow-md">
// //           <ul className="flex items-center space-x-6 lg:space-x-10">
// //             {visibleLinks.map(link => (
// //               <li key={link.id} className="relative group h-full flex items-center">
// //                 <a href={link.href} onClick={(e) => handleNavClick(e, link)} className={`relative h-full flex items-center gap-1.5 font-body-jost text-sm font-semibold tracking-wide transition-colors duration-200
// //                               ${link.isSpecial ? 'text-zaina-gold dark:text-zaina-gold hover:text-zaina-primary dark:hover:text-dark-zaina-primary' : 'text-zaina-text-primary dark:text-dark-zaina-text-primary hover:text-zaina-gold dark:hover:text-zaina-gold'}
// //                               nav-link-underline`}>
// //                     {link.iconUrl && <img src={link.iconUrl} alt="" className="w-5 h-5" />}
// //                     {link.icon && !link.iconUrl && <link.icon className="w-4 h-4 mr-1 inline-block relative -top-px" />}
// //                     {link.label}
// //                     {link.tag && <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${link.tag === 'SALE' ? 'bg-red-500 text-white' : 'bg-zaina-primary text-white'}`}>{link.tag}</span>}
// //                     {link.type !== 'link' && link.subLinks && link.subLinks.length > 0 && <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />}
// //                 </a>

// //                 {link.type === 'dropdown' && link.subLinks && link.subLinks.length > 0 && (
// //                   <div className="absolute left-0 top-full mt-0 hidden group-hover:block">
// //                     <DropdownMenu links={link.subLinks} handleNavClick={handleNavClick} />
// //                   </div>
// //                 )}
// //                 {link.type === 'mega' && link.megaMenuColumns && (
// //                     <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 p-6 bg-white dark:bg-dark-zaina-bg-card shadow-lg rounded-b-md z-50 animate-fade-in-up w-auto hidden group-hover:block">
// //                         <div className="flex gap-8">
// //                             {link.megaMenuColumns.map(column => (
// //                                 <div key={column.id} className="w-48">
// //                                     <h3 className="font-bold text-sm text-zaina-primary dark:text-dark-zaina-primary mb-3 px-4">{column.title}</h3>
// //                                     <ul className="space-y-1">
// //                                         {column.links.filter(l => l.visible).sort((a,b)=>a.order - b.order).map(colLink => (
// //                                             <li key={colLink.id}>
// //                                               <a href={colLink.href} onClick={(e) => handleNavClick(e, colLink)} className="flex items-center gap-1.5 px-4 py-2 text-sm text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-sky-blue-light dark:hover:bg-dark-zaina-sky-blue-light">
// //                                                   {colLink.iconUrl && <img src={colLink.iconUrl} alt={`${colLink.label} icon`} className="w-4 h-4" />}
// //                                                   <span>{colLink.label}</span>
// //                                               </a>
// //                                             </li>
// //                                         ))}
// //                                     </ul>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 )}
// //               </li>
// //             ))}
// //           </ul>
// //         </nav>

// //         <div className={`md:hidden bg-zaina-white dark:bg-dark-zaina-bg-card h-[60px] flex items-center justify-between px-4 shadow-sm dark:shadow-md ${isScrolled ? 'shadow-md dark:shadow-lg' : ''}`}>
// //            <button onClick={toggleMobileSearch} className="text-zaina-text-primary dark:text-dark-zaina-text-secondary p-2" aria-label="Open search"><SearchIcon className={mobileIconSizeClass} /></button>
// //            <a href="#" onClick={handleLogoClick} className="flex-shrink-0 mx-4 flex items-center justify-center">
// //             {logoUrl ? (
// //                 <img src={logoUrl} alt={`${storeName} logo`} className="h-9 max-w-[150px] object-contain" />
// //             ) : (
// //                 <span className="text-2xl font-heading-cormorant font-bold text-zaina-gold dark:text-zaina-gold">
// //                     {storeName}
// //                 </span>
// //             )}
// //            </a>
// //           <button onClick={toggleMobileMenu} className="text-zaina-text-primary dark:text-dark-zaina-text-secondary p-2" aria-label="Open menu" aria-expanded={isMobileMenuOpen}>
// //             <div className={`${mobileIconSizeClass} relative`}>
// //                 <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : '-translate-y-1'}`}></span>
// //                 <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'translate-y-[5px]'}`}></span>
// //                 <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-[5px]' : 'translate-y-[11px]'}`}></span>
// //             </div>
// //           </button>
// //         </div>
// //       </header>

// //       <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} navLinks={augmentedNavLinks} navigateToPage={navigateToPage} onLogout={onLogout} isLoggedIn={isLoggedIn} userRole={userRole} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
// //       <MobileSearchOverlay isOpen={isMobileSearchOpen} onClose={toggleMobileSearch} navigateToPage={navigateToPage} products={products} />

// //       <style>{`
// //         @keyframes fade-in-up {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in-up {
// //           animation: fade-in-up 0.2s ease-out forwards;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default Header;

// "use client";

// import type React from "react";
// import { useState, useEffect, useRef } from "react";
// import type { PageName, UserRole } from "../types";
// import ShoppingCartIcon from "./icons/ShoppingCartIcon";
// import HeartIcon from "./icons/HeartIcon";
// import SearchIcon from "./icons/SearchIcon";
// import UserIcon from "./icons/UserIcon";
// import SunIcon from "./icons/SunIcon";
// import MoonIcon from "./icons/MoonIcon";
// import MobileMenu from "./MobileMenu";
// import MobileSearchOverlay from "./MobileSearchOverlay";
// import GridIcon from "./icons/GridIcon";
// import ChevronDownIcon from "./icons/ChevronDownIcon";
// import type { Product, NavLinkItem } from "../types";
// import ChevronRightIcon from "./icons/ChevronRightIcon";
// import { Category } from "../types";

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

//   categories: Category[];
//   // navigateToPage: (page: PageName, data?: any) => void;
// }

// // Recursive Dropdown Component for Desktop
// const DropdownMenu: React.FC<{
//   links: NavLinkItem[];
//   handleNavClick: (e: React.MouseEvent, link: NavLinkItem) => void;
// }> = ({ links, handleNavClick }) => {
//   return (
//     <ul className="absolute left-0 top-full mt-0 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-b-md py-2 z-50 animate-fade-in-up">
//       {links
//         .filter((sl) => sl.visible)
//         .sort((a, b) => a.order - b.order)
//         .map((subLink) => (
//           <li key={subLink.id} className="relative group/sub">
//             <a
//               href={subLink.href}
//               onClick={(e) => handleNavClick(e, subLink)}
//               className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
//             >
//               <span className="flex items-center gap-1.5">
//                 {subLink.iconUrl && (
//                   <img
//                     src={subLink.iconUrl || "/placeholder.svg"}
//                     alt={`${subLink.label} icon`}
//                     className="w-4 h-4"
//                   />
//                 )}
//                 {subLink.label}
//               </span>
//               {subLink.subLinks && subLink.subLinks.length > 0 && (
//                 <ChevronRightIcon className="w-4 h-4" />
//               )}
//             </a>
//             {/* Recursive render for fly-out menu */}
//             {subLink.subLinks && subLink.subLinks.length > 0 && (
//               <div className="absolute left-full -top-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 hidden group-hover/sub:block animate-fade-in-up">
//                 <DropdownMenu
//                   links={subLink.subLinks}
//                   handleNavClick={handleNavClick}
//                 />
//               </div>
//             )}
//           </li>
//         ))}
//     </ul>
//   );
// };

// const Header: React.FC<HeaderProps> =  ({
//   navigateToPage,
//   onLogout,
//   isLoggedIn,
//   userRole,
//   cartItemCount,
//   wishlistItemCount,
//   isDarkMode,
//   toggleDarkMode,
//   storeName,
//   headerLinks,
//   logoUrl,
//   products,
//   categories = [],
// }) => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);

//   const userDropdownRef = useRef<HTMLDivElement>(null);
//   const headerRef = useRef<HTMLElement>(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState<Product[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const searchContainerRef = useRef<HTMLDivElement>(null);

//     // const { categories, navigateToPage} = props;


//   useEffect(() => {
//     const handleScroll = () => {
//       if (headerRef.current) {
//         setIsScrolled(window.scrollY > headerRef.current.offsetTop + 5);
//       } else {
//         setIsScrolled(window.scrollY > 5);
//       }
//     };
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         userDropdownRef.current &&
//         !userDropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowUserDropdown(false);
//       }
//       if (
//         searchContainerRef.current &&
//         !searchContainerRef.current.contains(event.target as Node)
//       ) {
//         setShowSuggestions(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.removeEventListener("mousedown", handleClickOutside);
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
//       navigateToPage(link.pageName, { category: link.category });
//     } else if (link.href?.startsWith("/")) {
//       const page = link.href.split("/")[1] as PageName;
//       const data = link.href.includes("/policies/")
//         ? { title: link.label }
//         : null;
//       navigateToPage(page || "home", data);
//     } else if (link.href?.startsWith("#")) {
//       const element = document.getElementById(link.href.substring(1));
//       element?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       window.open(link.href, "_blank", "noopener,noreferrer");
//     }
//   };

//   const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     navigateToPage("home");
//   };

//   const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     setShowUserDropdown(false);
//     onLogout();
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (value.length > 1) {
//       const filteredSuggestions = products
//         .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
//         .slice(0, 5);
//       setSuggestions(filteredSuggestions);
//       setShowSuggestions(filteredSuggestions.length > 0);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.length > 1) {
//       navigateToPage("shop", { searchTerm });
//       setSearchTerm("");
//       setShowSuggestions(false);
//     }
//   };

//   const augmentedNavLinks: NavLinkItem[] = [...headerLinks];
//   if (isLoggedIn && userRole === "admin") {
//     if (!augmentedNavLinks.find((l) => l.id === "admin")) {
//       augmentedNavLinks.push({
//         id: "admin",
//         label: "ADMIN PANEL",
//         href: "#",
//         pageName: "adminDashboard",
//         icon: GridIcon,
//         type: "link",
//         order: 99,
//         visible: true,
//       });
//     }
//   }

//   const visibleLinks = augmentedNavLinks
//     .filter((link) => link.visible)
//     .sort((a, b) => a.order - b.order);


//   const PromoBar = () => (
//     <div style={{ background: "#2C4A9A", color: "#fff" }}>
//       <div style={{ maxWidth: 1240, margin: "0 auto", padding: "8px 12px", display: "flex", alignItems: "center", gap: 12 }}>
//         <div style={{ fontSize: 14, opacity: 0.95, marginRight: "auto" }}>
//           ✨ Get 10% OFF on your first order — Use code <b>ZAINA10</b>
//         </div>
//         <a
//           href="#"
//           style={{
//             background: "#fff",
//             color: "#CC0000",
//             border: "1px solid #eee",
//             borderRadius: 10,
//             padding: "8px 14px",
//             fontWeight: 700,
//             textDecoration: "none",
//           }}
//         >
//           Track Order
//         </a>
//       </div>
//     </div>
//   );

//   // --- Category Pills (below main navbar) ---
//   const CategoryPills = () => (
//     <div style={{ borderBottom: "1px solid #eee", background: "#fff" }}>
//       <div style={{ maxWidth: 1240, margin: "0 auto", padding: "10px 12px", display: "flex", gap: 10, flexWrap: "wrap" }}>
//         {categories.map((c) => (
//           <button
//             key={c.id}
//             onClick={() => navigateToPage("shop", { categorySlug: c.slug })}
//             style={{
//               background: "#fff",
//               border: "1px solid #E0E0E0",
//               borderRadius: 10,
//               padding: "10px 16px",
//               fontWeight: 700,
//               cursor: "pointer",
//             }}
//           >
//             {c.name}
//           </button>
//         ))}
//         {/* Extra pill that's not a category */}
//         <a
//           href="#"
//           style={{
//             background: "#fff",
//             border: "1px dashed #E0E0E0",
//             borderRadius: 10,
//             padding: "10px 16px",
//             fontWeight: 700,
//             textDecoration: "none",
//             display: "inline-flex",
//             alignItems: "center",
//           }}
//         >
//           Track Order
//         </a>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <header
//         ref={headerRef}
//         className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-shadow duration-300 ease-in-out overflow-hidden"
//       >
//         <div
//           className={`bg-white h-[80px] hidden md:flex items-center justify-between px-6 lg:px-8 transition-shadow duration-300 ${
//             isScrolled ? "shadow-md" : "shadow-sm"
//           }`}
//         >
//           {/* Left side - Logo and Navigation */}
//           <div className="flex items-center space-x-8">
//             {/* Logo */}
//             <a
//               href="#"
//               onClick={handleLogoClick}
//               className="flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
//             >
//               <img
//                 src="/logo.png"
//                 alt={`${storeName} logo`}
//                 className="h-16 w-auto object-contain"
//               />
//             </a>

//             {/* Navigation Menu */}
//             <nav className="flex items-center space-x-6">
//               {visibleLinks.map((link) => (
//                 <div key={link.id} className="relative group">
//                   <a
//                     href={link.href}
//                     onClick={(e) => handleNavClick(e, link)}
//                     className={`relative flex items-center gap-1.5 font-medium text-sm tracking-wide transition-colors duration-200 py-2
//                                 ${
//                                   link.isSpecial
//                                     ? "text-orange-600 hover:text-orange-700"
//                                     : "text-gray-700 hover:text-blue-600"
//                                 }
//                                 nav-link-underline`}
//                   >
//                     {link.iconUrl && (
//                       <img
//                         src={link.iconUrl || "/placeholder.svg"}
//                         alt=""
//                         className="w-4 h-4"
//                       />
//                     )}
//                     {link.icon && !link.iconUrl && (
//                       <link.icon className="w-4 h-4 mr-1 inline-block relative -top-px" />
//                     )}
//                     {link.label}
//                     {link.tag && (
//                       <span
//                         className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-sm ${
//                           link.tag === "SALE"
//                             ? "bg-red-500 text-white"
//                             : "bg-blue-600 text-white"
//                         }`}
//                       >
//                         {link.tag}
//                       </span>
//                     )}
//                     {link.type !== "link" &&
//                       link.subLinks &&
//                       link.subLinks.length > 0 && (
//                         <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
//                       )}
//                   </a>

//                   {link.type === "dropdown" &&
//                     link.subLinks &&
//                     link.subLinks.length > 0 && (
//                       <div className="absolute left-0 top-full mt-0 hidden group-hover:block">
//                         <DropdownMenu
//                           links={link.subLinks}
//                           handleNavClick={handleNavClick}
//                         />
//                       </div>
//                     )}
//                   {link.type === "mega" && link.megaMenuColumns && (
//                     <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 p-6 bg-white shadow-lg rounded-b-md z-50 animate-fade-in-up w-auto hidden group-hover:block">
//                       <div className="flex gap-8">
//                         {link.megaMenuColumns.map((column) => (
//                           <div key={column.id} className="w-48">
//                             <h3 className="font-bold text-sm text-blue-600 mb-3 px-4">
//                               {column.title}
//                             </h3>
//                             <ul className="space-y-1">
//                               {column.links
//                                 .filter((l) => l.visible)
//                                 .sort((a, b) => a.order - b.order)
//                                 .map((colLink) => (
//                                   <li key={colLink.id}>
//                                     <a
//                                       href={colLink.href}
//                                       onClick={(e) =>
//                                         handleNavClick(e, colLink)
//                                       }
//                                       className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                                     >
//                                       {colLink.iconUrl && (
//                                         <img
//                                           src={
//                                             colLink.iconUrl ||
//                                             "/placeholder.svg"
//                                           }
//                                           alt={`${colLink.label} icon`}
//                                           className="w-4 h-4"
//                                         />
//                                       )}

//                                       <span>{colLink.label}</span>
//                                     </a>
//                                   </li>
//                                 ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </nav>
//           </div>

//           {/* Center-Right - Search */}
//           <div ref={searchContainerRef} className="flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <form onSubmit={handleSearchSubmit} role="search">
//                 <input
//                   type="search"
//                   placeholder="Search for products..."
//                   className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-gray-50 text-gray-700 placeholder-gray-500"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   onFocus={() =>
//                     suggestions.length > 0 && setShowSuggestions(true)
//                   }
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <SearchIcon className={`${iconSizeClass} text-gray-400`} />
//                 </div>
//               </form>
//               {showSuggestions && suggestions.length > 0 && (
//                 <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200">
//                   <ul className="max-h-80 overflow-y-auto" role="listbox">
//                     {suggestions.map((product) => (
//                       <li key={product.id} role="option" aria-selected="false">
//                         <button
//                           onClick={() => {
//                             navigateToPage("productDetail", product);
//                             setShowSuggestions(false);
//                             setSearchTerm("");
//                           }}
//                           className="w-full text-left flex items-center p-3 hover:bg-gray-50 transition-colors"
//                         >
//                           <img
//                             src={product.imageUrl || "/placeholder.svg"}
//                             alt={product.name}
//                             className="w-10 h-12 object-cover rounded mr-3"
//                           />
//                           <div className="flex-grow min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">
//                               {product.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               ₹{product.price.toFixed(2)}
//                             </p>
//                           </div>
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right side - Night Mode and Icons */}
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={toggleDarkMode}
//               className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
//               aria-label={
//                 isDarkMode ? "Switch to light mode" : "Switch to dark mode"
//               }
//             >
//               {isDarkMode ? (
//                 <SunIcon className={iconSizeClass} />
//               ) : (
//                 <MoonIcon className={iconSizeClass} />
//               )}
//             </button>

//             <a
//               href="#"
//               onClick={(e) =>
//                 handleNavClick(e, {
//                   id: "cart",
//                   pageName: "cart",
//                   href: "#",
//                   type: "link",
//                   label: "Cart",
//                   order: 0,
//                   visible: true,
//                 })
//               }
//               className="relative text-gray-600 hover:text-gray-900 transition-colors p-2"
//               aria-label="Shopping Cart"
//             >
//               <ShoppingCartIcon className={iconSizeClass} />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </a>

//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigateToPage("userDashboard", { section: "wishlist" });
//               }}
//               className="relative text-gray-600 hover:text-gray-900 transition-colors p-2"
//               aria-label="Wishlist"
//             >
//               <HeartIcon className={iconSizeClass} />
//               {wishlistItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
//                   {wishlistItemCount}
//                 </span>
//               )}
//             </a>

//             <div className="relative" ref={userDropdownRef}>
//               <button
//                 onClick={() => setShowUserDropdown(!showUserDropdown)}
//                 className="text-gray-600 hover:text-gray-900 transition-colors p-2"
//                 aria-label="User Menu"
//                 aria-haspopup="true"
//                 aria-expanded={showUserDropdown}
//               >
//                 <UserIcon className={iconSizeClass} />
//               </button>
//               {showUserDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
//                   {isLoggedIn ? (
//                     <>
//                       <a
//                         href="#"
//                         onClick={(e) => {
//                           const page =
//                             userRole === "admin"
//                               ? "adminDashboard"
//                               : "userDashboard";
//                           handleNavClick(e, {
//                             id: page,
//                             pageName: page,
//                             href: "#",
//                             type: "link",
//                             label: "Dashboard",
//                             order: 0,
//                             visible: true,
//                           });
//                         }}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       >
//                         {userRole === "admin" ? "Admin Panel" : "My Dashboard"}
//                       </a>
//                       <a
//                         href="#"
//                         onClick={(e) =>
//                           handleNavClick(e, {
//                             id: "my_orders",
//                             pageName: "userDashboard",
//                             href: "#",
//                             type: "link",
//                             label: "My Orders",
//                             category: "orders",
//                             order: 0,
//                             visible: true,
//                           })
//                         }
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       >
//                         My Orders
//                       </a>
//                       <hr className="my-1 border-gray-200" />
//                       <a
//                         href="#"
//                         onClick={handleLogoutClick}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       >
//                         Logout
//                       </a>
//                     </>
//                   ) : (
//                     <a
//                       href="#"
//                       onClick={(e) =>
//                         handleNavClick(e, {
//                           id: "auth",
//                           pageName: "auth",
//                           href: "#",
//                           type: "link",
//                           label: "Login",
//                           order: 0,
//                           visible: true,
//                         })
//                       }
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       Login / Register
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div
//           className={`md:hidden bg-white h-[60px] flex items-center justify-between px-4 shadow-sm ${
//             isScrolled ? "shadow-md" : ""
//           }`}
//         >
//           {/* Left: Search */}
//           <button
//             onClick={toggleMobileSearch}
//             className="text-gray-600 p-2"
//             aria-label="Open search"
//           >
//             <SearchIcon className={mobileIconSizeClass} />
//           </button>

//           {/* Center: Logo */}
//           <a
//             href="#"
//             onClick={handleLogoClick}
//             className="flex-shrink-0 flex items-center justify-center"
//           >
//             <img
//               src="/logo2.png"
//               alt={`${storeName} logo`}
//               className="h-12 w-auto object-contain item-center rounded-full"
//             />
//           </a>

//           {/* Right: Cart + Hamburger */}
//           <div className="flex items-center space-x-2">
//             {/* Cart Icon */}
//             <a
//               href="#"
//               onClick={(e) =>
//                 handleNavClick(e, {
//                   id: "cart",
//                   pageName: "cart",
//                   href: "#",
//                   type: "link",
//                   label: "Cart",
//                   order: 0,
//                   visible: true,
//                 })
//               }
//               className="relative text-gray-600 hover:text-gray-900 transition-colors p-2"
//               aria-label="Shopping Cart"
//             >
//               <ShoppingCartIcon className={mobileIconSizeClass} />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </a>

//             {/* Hamburger */}
//             <button
//               onClick={toggleMobileMenu}
//               className="text-gray-600 p-2"
//               aria-label="Open menu"
//               aria-expanded={isMobileMenuOpen}
//             >
//               <div className={`${mobileIconSizeClass} relative`}>
//                 <span
//                   className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
//                     isMobileMenuOpen
//                       ? "rotate-45 translate-y-[5px]"
//                       : "-translate-y-1"
//                   }`}
//                 ></span>
//                 <span
//                   className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
//                     isMobileMenuOpen ? "opacity-0" : "translate-y-[5px]"
//                   }`}
//                 ></span>
//                 <span
//                   className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
//                     isMobileMenuOpen
//                       ? "-rotate-45 translate-y-[5px]"
//                       : "translate-y-[11px]"
//                   }`}
//                 ></span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm font-medium">
//           ✨ Get 10% OFF on your first order — Use code ZAINA10
//         </div> */}

//         <PromoBar />
//         <CategoryPills />
//       </header>

//       <MobileMenu
//         isOpen={isMobileMenuOpen}
//         onClose={toggleMobileMenu}
//         navLinks={augmentedNavLinks}
//         navigateToPage={navigateToPage}
//         onLogout={onLogout}
//         isLoggedIn={isLoggedIn}
//         userRole={userRole}
//         isDarkMode={isDarkMode}
//         toggleDarkMode={toggleDarkMode}
//       />
//       <MobileSearchOverlay
//         isOpen={isMobileSearchOpen}
//         onClose={toggleMobileSearch}
//         navigateToPage={navigateToPage}
//         products={products}
//       />

//       <style>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.2s ease-out forwards;
//         }
//         .nav-link-underline::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           width: 0;
//           height: 2px;
//           background-color: #2563eb;
//           transition: width 0.3s ease;
//         }
//         .nav-link-underline:hover::after {
//           width: 100%;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Header;


// Header.tsx
"use client";

import type React from "react";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import type { PageName, UserRole, Product, NavLinkItem, Category } from "../types";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import HeartIcon from "./icons/HeartIcon";
import SearchIcon from "./icons/SearchIcon";
import UserIcon from "./icons/UserIcon";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
import MobileMenu from "./MobileMenu";
import MobileSearchOverlay from "./MobileSearchOverlay";
import GridIcon from "./icons/GridIcon";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

type HeaderProps = {
  navigateToPage: (page: PageName, data?: any) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  userRole: UserRole;
  cartItemCount: number;
  wishlistItemCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  storeName: string;
  headerLinks: NavLinkItem[];
  logoUrl?: string;
  products: Product[];
  categories: Category[];
};

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
  categories,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search box
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Header.tsx (add near other hooks)
useLayoutEffect(() => {
  const setVar = () => {
    const h = headerRef.current?.getBoundingClientRect().height ?? 0;
    document.documentElement.style.setProperty('--header-total-height', `${h}px`);
  };
  setVar();

  // Track dynamic changes (resize / promo bar show-hide / category rail wraps)
  const ro = headerRef.current ? new ResizeObserver(setVar) : null;
  if (headerRef.current && ro) ro.observe(headerRef.current);

  window.addEventListener('resize', setVar);
  return () => {
    window.removeEventListener('resize', setVar);
    ro?.disconnect();
  };
}, []);


  // Measure header and expose CSS var so pages can pad top correctly
  useEffect(() => {
    const setVar = () => {
      if (!headerRef.current) return;
      const total = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--header-total-height", `${total}px`);
    };
    setVar();
    const r = new ResizeObserver(setVar);
    if (headerRef.current) r.observe(headerRef.current);
    window.addEventListener("scroll", () => setIsScrolled(window.scrollY > 5), { passive: true });
    return () => {
      r.disconnect();
    };
  }, []);

  // Outside clicks
  // useEffect(() => {
  //   const onDown = (e: MouseEvent) => {
  //     if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
  //       setShowUserDropdown(false);
  //     }
  //     if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
  //       setShowSuggestions(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", onDown);
  //   return () => document.removeEventListener("mousedown", onDown);
  // }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const toggleMobileSearch = () => setIsMobileSearchOpen((v) => !v);

  const handleNavClick = (e: React.MouseEvent, link: NavLinkItem) => {
    e.preventDefault();
    setShowUserDropdown(false);
    if (link.pageName) {
      navigateToPage(link.pageName, { category: link.category });
    } else if (link.href?.startsWith("/")) {
      const page = link.href.split("/")[1] as PageName;
      const data = link.href.includes("/policies/") ? { title: link.label } : null;
      navigateToPage(page || "home", data);
    } else if (link.href?.startsWith("#")) {
      const el = document.getElementById(link.href.substring(1));
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (link.href) {
      window.open(link.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateToPage("home");
  };

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowUserDropdown(false);
    onLogout();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      const filtered = products
        .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.length > 1) {
      navigateToPage("shop", { searchTerm });
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  // augment nav links for admin
  const augmentedLinks: NavLinkItem[] = (() => {
    const out = [...headerLinks];
    if (isLoggedIn && userRole === "admin" && !out.find((l) => l.id === "admin")) {
      out.push({
        id: "admin",
        label: "ADMIN PANEL",
        href: "#",
        pageName: "adminDashboard",
        icon: GridIcon,
        type: "link",
        order: 99,
        visible: true,
      });
    }
    return out.filter((l) => l.visible).sort((a, b) => a.order - b.order);
  })();

  // ---- Promo bar (no button, slimmer) ----
  const PromoBar = () => (
    <div className="bg-[#2C4A9A] text-white">
      <div className="max-w-[1240px] mx-auto px-3 py-1.5 text-[13px] sm:text-sm font-medium text-center">
        ✨ Get 10% OFF on your first order — Use code <b>ZAINA10</b>
      </div>
    </div>
  );

  // ---- Category Rail (single line, scrollable, underline on hover/active) ----
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => railRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  // “All”, specials, real categories, then Track Order (as a link)
  const railItems: { label: string; slug?: string; href?: string }[] = [
    { label: "All", slug: undefined },
    // { label: "New Arrivals", slug: "new-arrival" },
    // { label: "Best Sellers", slug: "best-sellers" },
    // { label: "Sale", slug: "sale" },
    ...categories.map((c) => ({ label: c.name, slug: c.slug })),
    { label: "Track Order", href: "#" },
  ];

  // crude active detection from URL (works with /shop and /shop/:slug)
  const isActive = (slug?: string) => {
    const url = window.location.href;
    if (!slug) return /\/shop(\/)?($|\?)/.test(url);
    return url.includes(`/shop/${slug}`);
  };

  const CategoryRail = () => (
    <div className="bg-white border-b  relative">
      <div className="max-w-[1240px] mx-auto">
        <div className="relative">
          {/* left/right nudge buttons (hidden if not needed on small screens) */}
          <button
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 rounded-md bg-white/80 border shadow hover:bg-white"
            onClick={() => scrollBy(-220)}
            aria-label="Scroll categories left"
          >
            ‹
          </button>

          <div
            ref={railRef}
            className="overflow-x-auto no-scrollbar whitespace-nowrap flex gap-6 sm:gap-8 px-8 py-3"
          >
            {railItems.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-[14px] sm:text-[15px] text-gray-700 hover:text-blue-700 transition-colors nav-link-underline"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() =>
                    item.slug
                      ? navigateToPage("shop", { categorySlug: item.slug })
                      : navigateToPage("shop")
                  }
                  className={`relative text-[14px] sm:text-[15px] transition-colors nav-link-underline ${
                    isActive(item.slug) ? "text-blue-700 font-semibold after:w-full" : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          <button
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 rounded-md bg-white/80 border shadow hover:bg-white"
            onClick={() => scrollBy(220)}
            aria-label="Scroll categories right"
          >
            ›
          </button>

          {/* right gradient hint */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col bg-white transition-shadow ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <PromoBar />

        {/* main bar (slimmer) */}
        <div className="hidden md:flex items-center justify-between h-[70px] px-6 lg:px-8">
          {/* left: logo + primary nav */}
          <div className="flex items-center gap-8">
            <a href="#" onClick={handleLogoClick} className="flex-shrink-0 hover:opacity-80">
              {logoUrl ? (
                <img src="/logo2.png" alt={`${storeName} logo`} className="h-12 w-auto object-contain" />
              ) : (
                <span className="text-3xl font-bold text-[#C2A052]">Zaina Collection</span>
              )}
            </a>

            <nav className="hidden lg:flex items-center gap-6">
              {augmentedLinks.map((link) => (
                <div key={link.id} className="relative group">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative flex items-center gap-1.5 text-[14px] font-medium nav-link-underline ${
                      link.isSpecial ? "text-orange-600 hover:text-orange-700" : "text-gray-700 hover:text-blue-700"
                    }`}
                  >
                    {link.iconUrl && <img src={link.iconUrl} alt="" className="w-4 h-4" />}
                    {link.icon && !link.iconUrl && <link.icon className="w-4 h-4 -mt-[1px]" />}
                    {link.label}
                    {link.tag && (
                      <span
                        className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                          link.tag === "SALE" ? "bg-red-500 text-white" : "bg-blue-600 text-white"
                        }`}
                      >
                        {link.tag}
                      </span>
                    )}
                    {link.type !== "link" && link.subLinks?.length ? (
                      <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    ) : null}
                  </a>

                  {/* simple dropdown */}
                  {link.type === "dropdown" && link.subLinks?.length ? (
                    <ul className="absolute left-0 top-full mt-0 w-56 bg-white shadow-lg rounded-b-md py-2 z-50 hidden group-hover:block">
                      {link.subLinks
                        .filter((sl) => sl.visible)
                        .sort((a, b) => a.order - b.order)
                        .map((sub) => (
                          <li key={sub.id} className="relative group/sub">
                            <a
                              href={sub.href}
                              onClick={(e) => handleNavClick(e, sub)}
                              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <span className="flex items-center gap-1.5">
                                {sub.iconUrl && <img src={sub.iconUrl} alt="" className="w-4 h-4" />}
                                {sub.label}
                              </span>
                              {sub.subLinks?.length ? <ChevronRightIcon className="w-4 h-4" /> : null}
                            </a>
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </nav>
          </div>

          {/* center-right: search */}
          <div ref={searchContainerRef} className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-gray-50 text-gray-700 placeholder-gray-500 outline-none"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200">
                  <ul className="max-h-80 overflow-y-auto" role="listbox">
                    {suggestions.map((product) => (
                      <li key={product.id} role="option" aria-selected="false">
                        <button
                          onClick={() => {
                            navigateToPage("productDetail", product);
                            setShowSuggestions(false);
                            setSearchTerm("");
                          }}
                          className="w-full text-left flex items-center p-3 hover:bg-gray-50 transition-colors"
                        >
                          <img src={product.imageUrl} alt={product.name} className="w-10 h-12 object-cover rounded mr-3" />
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
            </form>
          </div>

          {/* right: toggles/icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToPage("userDashboard", { section: "wishlist" });
              }}
              className="relative text-gray-600 hover:text-gray-900 p-2"
              aria-label="Wishlist"
            >
              <HeartIcon className="w-5 h-5" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToPage("cart");
              }}
              className="relative text-gray-600 hover:text-gray-900 p-2"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </a>

            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown((v) => !v)}
                className="text-gray-600 hover:text-gray-900 p-2"
                aria-label="User Menu"
                aria-haspopup="true"
                aria-expanded={showUserDropdown}
              >
                <UserIcon className="w-5 h-5" />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black/5">
                  {isLoggedIn ? (
                    <>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const page = userRole === "admin" ? "adminDashboard" : "userDashboard";
                          navigateToPage(page);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {userRole === "admin" ? "Admin Panel" : "My Dashboard"}
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToPage("userDashboard", { section: "orders" });
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Orders
                      </a>
                      <hr className="my-1" />
                      <a href="#" onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Logout
                      </a>
                    </>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToPage("auth");
                      }}
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

        {/* mobile top bar */}
        <div className="md:hidden flex items-center justify-between h-[60px] px-4 bg-white">
          <button onClick={toggleMobileSearch} className="text-gray-600 p-2" aria-label="Open search">
            <SearchIcon className="w-6 h-6" />
          </button>
          <a href="#" onClick={handleLogoClick} className="flex-shrink-0">
            <img src={logoUrl || "/logo2.png"} alt={`${storeName} logo`} className="h-10 w-auto object-contain rounded-full" />
          </a>
          <button onClick={toggleMobileMenu} className="text-gray-600 p-2" aria-label="Open menu">
            <span className="block w-6 h-[2px] bg-current mb-[6px]" />
            <span className="block w-6 h-[2px] bg-current mb-[6px]" />
            <span className="block w-6 h-[2px] bg-current" />
          </button>
        </div>

        {/* the category rail lives under both desktop & mobile bars */}
        <CategoryRail />
      </header>

      {/* overlays */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        navLinks={augmentedLinks}
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

      {/* tiny CSS for underline animation + hide scrollbars */}
      <style>{`
        .nav-link-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: #2563eb;
          transition: width .25s ease;
        }
        .nav-link-underline:hover::after {
          width: 100%;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Header;
