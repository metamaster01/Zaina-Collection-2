// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { Product, Testimonial, NavLinkItem, PageName, ProductVariant } from '../../types';
// import RatingStars from '../RatingStars';
// import TrustBadge from '../shared/TrustBadge';
// import FacebookIcon from '../icons/FacebookIcon';
// import InstagramIcon from '../icons/InstagramIcon';
// import TwitterIcon from '../icons/TwitterIcon';
// import ShieldIcon from '../icons/ShieldIcon';
// import TruckIcon from '../icons/TruckIcon';
// import ExchangeIcon from '../icons/ExchangeIcon';
// import MiniProductCarousel from '../MiniProductCarousel';
// import RecentlyViewedProducts from '../RecentlyViewedProducts';
// import InputField from '../shared/InputField';
// import QuoteIcon from '../icons/QuoteIcon';
// import StarIcon from '../icons/StarIcon';
// import { policyContents } from './pageData';
// import FloatingAddToCartBar from '../FloatingAddToCartBar';
// import Modal from '../shared/Modal';
// import ChevronRightIcon from '../icons/ChevronRightIcon';
// import Accordion from '../shared/Accordion';
// import Accordion from '../shared/Accordion';
// import { sanitizeHTML } from '../utils/sanitizer';

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// interface ProductDetailPageProps {
//   product: Product;
//   allProducts: Product[];
//   onAddToCart: (product: Product, quantity: number, selectedVariant: ProductVariant) => void;
//   onNavigateToPage: (page: PageName, data?: any) => void;
//   onProductQuickView: (product: Product) => void;
//   onProductQuickShop: (product: Product) => void;
//   isLoggedIn: boolean;
//   onDirectBuyNow: (product: Product, quantity: number, selectedVariant: ProductVariant) => void;
//   onToggleWishlist: (product: Product) => void;
//   isWishlisted: boolean;
//   isProductInWishlist: (productId: string) => boolean;
//   recentlyViewedProducts: Product[];
//   onToggleCompare: (product: Product) => void;
//   isProductInCompare: (productId: string) => boolean;
// }

// export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
//   product,
//   allProducts,
//   onAddToCart,
//   onNavigateToPage,
//   onProductQuickView,
//   onProductQuickShop,
//   isLoggedIn,
//   onDirectBuyNow,
//   onToggleWishlist,
//   isWishlisted,
//   isProductInWishlist,
//   recentlyViewedProducts,
//   onToggleCompare,
//   isProductInCompare
// }) => {
//   const [selectedColor, setSelectedColor] = useState<string | undefined>(product.variants?.[0]?.attributes['Color']);
//   const [selectedSize, setSelectedSize] = useState<string | undefined>(product.variants?.[0]?.attributes['Size']);
//   const [currentVariant, setCurrentVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);

//   const [quantity, setQuantity] = useState(1);
//   const [pincode, setPincode] = useState('');
//   const [pincodeStatus, setPincodeStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

//   const [activeImageUrl, setActiveImageUrl] = useState<string>(product.variants?.[0]?.imageUrl || product.imageUrl);

//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [reviewName, setReviewName] = useState('');
//   const [reviewRating, setReviewRating] = useState(0);
//   const [reviewText, setReviewText] = useState('');
//   const [reviewSubmissionStatus, setReviewSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
//   const [reviewSubmissionMessage, setReviewSubmissionMessage] = useState('');

//   const [activeInfoTab, setActiveInfoTab] = useState('shipping');
//   const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);

//   const [showFloatingBar, setShowFloatingBar] = useState(false);
//   const [isFloatingBarDismissed, setIsFloatingBarDismissed] = useState(false);
//   const mainProductActionsRef = useRef<HTMLDivElement>(null);

//   const [isProcessing, setIsProcessing] = useState(false);

//   const availableColors = useMemo(() => {
//     return [...new Set(product.variants?.map(v => v.attributes['Color']) || [])];
//   }, [product.variants]);

//   const availableSizesForSelectedColor = useMemo(() => {
//     return [...new Set(product.variants?.filter(v => v.attributes['Color'] === selectedColor).map(v => v.attributes['Size']) || [])];
//   }, [product.variants, selectedColor]);

//   useEffect(() => {
//       const defaultVariant = product.variants?.[0];
//       setSelectedColor(defaultVariant?.attributes['Color']);
//       setSelectedSize(defaultVariant?.attributes['Size']);
//       setCurrentVariant(defaultVariant);
//       setActiveImageUrl(defaultVariant?.imageUrl || product.imageUrl);
//   }, [product]);

//   useEffect(() => {
//     if (product && selectedColor && selectedSize) {
//         const variant = product.variants?.find(v => v.attributes['Color'] === selectedColor && v.attributes['Size'] === selectedSize);
//         setCurrentVariant(variant);
//         if (variant?.imageUrl) {
//             setActiveImageUrl(variant.imageUrl);
//         }
//     } else {
//         setCurrentVariant(undefined);
//         const firstVariantOfColor = product.variants?.find(v => v.attributes['Color'] === selectedColor && v.imageUrl);
//         setActiveImageUrl(firstVariantOfColor?.imageUrl || product.imageUrl);
//     }
//   }, [selectedColor, selectedSize, product.variants, product.imageUrl]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (mainProductActionsRef.current) {
//         const rect = mainProductActionsRef.current.getBoundingClientRect();
//         const threshold = window.innerHeight * 0.1;
//         if (rect.bottom < threshold) {
//           setShowFloatingBar(true);
//         } else {
//           setShowFloatingBar(false);
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [product]);

//   const handleFloatingBarClose = () => {
//     setIsFloatingBarDismissed(true);
//   };

//   const handleQuantityChange = (newQuantity: number) => {
//     setQuantity(Math.max(1, newQuantity));
//   };

//   const handleSizeSelect = (size: string) => {
//     setSelectedSize(size);
//   };

//   const handleAddToCartClick = () => {
//     if (!currentVariant) {
//       alert("Please select a color and size.");
//       return;
//     }

//     if (currentVariant.stockQuantity > 0) {
//         onAddToCart(product, quantity, currentVariant);
//     } else {
//         alert("This variant is out of stock.");
//     }
//   };

//   const handleFloatingBarAddToCart = () => {
//     if (!currentVariant) {
//         alert("Please select a size from the floating bar.");
//         return;
//     };
//     onAddToCart(product, quantity, currentVariant);
//     alert(`Added ${product.name} (${currentVariant.attributes['Color']}, ${currentVariant.attributes['Size']}) from sticky bar!`);
//   };

