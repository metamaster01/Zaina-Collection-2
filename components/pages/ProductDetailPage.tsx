
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product, Testimonial, NavLinkItem, PageName, ProductVariant } from '../../types';
import RatingStars from '../RatingStars';
import TrustBadge from '../shared/TrustBadge';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';
import TwitterIcon from '../icons/TwitterIcon';
import ShieldIcon from '../icons/ShieldIcon'; 
import TruckIcon from '../icons/TruckIcon'; 
import ExchangeIcon from '../icons/ExchangeIcon'; 
import MiniProductCarousel from '../MiniProductCarousel';
import RecentlyViewedProducts from '../RecentlyViewedProducts';
import InputField from '../shared/InputField'; 
import QuoteIcon from '../icons/QuoteIcon'; 
import StarIcon from '../icons/StarIcon'; 
import { policyContents } from './pageData'; 
import FloatingAddToCartBar from '../FloatingAddToCartBar';
import Modal from '../shared/Modal'; 
import ChevronRightIcon from '../icons/ChevronRightIcon'; 
import Accordion from '../shared/Accordion';
import HeartIcon from '../icons/HeartIcon';
import { sanitizeHTML } from '../utils/sanitizer';

declare global {
  interface Window {
    Razorpay: any; 
  }
}

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, quantity: number, selectedVariant: ProductVariant) => void;
  onNavigateToPage: (page: PageName, data?: any) => void; 
  onProductQuickView: (product: Product) => void; 
  onProductQuickShop: (product: Product) => void; 
  isLoggedIn: boolean;
  onDirectBuyNow: (product: Product, quantity: number, selectedVariant: ProductVariant) => void;
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
  isProductInCompare
}) => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.variants?.[0]?.attributes['Color']);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.variants?.[0]?.attributes['Size']);
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  const [activeImageUrl, setActiveImageUrl] = useState<string>(product.variants?.[0]?.imageUrl || product.imageUrl);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmissionStatus, setReviewSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [reviewSubmissionMessage, setReviewSubmissionMessage] = useState('');

  const [activeInfoTab, setActiveInfoTab] = useState('shipping');
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false); 

  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isFloatingBarDismissed, setIsFloatingBarDismissed] = useState(false);
  const mainProductActionsRef = useRef<HTMLDivElement>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const availableColors = useMemo(() => {
    return [...new Set(product.variants?.map(v => v.attributes['Color']) || [])];
  }, [product.variants]);

  const availableSizesForSelectedColor = useMemo(() => {
    return [...new Set(product.variants?.filter(v => v.attributes['Color'] === selectedColor).map(v => v.attributes['Size']) || [])];
  }, [product.variants, selectedColor]);
  
  useEffect(() => {
      const defaultVariant = product.variants?.[0];
      setSelectedColor(defaultVariant?.attributes['Color']);
      setSelectedSize(defaultVariant?.attributes['Size']);
      setCurrentVariant(defaultVariant);
      setActiveImageUrl(defaultVariant?.imageUrl || product.imageUrl);
  }, [product]);

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
        const variant = product.variants?.find(v => v.attributes['Color'] === selectedColor && v.attributes['Size'] === selectedSize);
        setCurrentVariant(variant);
        if (variant?.imageUrl) {
            setActiveImageUrl(variant.imageUrl);
        }
    } else {
        setCurrentVariant(undefined);
        const firstVariantOfColor = product.variants?.find(v => v.attributes['Color'] === selectedColor && v.imageUrl);
        setActiveImageUrl(firstVariantOfColor?.imageUrl || product.imageUrl);
    }
  }, [selectedColor, selectedSize, product.variants, product.imageUrl]);

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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
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
    };
    onAddToCart(product, quantity, currentVariant);
    alert(`Added ${product.name} (${currentVariant.attributes['Color']}, ${currentVariant.attributes['Size']}) from sticky bar!`);
  };

  const handleBuyNowClick = () => {
    if (!currentVariant) return;
    setIsProcessing(true);
    onDirectBuyNow(product, quantity, currentVariant);
  };

  const handlePincodeCheck = () => {
    if (!pincode || pincode.length < 6) {
      setPincodeStatus({ type: 'error', message: 'Please enter a valid 6-digit pincode.' });
      return;
    }
    setTimeout(() => {
      if (pincode === "400001" || pincode === "110001") {
        setPincodeStatus({ type: 'success', message: `✓ Delivery available for Pincode ${pincode}. Estimated 3-5 days.` });
      } else {
        setPincodeStatus({ type: 'error', message: `✗ Delivery not available for Pincode ${pincode}.` });
      }
    }, 500);
  };

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewRating === 0) {
        setReviewSubmissionStatus('error');
        setReviewSubmissionMessage('Please select a rating.');
        return;
    }
    if (!reviewText.trim()) {
        setReviewSubmissionStatus('error');
        setReviewSubmissionMessage('Please write your review.');
        return;
    }
    setReviewSubmissionStatus('submitting');
    setReviewSubmissionMessage('');

    console.log("Submitting review:", { name: reviewName, rating: reviewRating, text: reviewText, productId: product.id });
    
    setTimeout(() => {
        setReviewSubmissionStatus('success');
        setReviewSubmissionMessage('Thank you! Your review has been submitted (simulated).');
        setReviewName('');
        setReviewRating(0);
        setReviewText('');
        setShowReviewForm(false); 
    }, 1500);
  };

  const deliveryAndPolicyAccordionItems = [
    {
      id: 'delivery-returns',
      title: <span><span role="img" aria-label="Delivery Truck">🚚</span> DELIVERY & RETURNS</span>,
      content: (
        <div className="space-y-4 text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary">
          <h4 className="font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary">Available Shipping Methods</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-zaina-sky-blue-light dark:bg-dark-zaina-sky-blue-light/50">
                <tr>
                  <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">Shipping Method</th>
                  <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">Shipping To</th>
                  <th className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium font-medium">Shipping Charge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">Pre-Paid</td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">All over India</td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">Free</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">COD Charges</td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">All over India</td>
                  <td className="p-2 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>For more details please read our <a href="#" onClick={(e) => {e.preventDefault(); onNavigateToPage('policy', policyContents.shipping)}} className="text-zaina-primary dark:text-dark-zaina-primary hover:underline">Shipping Policy</a>.</p>
          
          <h4 className="font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary pt-2">Return Policy</h4>
          <p>Your satisfaction is our top priority. If you're not completely satisfied with the product, we offer a hassle-free, no-questions-asked 10-day return and refund. We believe in making your shopping experience risk-free and enjoyable.</p>
          <p>For more details please read our <a href="#" onClick={(e) => {e.preventDefault(); onNavigateToPage('policy', policyContents.returns)}} className="text-zaina-primary dark:text-dark-zaina-primary hover:underline">Return and Cancellation Policy</a>.</p>
        </div>
      )
    },
    {
      id: 'product-declaration',
      title: <span><span role="img" aria-label="Document">📄</span> PRODUCT DECLARATION</span>,
      content: (
        <p className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary leading-relaxed">
          This product is crafted from high-quality materials, ensuring both comfort and durability. All Zaina Collection items are authentic and undergo rigorous quality checks. For specific care instructions, please refer to the Fabric & Care tab or the product label. Warranty, if applicable, will be detailed in the product packaging or accompanying documents.
        </p>
      )
    },
    {
      id: 'help-contact',
      title: <span><span role="img" aria-label="Question Mark">❓</span> HAVE A QUESTION? WE ARE HERE TO HELP!</span>,
      content: (
        <div className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary space-y-1">
          <p><strong>📞 Phone:</strong> 011-41169005</p>
          <p><strong>🕘 Hours:</strong> Monday – Saturday, 9:30am – 6:30pm (IST)</p>
          <p>You can also reach out via our <a href="#" onClick={(e) => {e.preventDefault(); onNavigateToPage('contact')}} className="text-zaina-primary dark:text-dark-zaina-primary hover:underline">Contact Page</a>.</p>
        </div>
      )
    }
  ];

  if (product.specifications && product.specifications.filter(s => s.key && s.value).length > 0) {
    deliveryAndPolicyAccordionItems.unshift({
        id: 'specifications',
        title: <span><span role="img" aria-label="List">📝</span> SPECIFICATIONS</span>,
        content: (
            <ul className="space-y-2 text-sm">
                {product.specifications.filter(s => s.key && s.value).map((spec, index) => (
                    <li key={index} className="flex justify-between">
                        <span className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary">{spec.key}:</span>
                        <span className="font-medium text-zaina-text-primary dark:text-dark-zaina-text-primary">{spec.value}</span>
                    </li>
                ))}
            </ul>
        )
    });
  }


  const productReviews: Testimonial[] = []; 

  const relatedProducts = allProducts.filter(
    p => p.id !== product.id && p.publishStatus === 'Published' && (p.category === product.category)
  ).slice(0, 10);

  const priceToShow = currentVariant?.price ?? product.price;
  const mrpToShow = product.mrp;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.imageUrl,
    "description": product.description,
    "sku": currentVariant?.sku || product.sku || product.id,
    "mpn": currentVariant?.sku || product.sku || product.id,
    "brand": { "@type": "Brand", "name": "ZAINA COLLECTION" },
    ...(product.rating ? {
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": product.rating.toFixed(1), "reviewCount": (productReviews.length + Math.floor(Math.random() * 20)) }
    } : {}),
    "offers": {
      "@type": "Offer", "url": window.location.href, "priceCurrency": "INR", "price": priceToShow.toFixed(2),
      "priceValidUntil": new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": (currentVariant?.stockQuantity ?? product.stockQuantity ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": { "@type": "Organization", "name": "ZAINA COLLECTION" }
    }
  };
  
  const getStockMessage = () => {
    if (!selectedColor) return { text: "Select a color", color: "text-zaina-text-secondary" };
    if (!selectedSize) return { text: "Select a size", color: "text-zaina-text-secondary" };
    
    if (currentVariant) {
      if (currentVariant.stockQuantity === 0) return { text: "Out of Stock", color: "text-zaina-deep-red-accent dark:text-red-400" };
      if (currentVariant.stockQuantity < 5) return { text: `Only ${currentVariant.stockQuantity} left!`, color: "text-zaina-alert-orange dark:text-dark-zaina-alert-orange" };
      return { text: "In Stock", color: "text-green-600 dark:text-green-400" };
    }

    return { text: "Unavailable", color: "text-zaina-deep-red-accent dark:text-red-400" };
  };
  const stockInfo = getStockMessage();
  
  const addToCartDisabled = !currentVariant || (currentVariant?.stockQuantity ?? 0) === 0;
  const buyNowDisabled = isProcessing || !currentVariant || (currentVariant?.stockQuantity ?? 0) === 0;

  const breadcrumbCategory = { label: product.category, pageName: 'shop' as PageName, category: product.category };

  const allImages = useMemo(() => {
    const imageUrls = new Set<string>();
    
    if (product.imageUrl) {
        imageUrls.add(product.imageUrl);
    }
    
    if (product.images) {
        product.images.forEach(img => imageUrls.add(img));
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
  
  return (
    <div className="bg-zaina-neutral-light dark:bg-dark-zaina-neutral-light min-h-screen py-8 md:py-12 font-body-jost">
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-body-jost text-zaina-text-secondary dark:text-dark-zaina-text-secondary">
          <ol className="list-none p-0 inline-flex items-center">
            <li className="flex items-center">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('home'); }} className="hover:text-zaina-primary dark:hover:text-dark-zaina-primary">Home</a>
              <ChevronRightIcon className="w-4 h-4 mx-1" />
            </li>
            <li className="flex items-center">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigateToPage('shop', { category: breadcrumbCategory.category || product.category }); }} 
                className="hover:text-zaina-primary dark:hover:text-dark-zaina-primary"
              >
                {breadcrumbCategory.label}
              </a>
              <ChevronRightIcon className="w-4 h-4 mx-1" />
            </li>
            <li aria-current="page" className="truncate max-w-[150px] sm:max-w-xs">
              {product.name}
            </li>
          </ol>
        </nav>

        <div ref={mainProductActionsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Image Gallery Section */}
          <div className="flex flex-col md:flex-row gap-4 lg:sticky lg:top-[160px]">
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-2 order-first md:order-none md:max-h-[500px] overflow-y-auto pr-1 custom-scrollbar-thin">
                {allImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={`w-16 h-20 md:w-20 md:h-24 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ease-in-out hover:opacity-100 hover:border-zaina-gold dark:hover:border-zaina-gold
                                ${activeImageUrl === imgUrl ? 'border-zaina-gold dark:border-zaina-gold opacity-100 scale-105' : 'border-transparent opacity-70'}`}
                    onMouseEnter={() => setActiveImageUrl(imgUrl)}
                    onClick={() => setActiveImageUrl(imgUrl)}
                  />
                ))}
              </div>
            )}
            <div className="flex-grow aspect-w-3 aspect-h-4 md:aspect-w-4 md:aspect-h-5 rounded-lg overflow-hidden shadow-lg bg-zaina-white dark:bg-dark-zaina-bg-card group/mainimg">
              <img 
                src={activeImageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/mainimg:scale-105" 
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="text-zaina-text-primary dark:text-dark-zaina-text-primary">
            <h1 className="text-3xl md:text-4xl font-heading-playfair font-bold mb-3">{product.name}</h1>
            {product.rating && (
              <div className="mb-3 flex items-center">
                <RatingStars rating={product.rating} color='text-zaina-gold dark:text-zaina-gold' />
                <span className="ml-2 text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary">({product.rating.toFixed(1)} stars, {productReviews.length} reviews)</span>
              </div>
            )}
            <div className="flex items-baseline mb-4">
              <p className="text-2xl md:text-3xl font-semibold text-zaina-gold dark:text-zaina-gold">
                ₹{priceToShow.toFixed(2)}
              </p>
              {mrpToShow > priceToShow && (
                <span className="ml-3 text-lg text-zaina-text-secondary dark:text-dark-zaina-text-secondary line-through">₹{mrpToShow.toFixed(2)}</span>
              )}
              <span className={`ml-4 text-sm font-semibold ${stockInfo.color}`}>{stockInfo.text}</span>
            </div>
            
            <p className="text-zaina-text-secondary dark:text-dark-zaina-text-secondary mb-6 leading-relaxed">
              {product.description}
            </p>
            
            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div className="mb-4">
                <span className="text-sm font-semibold">Color: <span className="font-normal">{selectedColor}</span></span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border-2 transition-all
                        ${selectedColor === color ? 'border-zaina-primary dark:border-dark-zaina-primary shadow-md' : 'border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium'}`}
                        style={{backgroundColor: color?.toLowerCase()}}
                        title={color}
                    >
                       <span className="opacity-0">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selector */}
            {availableSizesForSelectedColor.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">Size: {selectedSize}</span>
                    <button onClick={() => setIsSizeGuideModalOpen(true)} className="text-sm text-zaina-primary dark:text-dark-zaina-primary hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizesForSelectedColor.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border-2 transition-all duration-200
                        ${selectedSize === size
                          ? 'bg-zaina-primary dark:bg-dark-zaina-primary border-zaina-primary dark:border-dark-zaina-primary text-zaina-white dark:text-dark-zaina-text-primary shadow-md'
                          : 'bg-zaina-white dark:bg-dark-zaina-bg-card border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium hover:border-zaina-primary dark:hover:border-dark-zaina-primary'}
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-6 flex items-center gap-4">
              <p className="text-sm font-semibold flex-shrink-0">Quantity:</p>
              <div className="flex items-center border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium rounded-md">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 text-zaina-primary dark:text-dark-zaina-primary hover:bg-zaina-sky-blue-light/50 dark:hover:bg-dark-zaina-sky-blue-light/30 rounded-l-md"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2 text-zaina-text-primary dark:text-dark-zaina-text-primary">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 text-zaina-primary dark:text-dark-zaina-primary hover:bg-zaina-sky-blue-light/50 dark:hover:bg-dark-zaina-sky-blue-light/30 rounded-r-md"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button 
                onClick={handleAddToCartClick}
                disabled={addToCartDisabled}
                className="w-full bg-zaina-primary dark:bg-dark-zaina-primary text-zaina-white dark:text-dark-zaina-text-primary font-semibold py-3 px-6 rounded-md hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addToCartDisabled ? 'Unavailable' : 'Add to Cart'}
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
                <button onClick={() => onToggleWishlist(product)} className="flex items-center text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary">
                    <HeartIcon className={`w-5 h-5 mr-1.5 ${isWishlisted ? 'text-zaina-deep-red-accent' : ''}`} isFilled={isWishlisted} />
                    {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
                 <button onClick={() => onToggleCompare(product)} className="flex items-center text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary">
                    <span className="font-bold mr-1.5">+</span>
                    {isProductInCompare(product.id) ? 'Added to Compare' : 'Add to Compare'}
                </button>
            </div>
            
            <div className="space-y-4">
              {deliveryAndPolicyAccordionItems.map(item => (
                <Accordion key={item.id} identifier={item.id} title={item.title}>
                  {item.content}
                </Accordion>
              ))}
            </div>

          </div>
        </div>

        <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
            {product.longDescriptionHtml && (
                <section className="bg-zaina-white dark:bg-dark-zaina-bg-card p-6 md:p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-heading-cormorant font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary mb-4">From the Designer</h2>
                    <div className="prose prose-lg max-w-none text-zaina-text-secondary dark:text-dark-zaina-text-secondary"
                         dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.longDescriptionHtml) }}>
                    </div>
                </section>
            )}

            {product.bannerImageUrl && (
                <section>
                    <a href={product.bannerLink || '#'} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img src={product.bannerImageUrl} alt="Promotional Banner" className="w-full h-auto"/>
                    </a>
                </section>
            )}

            {relatedProducts.length > 0 && (
                <section>
                    <MiniProductCarousel
                        title="You May Also Like"
                        products={relatedProducts}
                        onProductQuickView={onProductQuickView}
                        onProductQuickShop={onProductQuickShop}
                        onProductCardClick={(p) => onNavigateToPage('productDetail', p)}
                        onToggleWishlist={onToggleWishlist}
                        isProductInWishlist={isProductInWishlist}
                        onToggleCompare={onToggleCompare}
                        isProductInCompare={isProductInCompare}
                    />
                </section>
            )}
            
            {product.faqs && product.faqs.length > 0 && (
                <section>
                    <h2 className="text-2xl font-heading-cormorant font-semibold text-center text-zaina-text-primary dark:text-dark-zaina-text-primary mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {product.faqs.filter(faq => faq.question && faq.answer).map((faq, index) => (
                            <Accordion key={index} identifier={`faq-${index}`} title={faq.question}>
                                <p className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary leading-relaxed">{faq.answer}</p>
                            </Accordion>
                        ))}
                    </div>
                </section>
            )}
        </div>
        
        {/* Recently Viewed Products Carousel */}
        <RecentlyViewedProducts
             products={recentlyViewedProducts}
             onProductQuickView={onProductQuickView}
             onProductQuickShop={onProductQuickShop}
             onProductCardClick={onNavigateToPage.bind(null, 'productDetail')}
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

      <Modal isOpen={isSizeGuideModalOpen} onClose={() => setIsSizeGuideModalOpen(false)} title="Size Guide" size="lg">
        <div dangerouslySetInnerHTML={{ __html: policyContents.sizeGuide.htmlContent || "" }} />
      </Modal>

      <style>{`
        .prose h2, .prose h3 { font-family: 'Cormorant Garamond', serif; color: inherit; }
        .prose p { color: inherit; }
        .prose a { color: #4A90E2; }
        html.dark .prose a { color: #63B3ED; }
      `}</style>
    </div>
  );
};