//   const handleBuyNowClick = () => {
//     if (!currentVariant) return;
//     setIsProcessing(true);
//     onDirectBuyNow(product, quantity, currentVariant);
//   };

//   const handlePincodeCheck = () => {
//     if (!pincode || pincode.length < 6) {
//       setPincodeStatus({ type: 'error', message: 'Please enter a valid 6-digit pincode.' });
//       return;
//     }
//     setTimeout(() => {
//       if (pincode === "400001" || pincode === "110001") {
//         setPincodeStatus({ type: 'success', message: `✓ Delivery available for Pincode ${pincode}. Estimated 3-5 days.` });
//       } else {
//         setPincodeStatus({ type: 'error', message: `✗ Delivery not available for Pincode ${pincode}.` });
//       }
//     }, 500);
//   };

//   const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (reviewRating === 0) {
//         setReviewSubmissionStatus('error');
//         setReviewSubmissionMessage('Please select a rating.');
//         return;
//     }
//     if (!reviewText.trim()) {
//         setReviewSubmissionStatus('error');
//         setReviewSubmissionMessage('Please write your review.');
//         return;
//     }
//     setReviewSubmissionStatus('submitting');
//     setReviewSubmissionMessage('');

//     console.log("Submitting review:", { name: reviewName, rating: reviewRating, text: reviewText, productId: product.id });

//     setTimeout(() => {
//         setReviewSubmissionStatus('success');
//         setReviewSubmissionMessage('Thank you! Your review has been submitted (simulated).');
//         setReviewName('');
//         setReviewRating(0);
//         setReviewText('');
//         setShowReviewForm(false);
//     }, 1500);
//   };

//   const deliveryAndPolicyAccordionItems = [
//     {
//       id: 'delivery-returns',
//       title: <span><span role="img" aria-label="Delivery Truck">🚚</span> DELIVERY & RETURNS</span>,
//       content: (
//         <div className="space-y-4 text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary">
//           <h4 className="font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary">Available Shipping Methods</h4>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-left border-collapse">
//               <thead className="bg-zaina-sky-blue-light dark:bg-dark-zaina-sky-blue-light/50">
//                 <tr>
//                   <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">Shipping Method</th>
//                   <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">Shipping To</th>
//                   <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">Shipping Charge</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">Pre-Paid</td>
//                   <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">All over India</td>
//                   <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">Free</td>
//                 </tr>
//                 <tr>
//                   <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">COD Charges</td>
//                   <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">All over India</td>
//                   <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">Free</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <p>For more details please read our <a href="#" onClick={(e) => {e.preventDefault(); onNavigateToPage('policy', policyContents.shipping)}} className="text-zaina-primary dark:text-dark-zaina-primary hover:underline">Shipping Policy</a>.</p>

//           <h4 className="font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary pt-2">Return Policy</h4>
//           <p>Your satisfaction is our top priority. If you're not completely satisfied with the product, we offer a hassle-free, no-questions-asked 10-day return and refund. We believe in making your shopping experience risk-free and enjoyable.</p>
//           <p>For more details please read our <a href="#" onClick={(e) => {e.preventDefault(); onNavigateToPage('policy', policyContents.returns)}} className="text-zaina-primary dark:text-dark-zaina-primary hover:underline">Return and Cancellation Policy</a>.</p>
//         </div>
//       )
//     },
//     {
//       id: 'product-declaration',
//       title: <span><span role="img" aria-label="Document">📄</span> PRODUCT DECLARATION</span>,
//       content: (
//         <p className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary leading-relaxed">
//           This product is crafted from high-quality materials, ensuring both comfort and durability. All Zaina Collection items are authentic and undergo rigorous quality checks. For specific care instructions, please refer to the Fabric & Care tab or the product label. Warranty, if applicable, will be detailed in the product packaging or accompanying documents.
//         </p>
//       )
//     },
//     {
//       id: 'help-contact',
//       title: <span><span role="img" aria-label="Question Mark">❓</span> HAVE A QUESTION? WE ARE HERE TO HELP!</span>,
//       content: (
//         <div className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary space-y-1">
//           <p><strong>📞 Phone:</strong> 011-41169005</p>
//           <p><strong>🕘 Hours:</strong> Monday – Saturday, 9:30am – 6:30pm (IST)</p>
//           <p>You can also reach out via our <a href="#" onClick={(e) => {e.preventDefault(); onNavigateToPage('contact')}} className="text-zaina-primary dark:text-dark-zaina-primary hover:underline">Contact Page</a>.</p>
//         </div>
//       )
//     }
//   ];

//   if (product.specifications && product.specifications.filter(s => s.key && s.value).length > 0) {
//     deliveryAndPolicyAccordionItems.unshift({
//         id: 'specifications',
//         title: <span><span role="img" aria-label="List">📝</span> SPECIFICATIONS</span>,
//         content: (
//             <ul className="space-y-2 text-sm">
//                 {product.specifications.filter(s => s.key && s.value).map((spec, index) => (
//                     <li key={index} className="flex justify-between">
//                         <span className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary">{spec.key}:</span>
//                         <span className="font-medium text-zaina-text-primary dark:text-dark-zaina-text-primary">{spec.value}</span>
//                     </li>
//                 ))}
//             </ul>
//         )
//     });
//   }

//   const productReviews: Testimonial[] = [];

//   const relatedProducts = allProducts.filter(
//     p => p.id !== product.id && p.publishStatus === 'Published' && (p.category === product.category)
//   ).slice(0, 10);

//   const priceToShow = currentVariant?.price ?? product.price;
//   const mrpToShow = product.mrp;

//   const productSchema = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     "name": product.name,
//     "image": product.imageUrl,
//     "description": product.description,
//     "sku": currentVariant?.sku || product.sku || product.id,
//     "mpn": currentVariant?.sku || product.sku || product.id,
//     "brand": { "@type": "Brand", "name": "ZAINA COLLECTION" },
//     ...(product.rating ? {
//       "aggregateRating": { "@type": "AggregateRating", "ratingValue": product.rating.toFixed(1), "reviewCount": (productReviews.length + Math.floor(Math.random() * 20)) }
//     } : {}),
//     "offers": {
//       "@type": "Offer", "url": window.location.href, "priceCurrency": "INR", "price": priceToShow.toFixed(2),
//       "priceValidUntil": new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
//       "itemCondition": "https://schema.org/NewCondition",
//       "availability": (currentVariant?.stockQuantity ?? product.stockQuantity ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
//       "seller": { "@type": "Organization", "name": "ZAINA COLLECTION" }
//     }
//   };

//   const getStockMessage = () => {
//     if (!selectedColor) return { text: "Select a color", color: "text-zaina-text-secondary" };
//     if (!selectedSize) return { text: "Select a size", color: "text-zaina-text-secondary" };

//     if (currentVariant) {
//       if (currentVariant.stockQuantity === 0) return { text: "Out of Stock", color: "text-zaina-deep-red-accent dark:text-red-400" };
//       if (currentVariant.stockQuantity < 5) return { text: `Only ${currentVariant.stockQuantity} left!`, color: "text-zaina-alert-orange dark:text-dark-zaina-alert-orange" };
//       return { text: "In Stock", color: "text-green-600 dark:text-green-400" };
//     }

//     return { text: "Unavailable", color: "text-zaina-deep-red-accent dark:text-red-400" };
//   };
//   const stockInfo = getStockMessage();

//   const addToCartDisabled = !currentVariant || (currentVariant?.stockQuantity ?? 0) === 0;
//   const buyNowDisabled = isProcessing || !currentVariant || (currentVariant?.stockQuantity ?? 0) === 0;

//   const breadcrumbCategory = { label: product.category, pageName: 'shop' as PageName, category: product.category };

//   const allImages = useMemo(() => {
//     const imageUrls = new Set<string>();

//     if (product.imageUrl) {
//         imageUrls.add(product.imageUrl);
//     }

//     if (product.images) {
//         product.images.forEach(img => imageUrls.add(img));
//     }

//     if (product.variants) {
//       for (const variant of product.variants) {
//         if (variant.imageUrl) {
//           imageUrls.add(variant.imageUrl);
//         }
//       }
//     }

//     return Array.from(imageUrls);
//   }, [product.imageUrl, product.images, product.variants]);

//   return (
//     <div className="bg-zaina-neutral-light dark:bg-dark-zaina-neutral-light min-h-screen py-8 md:py-12 font-body-jost">
//       <script type="application/ld+json">
//         {JSON.stringify(productSchema)}
//       </script>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Breadcrumbs */}
//         <nav aria-label="Breadcrumb" className="mb-6 text-sm font-body-jost text-zaina-text-secondary dark:text-dark-zaina-text-secondary">
//           <ol className="list-none p-0 inline-flex items-center">
//             <li className="flex items-center">
//               <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('home'); }} className="hover:text-zaina-primary dark:hover:text-dark-zaina-primary">Home</a>
//               <ChevronRightIcon className="w-4 h-4 mx-1" />
//             </li>
//             <li className="flex items-center">
//               <a
//                 href="#"
//                 onClick={(e) => { e.preventDefault(); onNavigateToPage('shop', { category: breadcrumbCategory.category || product.category }); }}
//                 className="hover:text-zaina-primary dark:hover:text-dark-zaina-primary"
//               >
//                 {breadcrumbCategory.label}
//               </a>
//               <ChevronRightIcon className="w-4 h-4 mx-1" />
//             </li>
//             <li aria-current="page" className="truncate max-w-[150px] sm:max-w-xs">
//               {product.name}
//             </li>
//           </ol>
//         </nav>

//         <div ref={mainProductActionsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
//           {/* Image Gallery Section */}
//           <div className="flex flex-col md:flex-row gap-4 lg:sticky lg:top-[160px]">
//             {allImages.length > 1 && (
//               <div className="flex md:flex-col gap-2 order-first md:order-none md:max-h-[500px] overflow-y-auto pr-1 custom-scrollbar-thin">
//                 {allImages.map((imgUrl, index) => (
//                   <img
//                     key={index}
//                     src={imgUrl}
//                     alt={`${product.name} thumbnail ${index + 1}`}
//                     className={`w-16 h-20 md:w-20 md:h-24 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ease-in-out hover:opacity-100 hover:border-zaina-gold dark:hover:border-zaina-gold
//                                 ${activeImageUrl === imgUrl ? 'border-zaina-gold dark:border-zaina-gold opacity-100 scale-105' : 'border-transparent opacity-70'}`}
//                     onMouseEnter={() => setActiveImageUrl(imgUrl)}
//                     onClick={() => setActiveImageUrl(imgUrl)}
//                   />
//                 ))}
//               </div>
//             )}
//             <div className="flex-grow aspect-w-3 aspect-h-4 md:aspect-w-4 md:aspect-h-5 rounded-lg overflow-hidden shadow-lg bg-zaina-white dark:bg-dark-zaina-bg-card group/mainimg">
//               <img
//                 src={activeImageUrl}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/mainimg:scale-105"
//               />
//             </div>
//           </div>

//           {/* Product Details Section */}
//           <div className="text-zaina-text-primary dark:text-dark-zaina-text-primary">
//             <h1 className="text-3xl md:text-4xl font-heading-playfair font-bold mb-3">{product.name}</h1>
//             {product.rating && (
//               <div className="mb-3 flex items-center">
//                 <RatingStars rating={product.rating} color='text-zaina-gold dark:text-zaina-gold' />
//                 <span className="ml-2 text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary">({product.rating.toFixed(1)} stars, {productReviews.length} reviews)</span>
//               </div>
//             )}
//             <div className="flex items-baseline mb-4">
//               <p className="text-2xl md:text-3xl font-semibold text-zaina-gold dark:text-zaina-gold">
//                 ₹{priceToShow.toFixed(2)}
//               </p>
//               {mrpToShow > priceToShow && (
//                 <span className="ml-3 text-lg text-zaina-text-secondary dark:text-dark-zaina-text-secondary line-through">₹{mrpToShow.toFixed(2)}</span>
//               )}
//               <span className={`ml-4 text-sm font-semibold ${stockInfo.color}`}>{stockInfo.text}</span>
//             </div>

//             <p className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary mb-6 leading-relaxed">
//               {product.description}
//             </p>

//             {/* Color Selector */}
//             {availableColors.length > 0 && (
//               <div className="mb-4">
//                 <span className="text-sm font-semibold">Color: <span className="font-normal">{selectedColor}</span></span>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {availableColors.map(color => (
//                     <button
//                       key={color}
//                       onClick={() => setSelectedColor(color)}
//                       className={`px-3 py-1 text-xs font-medium rounded-full border-2 transition-all
//                         ${selectedColor === color ? 'border-zaina-primary dark:border-dark-zaina-primary shadow-md' : 'border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium'}`}
//                         style={{backgroundColor: color?.toLowerCase()}}
//                         title={color}
//                     >
//                        <span className="opacity-0">{color}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Size Selector */}
//             {availableSizesForSelectedColor.length > 0 && (
//               <div className="mb-4">
//                 <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-semibold">Size: {selectedSize}</span>
//                     <button onClick={() => setIsSizeGuideModalOpen(true)} className="text-sm text-zaina-primary dark:text-dark-zaina-primary hover:underline">Size Guide</button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {availableSizesForSelectedColor.map(size => (
//                     <button
//                       key={size}
//                       onClick={() => handleSizeSelect(size)}
//                       className={`px-4 py-2 text-sm font-medium rounded-md border-2 transition-all duration-200
//                         ${selectedSize === size
//                           ? 'bg-zaina-primary dark:bg-dark-zaina-primary border-zaina-primary dark:border-dark-zaina-primary text-zaina-white dark:text-dark-zaina-text-primary shadow-md'
//                           : 'bg-zaina-white dark:bg-dark-zaina-bg-card border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium hover:border-zaina-primary dark:hover:border-dark-zaina-primary'}
//                       `}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="mb-6 flex items-center gap-4">
//               <p className="text-sm font-semibold flex-shrink-0">Quantity:</p>
//               <div className="flex items-center border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium rounded-md">
//                 <button
//                   onClick={() => handleQuantityChange(quantity - 1)}
//                   className="px-3 py-2 text-zaina-primary dark:text-dark-zaina-primary hover:bg-zaina-sky-blue-light/50 dark:hover:bg-dark-zaina-sky-blue-light/30 rounded-l-md"
//                   aria-label="Decrease quantity"
//                 >
//                   -
//                 </button>
//                 <span className="px-4 py-2 text-zaina-text-primary dark:text-dark-zaina-text-primary">{quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange(quantity + 1)}
//                   className="px-3 py-2 text-zaina-primary dark:text-dark-zaina-primary hover:bg-zaina-sky-blue-light/50 dark:hover:bg-dark-zaina-sky-blue-light/30 rounded-r-md"
//                   aria-label="Increase quantity"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//               <button
//                 onClick={handleAddToCartClick}
//                 disabled={addToCartDisabled}
//                 className="w-full bg-zaina-primary dark:bg-dark-zaina-primary text-zaina-white dark:text-dark-zaina-text-primary font-semibold py-3 px-6 rounded-md hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {addToCartDisabled ? 'Unavailable' : 'Add to Cart'}
//               </button>
//               <button
//                 onClick={handleBuyNowClick}
//                 disabled={buyNowDisabled}
//                 className="w-full bg-zaina-gold text-zaina-white dark:text-dark-zaina-text-primary font-semibold py-3 px-6 rounded-md hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isProcessing ? "Processing..." : "Buy Now"}
//               </button>
//             </div>

//             <div className="flex items-center space-x-4 mb-6">
//                 <button onClick={() => onToggleWishlist(product)} className="flex items-center text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary">
//                     <HeartIcon className={`w-5 h-5 mr-1.5 ${isWishlisted ? 'text-zaina-deep-red-accent' : ''}`} isFilled={isWishlisted} />
//                     {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
//                 </button>
//                  <button onClick={() => onToggleCompare(product)} className="flex items-center text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary">
//                     <span className="font-bold mr-1.5">+</span>
//                     {isProductInCompare(product.id) ? 'Added to Compare' : 'Add to Compare'}
//                 </button>
//             </div>

//             <div className="space-y-4">
//               {deliveryAndPolicyAccordionItems.map(item => (
//                 <Accordion key={item.id} identifier={item.id} title={item.title}>
//                   {item.content}
//                 </Accordion>
//               ))}
//             </div>

//           </div>
//         </div>

//         <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
//             {product.longDescriptionHtml && (
//                 <section className="bg-zaina-white dark:bg-dark-zaina-bg-card p-6 md:p-8 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-heading-cormorant font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary mb-4">From the Designer</h2>
//                     <div className="prose prose-lg max-w-none text-zaina-text-secondary dark:text-dark-zaina-text-secondary"
//                          dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.longDescriptionHtml) }}>
//                     </div>
//                 </section>
//             )}

//             {product.bannerImageUrl && (
//                 <section>
//                     <a href={product.bannerLink || '#'} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
//                         <img src={product.bannerImageUrl} alt="Promotional Banner" className="w-full h-auto"/>
//                     </a>
//                 </section>
//             )}

//             {relatedProducts.length > 0 && (
//                 <section>
//                     <MiniProductCarousel
//                         title="You May Also Like"
//                         products={relatedProducts}
//                         onProductQuickView={onProductQuickView}
//                         onProductQuickShop={onProductQuickShop}
//                         onProductCardClick={(p) => onNavigateToPage('productDetail', p)}
//                         onToggleWishlist={onToggleWishlist}
//                         isProductInWishlist={isProductInWishlist}
//                         onToggleCompare={onToggleCompare}
//                         isProductInCompare={isProductInCompare}
//                     />
//                 </section>
//             )}

//             {product.faqs && product.faqs.length > 0 && (
//                 <section>
//                     <h2 className="text-2xl font-heading-cormorant font-semibold text-center text-zaina-text-primary dark:text-dark-zaina-text-primary mb-8">Frequently Asked Questions</h2>
//                     <div className="max-w-3xl mx-auto space-y-4">
//                         {product.faqs.filter(faq => faq.question && faq.answer).map((faq, index) => (
//                             <Accordion key={index} identifier={`faq-${index}`} title={faq.question}>
//                                 <p className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary leading-relaxed">{faq.answer}</p>
//                             </Accordion>
//                         ))}
//                     </div>
//                 </section>
//             )}
//         </div>

//         {/* Recently Viewed Products Carousel */}
//         <RecentlyViewedProducts
//              products={recentlyViewedProducts}
//              onProductQuickView={onProductQuickView}
//              onProductQuickShop={onProductQuickShop}
//              onProductCardClick={onNavigateToPage.bind(null, 'productDetail')}
//              onToggleWishlist={onToggleWishlist}
//              isProductInWishlist={isProductInWishlist}
//              onToggleCompare={onToggleCompare}
//              isProductInCompare={isProductInCompare}
//         />

//       </div>

//       {showFloatingBar && !isFloatingBarDismissed && (
//         <FloatingAddToCartBar
//           product={product}
//           selectedSize={selectedSize}
//           availableSizes={Array.from(availableSizesForSelectedColor)}
//           onSizeSelect={handleSizeSelect}
//           quantity={quantity}
//           onQuantityChange={handleQuantityChange}
//           onAddToCart={handleFloatingBarAddToCart}
//           onClose={handleFloatingBarClose}
//           isVisible={true}
//           isAddToCartDisabled={addToCartDisabled}
//         />
//       )}

//       <Modal isOpen={isSizeGuideModalOpen} onClose={() => setIsSizeGuideModalOpen(false)} title="Size Guide" size="lg">
//         <div dangerouslySetInnerHTML={{ __html: policyContents.sizeGuide.htmlContent || "" }} />
//       </Modal>

//       <style>{`
//         .prose h2, .prose h3 { font-family: 'Cormorant Garamond', serif; color: inherit; }
//         .prose p { color: inherit; }
//         .prose a { color: #4A90E2; }
//         html.dark .prose a { color: #63B3ED; }
//       `}</style>
//     </div>
//   );
// };

"use client";

import type React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import type {
  Product,
  Testimonial,
  PageName,
  ProductVariant,
} from "../../types";
import RatingStars from "../RatingStars";
import MiniProductCarousel from "../MiniProductCarousel";
import RecentlyViewedProducts from "../RecentlyViewedProducts";
import { policyContents } from "./pageData";
import FloatingAddToCartBar from "../FloatingAddToCartBar";
import Modal from "../shared/Modal";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import Accordion from "../shared/Accordion";
import HeartIcon from "../icons/HeartIcon";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedVariant: ProductVariant
  ) => void;
  onNavigateToPage: (page: PageName, data?: any) => void;
  onProductQuickView: (product: Product) => void;
  onProductQuickShop: (product: Product) => void;
  isLoggedIn: boolean;
  onDirectBuyNow: (
    product: Product,
    quantity: number,
    selectedVariant: ProductVariant
  ) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  isProductInWishlist: (productId: string) => boolean;
  recentlyViewedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  isProductInCompare: (productId: string) => boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onAddToCart,
  onNavigateToPage,
  onProductQuickView,
  onProductQuickShop,
  isLoggedIn,
  onDirectBuyNow,
  onToggleWishlist,
  isWishlisted,
  isProductInWishlist,
  recentlyViewedProducts,
  onToggleCompare,
  isProductInCompare,
}) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variants?.[0]?.attributes["Color"]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.variants?.[0]?.attributes["Size"]
  );
  const [currentVariant, setCurrentVariant] = useState<
    ProductVariant | undefined
  >(product.variants?.[0]);

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const [activeImageUrl, setActiveImageUrl] = useState<string>(
    product.variants?.[0]?.imageUrl || product.imageUrl
  );

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmissionStatus, setReviewSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [reviewSubmissionMessage, setReviewSubmissionMessage] = useState("");

  const [activeTab, setActiveTab] = useState("details");
  const [activeInfoTab, setActiveInfoTab] = useState("shipping");
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);

  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isFloatingBarDismissed, setIsFloatingBarDismissed] = useState(false);
  const mainProductActionsRef = useRef<HTMLDivElement>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isProductDescriptionOpen, setIsProductDescriptionOpen] =
    useState(true);

  const availableColors = useMemo(() => {
    return [
      ...new Set(product.variants?.map((v) => v.attributes["Color"]) || []),
    ];
  }, [product.variants]);

  const availableSizesForSelectedColor = useMemo(() => {
    return [
      ...new Set(
        product.variants
          ?.filter((v) => v.attributes["Color"] === selectedColor)
          .map((v) => v.attributes["Size"]) || []
      ),
    ];
  }, [product.variants, selectedColor]);

  useEffect(() => {
    const defaultVariant = product.variants?.[0];
    setSelectedColor(defaultVariant?.attributes["Color"]);
    setSelectedSize(defaultVariant?.attributes["Size"]);
    setCurrentVariant(defaultVariant);
    setActiveImageUrl(defaultVariant?.imageUrl || product.imageUrl);
  }, [product]); // Fixed dependency to include entire product object

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product.variants?.find(
        (v) =>
          v.attributes["Color"] === selectedColor &&
          v.attributes["Size"] === selectedSize
      );
      setCurrentVariant(variant);
      if (variant?.imageUrl) {
        setActiveImageUrl(variant.imageUrl);
      }
    } else {
      setCurrentVariant(undefined);
      const firstVariantOfColor = product.variants?.find(
        (v) => v.attributes["Color"] === selectedColor && v.imageUrl
      );
      setActiveImageUrl(firstVariantOfColor?.imageUrl || product.imageUrl);
    }
  }, [selectedColor, selectedSize, product]); // Fixed dependency to include entire product object

  useEffect(() => {
    const handleScroll = () => {
      if (mainProductActionsRef.current) {
        const rect = mainProductActionsRef.current.getBoundingClientRect();
        const threshold = window.innerHeight * 0.1;
        if (rect.bottom < threshold) {
          setShowFloatingBar(true);
        } else {
          setShowFloatingBar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [product]);

  const handleFloatingBarClose = () => {
    setIsFloatingBarDismissed(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCartClick = () => {
    if (!currentVariant) {
      alert("Please select a color and size.");
      return;
    }

    if (currentVariant.stockQuantity > 0) {
      onAddToCart(product, quantity, currentVariant);
    } else {
      alert("This variant is out of stock.");
    }
  };

  const handleFloatingBarAddToCart = () => {
    if (!currentVariant) {
      alert("Please select a size from the floating bar.");
      return;
    }
    onAddToCart(product, quantity, currentVariant);
    alert(
      `Added ${product.name} (${currentVariant.attributes["Color"]}, ${currentVariant.attributes["Size"]}) from sticky bar!`
    );
  };

  const handleBuyNowClick = () => {
    if (!currentVariant) return;
    setIsProcessing(true);
    onDirectBuyNow(product, quantity, currentVariant);
  };

  const handlePincodeCheck = () => {
    if (!pincode || pincode.length < 6) {
      setPincodeStatus({
        type: "error",
        message: "Please enter a valid 6-digit pincode.",
      });
      return;
    }
    setTimeout(() => {
      if (pincode === "400001" || pincode === "110001") {
        setPincodeStatus({
          type: "success",
          message: `✓ Delivery available for Pincode ${pincode}. Estimated 3-5 days.`,
        });
      } else {
        setPincodeStatus({
          type: "error",
          message: `✗ Delivery not available for Pincode ${pincode}.`,
        });
      }
    }, 500);
  };

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewRating === 0) {
      setReviewSubmissionStatus("error");
      setReviewSubmissionMessage("Please select a rating.");
      return;
    }
    if (!reviewText.trim()) {
      setReviewSubmissionStatus("error");
      setReviewSubmissionMessage("Please write your review.");
      return;
    }
    setReviewSubmissionStatus("submitting");
    setReviewSubmissionMessage("");

    console.log("Submitting review:", {
      name: reviewName,
      rating: reviewRating,
      text: reviewText,
      productId: product.id,
    });

    setTimeout(() => {
      setReviewSubmissionStatus("success");
      setReviewSubmissionMessage(
        "Thank you! Your review has been submitted (simulated)."
      );
      setReviewName("");
      setReviewRating(0);
      setReviewText("");
      setShowReviewForm(false);
    }, 1500);
  };

  const deliveryAndPolicyAccordionItems = [
    {
      id: "delivery-returns",
      title: (
        <span>
          <span role="img" aria-label="Delivery Truck">
            🚚
          </span>{" "}
          DELIVERY & RETURNS
        </span>
      ),
      content: (
        <div className="space-y-4 text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary">
          <h4 className="font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary">
            Available Shipping Methods
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-zaina-sky-blue-light dark:bg-dark-zaina-sky-blue-light/50">
                <tr>
                  <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">
                    Shipping Method
                  </th>
                  <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">
                    Shipping To
                  </th>
                  <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">
                    Shipping Charge
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">
                    Pre-Paid
                  </td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">
                    All over India
                  </td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">
                    Free
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">
                    COD Charges
                  </td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">
                    All over India
                  </td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">
                    Free
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            For more details please read our{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToPage("policy", policyContents.shipping);
              }}
              className="text-zaina-primary dark:text-dark-zaina-primary hover:underline"
            >
              Shipping Policy
            </a>
            .
          </p>

          <h4 className="font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary pt-2">
            Return Policy
          </h4>
          <p>
            Your satisfaction is our top priority. If you're not completely
            satisfied with the product, we offer a hassle-free,
            no-questions-asked 10-day return and refund. We believe in making
            your shopping experience risk-free and enjoyable.
          </p>
          <p>
            For more details please read our{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToPage("policy", policyContents.returns);
              }}
              className="text-zaina-primary dark:text-dark-zaina-primary hover:underline"
            >
              Return and Cancellation Policy
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      id: "product-declaration",
      title: (
        <span>
          <span role="img" aria-label="Document">
            📄
          </span>{" "}
          PRODUCT DECLARATION
        </span>
      ),
      content: (
        <p className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary leading-relaxed">
          This product is crafted from high-quality materials, ensuring both
          comfort and durability. All Zaina Collection items are authentic and
          undergo rigorous quality checks. For specific care instructions,
          please refer to the Fabric & Care tab or the product label. Warranty,
          if applicable, will be detailed in the product packaging or
          accompanying documents.
        </p>
      ),
    },
    {
      id: "help-contact",
      title: (
        <span>
          <span role="img" aria-label="Question Mark">
            ❓
          </span>{" "}
          HAVE A QUESTION? WE ARE HERE TO HELP!
        </span>
      ),
      content: (
        <div className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary space-y-1">
          <p>
            <strong>📞 Phone:</strong> 011-41169005
          </p>
          <p>
            <strong>🕘 Hours:</strong> Monday – Saturday, 9:30am – 6:30pm (IST)
          </p>
          <p>
            You can also reach out via our{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToPage("contact");
              }}
              className="text-zaina-primary dark:text-dark-zaina-primary hover:underline"
            >
              Contact Page
            </a>
            .
          </p>
        </div>
      ),
    },
  ];

  const productReviews: Testimonial[] = [];

  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        p.publishStatus === "Published" &&
        p.category === product.category
    )
    .slice(0, 10);

  const calculateDiscount = (mrp: number, sellingPrice: number) => {
    if (mrp <= sellingPrice) return 0;
    return Math.round(((mrp - sellingPrice) / mrp) * 100);
  };

  const getColorStyle = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      // Basics
      Blue: "#1e40af",
      Navy: "#1e3a8a",
      SkyBlue: "#38bdf8",
      Teal: "#0d9488",
      Green: "#059669",
      Olive: "#556b2f",
      Lime: "#84cc16",
      Red: "#dc2626",
      Maroon: "#7f1d1d",
      Wine: "#722f37",
      Burgundy: "#800020",
      Pink: "#ec4899",
      HotPink: "#ff69b4",
      Fuchsia: "#ff00ff",
      Purple: "#7c3aed",
      Lavender: "#b57edc",
      Violet: "#8a2be2",
      Yellow: "#eab308",
      Mustard: "#ffdb58",
      Orange: "#ea580c",
      Peach: "#ffe5b4",
      Coral: "#ff7f50",
      Brown: "#92400e",
      Tan: "#d2b48c",
      Beige: "#f5f5dc",
      Cream: "#fffdd0",
      Ivory: "#fffff0",
      Gold: "#ffd700",
      Silver: "#c0c0c0",
      Gray: "#6b7280",
      Grey: "#6b7280",
      Black: "#000000",
      White: "#ffffff",

      // Fashion / Saree / Kurti shades
      Mint: "#98ff98",
      Aqua: "#00ffff",
      Turquoise: "#40e0d0",
      SeaGreen: "#2e8b57",
      ForestGreen: "#228b22",
      Khaki: "#f0e68c",
      Sand: "#c2b280",
      Rust: "#b7410e",
      Copper: "#b87333",
      Bronze: "#cd7f32",
      Rose: "#ff007f",
      Blush: "#de5d83",
      Mauve: "#e0b0ff",
      Lilac: "#c8a2c8",
      Indigo: "#4b0082",
      Denim: "#1560bd",
      Slate: "#708090",
      Charcoal: "#36454f",
      CreamPink: "#fddde6",
      OffWhite: "#faf9f6",
      MauvePink: "#e0b0ff",
      LimeGreen: "#32CD32",
    };
    return colorMap[colorName] || colorName?.toLowerCase() || "#6b7280";
  };

  // --- Safe formatting helpers (drop-in) ---
const isFiniteNumber = (v: unknown): v is number =>
  Number.isFinite(typeof v === "string" ? Number(v) : v);

const money = (v: unknown, digits = 2) => {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(digits) : "0.00";
};

const fixedOrNull = (v: unknown, digits = 1) => {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(digits) : null;
};


  const priceToShow = currentVariant?.price ?? product.price;
  const mrpToShow = product.mrp;
  const discountPercentage = calculateDiscount(mrpToShow, priceToShow);
  const ratingFixed = fixedOrNull(product.rating, 1);     // e.g., "4.5" or null
const priceFixed  = money(priceToShow, 2);              // e.g., "1999.00"
const mrpFixed    = money(mrpToShow, 2);                // e.g., "2499.00"


  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.imageUrl,
    description: product.description,
    sku: currentVariant?.sku || product.sku || product.id,
    mpn: currentVariant?.sku || product.sku || product.id,
    brand: { "@type": "Brand", name: "ZAINA COLLECTION" },
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: ratingFixed,
            reviewCount: productReviews.length + Math.floor(Math.random() * 20),
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "INR",
      price: priceFixed,
      priceValidUntil: new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      availability:
        (currentVariant?.stockQuantity ?? product.stockQuantity ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "ZAINA COLLECTION" },
    },
  };

  const getStockMessage = () => {
    if (!selectedColor)
      return { text: "Select a color", color: "text-zaina-text-secondary" };
    if (!selectedSize)
      return { text: "Select a size", color: "text-zaina-text-secondary" };

    if (currentVariant) {
      if (currentVariant.stockQuantity === 0)
        return {
          text: "Out of Stock",
          color: "text-zaina-deep-red-accent dark:text-red-400",
        };
      if (currentVariant.stockQuantity < 5)
        return {
          text: `Only ${currentVariant.stockQuantity} left!`,
          color: "text-zaina-alert-orange dark:text-dark-zaina-alert-orange",
        };
      return { text: "In Stock", color: "text-green-600 dark:text-green-400" };
    }

    return {
      text: "Unavailable",
      color: "text-zaina-deep-red-accent dark:text-red-400",
    };
  };
  const stockInfo = getStockMessage();

  const addToCartDisabled =
    !currentVariant || (currentVariant?.stockQuantity ?? 0) === 0;
  const buyNowDisabled =
    isProcessing ||
    !currentVariant ||
    (currentVariant?.stockQuantity ?? 0) === 0;

  const breadcrumbCategory = {
    label: product.category,
    pageName: "shop" as PageName,
    category: product.category,
  };

  const allImages = useMemo(() => {
    const imageUrls = new Set<string>();

    if (product.imageUrl) {
      imageUrls.add(product.imageUrl);
    }

    if (product.images) {
      product.images.forEach((img) => imageUrls.add(img));
    }

    if (product.variants) {
      for (const variant of product.variants) {
        if (variant.imageUrl) {
          imageUrls.add(variant.imageUrl);
        }
      }
    }

    return Array.from(imageUrls);
  }, [product.imageUrl, product.images, product.variants]);

  const renderProductDetails = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      {/* Product details accordion */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => setIsProductDetailsOpen(!isProductDetailsOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900">Product details</h3>
          <ChevronRightIcon
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isProductDetailsOpen ? "rotate-90" : ""
            }`}
          />
        </button>
        {isProductDetailsOpen && (
          <div className="mt-4 space-y-3">
            {product.specifications &&
              product.specifications.filter((s) => s.key && s.value).length >
                0 && (
                <div>
                  {product.specifications
                    .filter((s) => s.key && s.value)
                    .map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 text-sm"
                      >
                        <span className="text-gray-600">{spec.key}:</span>
                        <span className="font-medium text-gray-900">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                </div>
              )}
          </div>
        )}
      </div>

      {/* Product Description accordion */}
      {product.longDescriptionHtml && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
          <h3 className="font-medium text-gray-900 mb-3">
            Product Description
          </h3>
          <div
            className="prose prose-sm md:prose max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.longDescriptionHtml }}
          />
        </div>
      )}
    </div>
  );

  const renderRatingsReviews = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-gray-900">
          All Reviews ({productReviews.length || 451})
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>Latest</option>
              <option>Oldest</option>
              <option>Highest Rating</option>
              <option>Lowest Rating</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
            Write a Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sample reviews matching the design */}
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-2">
              <RatingStars rating={4.5} />
              <span className="text-sm text-gray-500">...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">Samantha D.</span>
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              "I absolutely love this suits! The design is unique and the fabric
              feels so comfortable. As a fellow designer, I appreciate the
              attention to detail. It's become my favorite go-to shirt."
            </p>
            <p className="text-gray-500 text-xs">Posted on August 14, 2023</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700">
          Load More Reviews
        </button>
      </div>
    </div>
  );

  const renderShippingDelivery = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          Delivery Time
        </h3>
        <p className="text-gray-600">4 to 6 working Days.</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-gray-900 mb-3">Shipping</h3>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            We know how important is to receive your order on time, so we have
            the Best Courier Partners to deliver your product to you as soon as
            we can. We have a standard delivery option in which, the product
            will be dispatched in 24-48 hours of the order.
          </p>
          <p>
            Depends upon the location, the product will be delivered to you, The
            ETA will be made available to you along with your Tracking Details.
          </p>
          <p>
            If you don't receive your order in 7-10 Days, please email us with
            all the details. we will get back to you at the earliest.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <nav className="bg-white border-b border-gray-200 pb-8 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-4 space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                New arrivals
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Suits
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Special offers
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Best Sellers
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Sale
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Kurta and pant with dupatta
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Jewellery
              </a>
            </div>
          </div>
        </nav>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 md:mb-6 text-sm text-gray-500"
        >
          <ol className="list-none p-0 inline-flex items-center flex-wrap">
            <li className="flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToPage("home");
                }}
                className="hover:text-blue-600"
              >
                Home
              </a>
              <ChevronRightIcon className="w-4 h-4 mx-1" />
            </li>
            <li className="flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToPage("shop", {
                    category: breadcrumbCategory.category || product.category,
                  });
                }}
                className="hover:text-blue-600"
              >
                Shop
              </a>
              <ChevronRightIcon className="w-4 h-4 mx-1" />
            </li>
            <li className="flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToPage("shop", {
                    category: breadcrumbCategory.category || product.category,
                  });
                }}
                className="hover:text-blue-600"
              >
                Women cloth
              </a>
              <ChevronRightIcon className="w-4 h-4 mx-1" />
            </li>
            <li aria-current="page" className="text-gray-900 font-medium">
              Suits
            </li>
          </ol>
        </nav>

        <div
          ref={mainProductActionsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 md:mb-12"
        >
          {/* Left side - Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="w-full">
              <img
                src={activeImageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg border border-gray-200"
              />
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 md:gap-3 justify-start overflow-x-auto pb-2">
                {allImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={`w-14 h-16 md:w-20 md:h-24 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 flex-shrink-0
                                ${
                                  activeImageUrl === imgUrl
                                    ? "border-blue-500"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                    onClick={() => setActiveImageUrl(imgUrl)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right side - Product details */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {ratingFixed && (
  <div className="flex items-center mb-3 md:mb-4">
    <RatingStars rating={Number(ratingFixed)} />
    <span className="ml-2 text-sm text-gray-500">{ratingFixed}/5</span>
  </div>
)}


              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  ₹{priceFixed}
                </span>
                {mrpToShow > priceToShow && (
                  <>
                    <span className="text-base md:text-lg lg:text-xl text-gray-500 line-through">
                      ₹{mrpFixed}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
                {product.description}
              </p>
            )}

            {availableColors.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Select Colors{" "}
                  {selectedColor && (
                    <span className="text-gray-600">: {selectedColor}</span>
                  )}
                </h3>
                <div className="flex gap-3">
                  {availableColors.map((color) => (
                    <div key={color} className="relative">
                      <button
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all relative ${
                          selectedColor === color
                            ? "border-gray-900 scale-110"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      />
                      {selectedColor === color && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-900 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {availableSizesForSelectedColor.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Choose Size</h3>
                  <button
                    onClick={() => setIsSizeGuideModalOpen(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  {availableSizesForSelectedColor.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-3 py-2 md:px-4 md:py-2 border rounded-md font-medium transition-all text-sm md:text-base ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-2 py-2 md:px-3 md:py-2 hover:bg-gray-100 text-lg"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-3 py-2 md:px-4 md:py-2 border-x border-gray-300 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-2 py-2 md:px-3 md:py-2 hover:bg-gray-100 text-lg"
                  >
                    +
                  </button>
                </div>
                <span className={`text-sm font-medium ${stockInfo.color}`}>
                  {stockInfo.text}
                </span>
              </div>

              <button
                onClick={handleAddToCartClick}
                disabled={addToCartDisabled}
                className="w-full bg-blue-600 text-white py-3 md:py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNowClick}
                disabled={buyNowDisabled}
                className="w-full bg-zaina-gold text-zaina-white dark:text-dark-zaina-text-primary font-semibold py-3 px-6 rounded-md hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Buy Now"}
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => onToggleWishlist(product)}
                className="flex items-center text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary"
              >
                <HeartIcon
                  className={`w-5 h-5 mr-1.5 ${
                    isWishlisted ? "text-zaina-deep-red-accent" : ""
                  }`}
                  isFilled={isWishlisted}
                />
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
              <button
                onClick={() => onToggleCompare(product)}
                className="flex items-center text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary"
              >
                <span className="font-bold mr-1.5">+</span>
                {isProductInCompare(product.id)
                  ? "Added to Compare"
                  : "Add to Compare"}
              </button>
            </div>

            {/* Payment methods */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Payment method</h3>
              <div className="flex gap-2">
                <img src="/pay-1.png" alt="Visa" className="h-8" />
                <img src="/pay-2.png" alt="Mastercard" className="h-8" />
                <img src="/pay-3.png" alt="American Express" className="h-8" />
                <span className="text-sm text-gray-500 ml-2">Learn more</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="space-y-4">
              {deliveryAndPolicyAccordionItems.map(item => (
                <Accordion key={item.id} identifier={item.id} title={item.title}>
                  {item.content}
                </Accordion>
              ))}
            </div> */}

        <div className="mb-8 md:mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 md:space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap ${
                  activeTab === "details"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Ratings & Reviews
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`py-3 md:py-4 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap ${
                  activeTab === "shipping"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Shipping & Delivery
              </button>
            </nav>
          </div>

          <div className="py-6 md:py-8">
            {activeTab === "details" && renderProductDetails()}
            {activeTab === "reviews" && renderRatingsReviews()}
            {activeTab === "shipping" && renderShippingDelivery()}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-8 md:mb-12">
            <MiniProductCarousel
              title="YOU MAY ALSO LIKE"
              products={relatedProducts}
              onProductQuickView={onProductQuickView}
              onProductQuickShop={onProductQuickShop}
              onProductCardClick={(p) => onNavigateToPage("productDetail", p)}
              onToggleWishlist={onToggleWishlist}
              isProductInWishlist={isProductInWishlist}
              onToggleCompare={onToggleCompare}
              isProductInCompare={isProductInCompare}
            />
          </section>
        )}

        {/* Recently Viewed Products */}
        <RecentlyViewedProducts
          products={recentlyViewedProducts}
          onProductQuickView={onProductQuickView}
          onProductQuickShop={onProductQuickShop}
          onProductCardClick={onNavigateToPage.bind(null, "productDetail")}
          onToggleWishlist={onToggleWishlist}
          isProductInWishlist={isProductInWishlist}
          onToggleCompare={onToggleCompare}
          isProductInCompare={isProductInCompare}
        />
      </div>

      {showFloatingBar && !isFloatingBarDismissed && (
        <FloatingAddToCartBar
          product={product}
          selectedSize={selectedSize}
          availableSizes={Array.from(availableSizesForSelectedColor)}
          onSizeSelect={handleSizeSelect}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleFloatingBarAddToCart}
          onClose={handleFloatingBarClose}
          isVisible={true}
          isAddToCartDisabled={addToCartDisabled}
        />
      )}

      <Modal
        isOpen={isSizeGuideModalOpen}
        onClose={() => setIsSizeGuideModalOpen(false)}
        title="Size Guide"
        size="lg"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: policyContents.sizeGuide.htmlContent || "",
          }}
        />
      </Modal>

      {/* Review Form Modal */}
      <Modal
        isOpen={showReviewForm}
        onClose={() => setShowReviewForm(false)}
        title="Write a Review"
        size="md"
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className={`text-2xl ${
                    star <= reviewRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {reviewSubmissionMessage && (
            <div
              className={`text-sm ${
                reviewSubmissionStatus === "error"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {reviewSubmissionMessage}
            </div>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={reviewSubmissionStatus === "submitting"}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {reviewSubmissionStatus === "submitting"
                ? "Submitting..."
                : "Submit Review"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
