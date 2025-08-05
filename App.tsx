
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

// --- Import all components and constants ---
// Components
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSlider from './components/HeroSlider';
import ProductGrid from './components/ProductGrid';
import TestimonialsSlider from './components/TestimonialsSlider';
import QuickViewModal from './components/QuickViewModal';
import QuickShopModal from './components/QuickShopModal';
import CompareTray from './components/CompareTray';
import ShopByEmotion from './components/ShopByEmotion';
import ShopByLook from './components/ShopByLook';
import WhyZainaSection from './components/WhyZainaSection';
import BlogPreviewSection from './components/BlogPreviewSection';
import DynamicInfoElements from './components/DynamicInfoElements';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import MobileStickyFooter from './components/MobileStickyFooter';
import FirstOrderOfferModal from './components/FirstOrderOfferModal';
import GuidedDiscovery from './components/GuidedDiscovery';
import TrendingProductStrip from './components/TrendingProductStrip';
import ShoppableVideoCarouselSection from './components/ShoppableVideoCarouselSection';
import ShopByOccasion from './components/ShopByOccasion';
import InstagramBanner from './components/InstagramBanner';

// Pages
import ShopPage from './components/pages/ShopPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactPage from './components/pages/ContactPage';
import AuthPage from './components/pages/AuthPage';
import CartPage from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import PolicyPage from './components/pages/PolicyPage';
import UserDashboardPage from './components/pages/UserDashboardPage';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import BlogIndexPage from './components/pages/BlogIndexPage';
import BlogPostPage from './components/pages/BlogPostPage';
import NotFoundPage from './components/pages/NotFoundPage';


// Constants and Types
import {
    ZAINA_BRAND_NAME, INITIAL_FOOTER_SETTINGS
} from './constants';
import { Product, NavLinkItem, CartItemForCheckout, CartItem, ShoppableVideo, CmsPage, Testimonial, PageName, ProductVariant, UserRole, Category, HeroSlide, OccasionContent, CuratedLook, EmotionCategory, StoreSettings, ThemeSettings, UserProfile, FooterSettings, ActivityFeedItem, FloatingInfo, GuidedDiscoveryPath, AdminUser, SupportTicket, SiteSettingsBundle, MarketingCampaign, Order, ProductReview, Faq, VariantAttribute, OrderStatus, MediaFile, ShippingZone, ShippingProvider, PaymentGateway, Address, PaymentMethod, Coupon, IntegrationsSettings } from './types';
import { useScrollAnimation } from './hooks/useScrollAnimation';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

const defaultSiteSettings: SiteSettingsBundle = {
    storeSettings: {
        name: ZAINA_BRAND_NAME,
        tagline: 'Elegant Ethnic Fashion',
        supportEmail: 'support@zainacollection.com',
        supportPhone: '+91 123 456 7890',
        instagramUrl: '#',
        facebookUrl: '#',
        twitterUrl: '#',
        logoUrl: '',
        faviconUrl: '',
    },
    seoSettings: {
        homepageTitle: `${ZAINA_BRAND_NAME} - Official Site`,
        homepageDescription: 'Discover elegant ethnic fashion at ZAINA COLLECTION. Shop new arrivals, best sellers, and more.',
        metaKeywords: ['ethnic wear', 'indian fashion', 'saree', 'kurta'],
    },
    themeSettings: {
        colorPrimary: '#4A90E2',
        colorGold: '#D4AF37',
        colorCtaBlue: '#1F3FBA',
        fontBody: 'Poppins',
        fontHeadingDisplay: 'Playfair Display',
        fontHeadingCormorant: 'Cormorant Garamond',
    },
    headerLinks: [
        { id: 'home', label: 'Home', href: '/', type: 'link', order: 1, visible: true, pageName: 'home' },
        { id: 'shop', label: 'Shop', href: '/shop', type: 'link', order: 2, visible: true, pageName: 'shop' },
        { id: 'about', label: 'About Us', href: '/about', type: 'link', order: 3, visible: true, pageName: 'about' },
        { id: 'contact', label: 'Contact', href: '/contact', type: 'link', order: 4, visible: true, pageName: 'contact' },
    ],
    footerSettings: INITIAL_FOOTER_SETTINGS,
    integrations: {
        googleAnalyticsId: '',
    },
};

// --- App Component ---
export function App(): React.ReactElement {
  
  const useStickyState = <T,>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
      try {
        const stickyValue = window.localStorage.getItem(key);
        if (stickyValue !== null && stickyValue !== 'undefined') {
            return JSON.parse(stickyValue);
        }
      } catch (e) {
        console.error(`Error parsing JSON from localStorage key "${key}":`, e);
        return defaultValue;
      }
      return defaultValue;
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch(error) {
            console.error(`Could not save state for key "${key}" to localStorage:`, error);
        }
    }, [key, value]);

    return [value, setValue];
  };

  // --- STATE ---
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [pageData, setPageData] = useState<any>(null);

  // Modal & UI State
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);
  const [productForQuickShop, setProductForQuickShop] = useState<Product | null>(null);
  const [showFirstOrderOffer, setShowFirstOrderOffer] = useState(false);
  const [isCompareTrayOpen, setIsCompareTrayOpen] = useState(false);
  
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useStickyState(false, 'zaina-isLoggedIn');
  const [userRole, setUserRole] = useStickyState<UserRole>(null, 'zaina-userRole');
  const [currentUser, setCurrentUser] = useStickyState<UserProfile | AdminUser | null>(null, 'zaina-currentUser');
  const [loginRedirectTarget, setLoginRedirectTarget] = useState<{ page: PageName, data?: any } | null>(null);
  
  // Checkout State
  const [buyNowIntent, setBuyNowIntent] = useState<CartItemForCheckout | null>(null);

  // --- DYNAMIC PUBLIC DATA STATE (Fetched for storefront) ---
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [occasions, setOccasions] = useState<OccasionContent[]>([]);
  const [looks, setLooks] = useState<CuratedLook[]>([]);
  const [emotions, setEmotions] = useState<EmotionCategory[]>([]);
  const [shoppableVideos, setShoppableVideos] = useState<ShoppableVideo[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [guidedDiscoveryPaths, setGuidedDiscoveryPaths] = useState<GuidedDiscoveryPath[]>([]);
  const [cmsPages, setCmsPages] = useState<CmsPage[]>([]); 
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);
  const [floatingInfo, setFloatingInfo] = useState<FloatingInfo[]>([]);
  const [fashionGalleryImages, setFashionGalleryImages] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsBundle | null>(null);


  // --- USER-SPECIFIC DATA STATE ---
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [userSupportTickets, setUserSupportTickets] = useState<SupportTicket[]>([]);
  const [userPaymentMethods, setUserPaymentMethods] = useState<PaymentMethod[]>([]);


  // --- ADMIN-SPECIFIC DATA STATE ---
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [allCustomers, setAllCustomers] = useState<any[]>([]);
  const [allCoupons, setAllCoupons] = useState<Coupon[]>([]);
  const [mediaLibrary, setMediaLibrary] = useState<MediaFile[]>([]);
  const [variantAttributes, setVariantAttributes] = useState<VariantAttribute[]>([]);
  const [isGaConnected, setIsGaConnected] = useState(false);
  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [wishlistAnalytics, setWishlistAnalytics] = useState<any[]>([]);
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
  const [shippingProviders, setShippingProviders] = useState<ShippingProvider[]>([]);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([]);

  // Persisted UI State
  const [cartItems, setCartItems] = useStickyState<CartItem[]>([], 'zaina-cart');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isDarkMode, setIsDarkMode] = useStickyState(false, 'zaina-darkMode');

  // --- HOOKS & EFFECTS ---
  useScrollAnimation(currentPage);

  const isMongoDbId = (id: string): boolean => {
    if(!id) return false;
    return /^[0-9a-fA-F]{24}$/.test(id);
  };
  
   // Sync user preferences (wishlist, recently viewed) with state
  useEffect(() => {
    if (isLoggedIn && currentUser) {
        setWishlist(currentUser.wishlistProductIds || []);
        setRecentlyViewed(currentUser.recentlyViewedProductIds || []);
    } else {
        // Fallback to localStorage for guests
        const guestWishlist = JSON.parse(localStorage.getItem('zaina-guest-wishlist') || '[]');
        const guestRecent = JSON.parse(localStorage.getItem('zaina-guest-recent') || '[]');
        setWishlist(guestWishlist);
        setRecentlyViewed(guestRecent);
    }
  }, [isLoggedIn, currentUser]);

  // Persist guest preferences to localStorage
  useEffect(() => {
    if (!isLoggedIn) {
        localStorage.setItem('zaina-guest-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
        localStorage.setItem('zaina-guest-recent', JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed, isLoggedIn]);

  const fetchInitialData = useCallback(async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/site-data`);
        const data = response.data;
        
        setProducts(data.products || []);
        setCategories(data.categories || []);
        
        setHeroSlides(data.heroSlides || []);
        setOccasions(data.occasions || []);
        setLooks(data.looks || []);
        setEmotions(data.emotions || []);
        setShoppableVideos(data.shoppableVideos || []);
        setTestimonials(data.testimonials || []);
        setGuidedDiscoveryPaths(data.guidedDiscoveryPaths || []);
        setFashionGalleryImages(data.fashionGalleryImages || []);
        setCmsPages(data.cmsPages || []);
        setActivityFeed(data.activityFeed || []);
        setFloatingInfo(data.floatingInfo || []);
        setFaqs(data.faqs || []);

        if (data.siteSettings) {
            setSiteSettings(data.siteSettings);
        } else {
            console.warn("No site settings received from backend. Using default settings.");
            setSiteSettings(defaultSiteSettings);
        }

    } catch (error) {
        console.error("Failed to fetch initial site data from backend:", error);
        alert("Could not load site data. Please ensure the backend server is running and try refreshing the page.");
        console.warn("Using default site settings as a fallback after API failure.");
        setSiteSettings(defaultSiteSettings);
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('zaina-authToken');
    if (!token || !isLoggedIn) return;
    try {
        const response = await axios.get(`${API_BASE_URL}/user/dashboard-data`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        setCurrentUser(data.profile); // Update user profile with latest data
        setUserOrders(data.orders || []);
        setUserAddresses(data.addresses || []);
        setUserSupportTickets(data.supportTickets || []);
        setUserPaymentMethods(data.paymentMethods || []);
    } catch(err) {
        console.error("Failed to fetch user dashboard data", err);
        // Could be an expired token, log the user out
        performLogout();
    }
  }, [isLoggedIn]);

  const fetchAdminData = useCallback(async () => {
    const token = localStorage.getItem('zaina-authToken');
    if (!token) return;
    try {
        const [dashboardRes, reviewsRes, faqsRes, categoriesRes, variantsRes, wishlistRes, shippingZonesRes, shippingProvidersRes, paymentGatewaysRes] = await Promise.all([
             axios.get(`${API_BASE_URL}/admin/dashboard-all`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/reviews`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/faqs`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/categories`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/variant-attributes`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/analytics/wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
             axios.get(`${API_BASE_URL}/admin/shipping/zones`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/shipping/providers`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${API_BASE_URL}/admin/payments/gateways`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
        ]);
        
        const data = dashboardRes.data;
        setAllOrders(data.orders || []);
        setAllCustomers(data.customers || []);
        setAllCoupons(data.coupons || []);
        setAdminUsers(data.adminUsers || []);
        setMediaLibrary(data.mediaLibrary || []);
        setMarketingCampaigns(data.marketingCampaigns || []);
        if (data.siteSettings) {
            setSiteSettings(data.siteSettings);
        }
        
        setReviews(reviewsRes.data || []);
        setFaqs(faqsRes.data || []);
        setCategories(categoriesRes.data || []);
        setVariantAttributes(variantsRes.data || []);
        setWishlistAnalytics(wishlistRes.data || []);
        setShippingZones(shippingZonesRes.data || []);
        setShippingProviders(shippingProvidersRes.data || []);
        setPaymentGateways(paymentGatewaysRes.data || []);


    } catch (error) {
        console.error("Failed to fetch admin data", error);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
  
  useEffect(() => {
    if (isLoggedIn) {
        if (userRole === 'admin') {
            fetchAdminData();
        }
        fetchUserData(); // Fetch data for both regular users and admins
    }
  }, [isLoggedIn, userRole, fetchAdminData, fetchUserData]);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

   useEffect(() => {
      const root = document.documentElement;
      if (siteSettings) {
        root.style.setProperty('--theme-color-primary', siteSettings.themeSettings.colorPrimary);
        root.style.setProperty('--theme-color-gold', siteSettings.themeSettings.colorGold);
        root.style.setProperty('--theme-color-cta-blue', siteSettings.themeSettings.colorCtaBlue);
        document.body.style.fontFamily = `'${siteSettings.themeSettings.fontBody}', sans-serif`;
      }
  }, [siteSettings]);

    useEffect(() => {
        if (siteSettings?.storeSettings.faviconUrl) {
            const favicon = document.getElementById('favicon') as HTMLLinkElement | null;
            if (favicon) {
                favicon.href = siteSettings.storeSettings.faviconUrl;
            }
        }
    }, [siteSettings?.storeSettings.faviconUrl]);


  useEffect(() => {
    const firstVisit = localStorage.getItem('zainaFirstVisitDone');
    if (!firstVisit && currentPage === 'home') {
      const timer = setTimeout(() => {
        setShowFirstOrderOffer(true);
        localStorage.setItem('zainaFirstVisitDone', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);
  
   useEffect(() => {
    if (isLoggedIn && currentPage === 'auth') {
      let targetPage: PageName;
      let targetData: any = undefined;

      if (buyNowIntent) {
        targetPage = 'checkout';
      } else if (loginRedirectTarget) {
        targetPage = loginRedirectTarget.page;
        targetData = loginRedirectTarget.data;
        setLoginRedirectTarget(null); 
      } else {
        targetPage = userRole === 'admin' ? 'adminDashboard' : 'userDashboard';
      }
      navigateToPage(targetPage, targetData);
    }
  }, [isLoggedIn, userRole, currentPage, loginRedirectTarget, buyNowIntent]);


  // --- HANDLER FUNCTIONS ---
  
  const navigateToPage = useCallback(async (page: PageName, data: any = null) => {
    if (page === 'productDetail' && data?.id) {
      const productId = data.id;
      // Optimistic update for UI responsiveness
      setRecentlyViewed(prev => [productId, ...prev.filter(id => id !== productId)].slice(0, 10));

      if (isLoggedIn) {
        try {
            const token = localStorage.getItem('zaina-authToken');
            await axios.post(`${API_BASE_URL}/user/recently-viewed`, { productId }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (error) {
            console.error("Failed to sync recently viewed item", error);
            // Optionally revert optimistic update, though it's low-risk
        }
      }
    }

    if ((page === 'userDashboard' || page === 'adminDashboard') && !isLoggedIn) {
      setLoginRedirectTarget({ page, data });
      setCurrentPage('auth');
      setPageData(null);
      window.scrollTo(0, 0);
      return;
    }

    if (page === 'policy' && data?.slug) {
        const policyPageContent = cmsPages.find(p => p.slug === data.slug);
        if (policyPageContent) {
            setCurrentPage('policy');
            setPageData({ title: policyPageContent.title, htmlContent: policyPageContent.content });
        } else {
            setCurrentPage('notFound');
            setPageData(null);
        }
    } else {
        setCurrentPage(page);
        setPageData(data);
    }
    
    window.scrollTo(0, 0);
  }, [isLoggedIn, cmsPages]);
  
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Auth Handlers
  const handleLogin = async (credentials: {email: string, password: string}): Promise<{success: boolean, error?: string, role?: UserRole}> => {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        const { token, user } = response.data;
        localStorage.setItem('zaina-authToken', token);
        setIsLoggedIn(true);
        const role = user.role === 'ADMIN' ? 'admin' : 'user';
        setUserRole(role);
        setCurrentUser(user);
        
        setWishlist(user.wishlistProductIds || []);
        setRecentlyViewed(user.recentlyViewedProductIds || []);
        
        localStorage.removeItem('zaina-guest-wishlist');
        localStorage.removeItem('zaina-guest-recent');

        return { success: true, role: role };
      } catch (error: any) {
          return { success: false, error: error.response?.data?.message || 'Login failed.' };
      }
  };

  const handleRegister = async (credentials: {name: string, email: string, password: string}): Promise<{success: boolean, error?: string}> => {
      try {
        await axios.post(`${API_BASE_URL}/auth/register`, credentials);
        // Automatically log in after successful registration
        const loginResult = await handleLogin({ email: credentials.email, password: credentials.password });
        return { success: loginResult.success, error: loginResult.error };
      } catch (error: any) {
        return { success: false, error: error.response?.data?.message || 'Registration failed. Please try again.' };
      }
  };
  
  const performLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);
    setLoginRedirectTarget(null);
    setBuyNowIntent(null);
    setWishlist([]);
    setRecentlyViewed([]);
    localStorage.removeItem('zaina-authToken');
    localStorage.removeItem('zaina-isLoggedIn');
    localStorage.removeItem('zaina-userRole');
    localStorage.removeItem('zaina-currentUser');
    navigateToPage('home');
    alert("You have been logged out.");
  };

  // Modal Handlers
  const handleQuickView = (product: Product) => setSelectedProductForQuickView(product);
  const handleCloseQuickView = () => setSelectedProductForQuickView(null);
  const handleOpenQuickShop = (product: Product) => setProductForQuickShop(product);
  const handleCloseQuickShop = () => setProductForQuickShop(null);

  // Cart Handlers
  const addToCart = (product: Product, quantity: number, selectedVariant: ProductVariant) => {
    setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id && item.selectedVariant.id === selectedVariant.id);
        if (existingItemIndex > -1) {
            const newItems = [...prevItems];
            newItems[existingItemIndex].quantity += quantity;
            return newItems;
        }
        const productWithVariantPrice = { ...product, price: selectedVariant.price };
        return [...prevItems, { ...productWithVariantPrice, quantity, selectedVariant }];
    });
    const variantDesc = Object.entries(selectedVariant.attributes).map(([key, value]) => `${key}: ${value}`).join(', ');
    alert(`${quantity} x ${product.name} (${variantDesc}) added to cart!`);
  };

  const handleQuickShop = (product: Product) => {
    if (product.variants && product.variants.length > 0) {
        handleOpenQuickShop(product);
    } else {
        const fallbackVariant: ProductVariant = {
            id: `base-${product.id}`,
            attributes: { "Default": "One Size" },
            price: product.price,
            stockQuantity: product.stockQuantity ?? 1,
            sku: product.sku ?? product.id,
        };
        addToCart(product, 1, fallbackVariant);
    }
  };

  const handleDirectBuyNow = (product: Product, quantity: number, selectedVariant: ProductVariant) => {
    setBuyNowIntent({
        productId: product.id,
        quantity,
        variant: selectedVariant,
    });
    navigateToPage('checkout');
  };

  const handlePlaceOrder = async (order: any, guestDetails?: { email: string, createAccount: boolean, password?: string }) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        const response = await axios.post(`${API_BASE_URL}/orders`, { order, guestDetails }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (buyNowIntent) {
            setBuyNowIntent(null);
        } else {
            setCartItems([]);
        }
        if (response.data.token) {
            localStorage.setItem('zaina-authToken', response.data.token);
            setIsLoggedIn(true);
            setUserRole(response.data.user.role);
            setCurrentUser(response.data.user);
        }
        return { success: true, orderId: response.data.order.id };
    } catch(error: any) {
        return { success: false, error: error.response?.data?.message || "Order placement failed." };
    }
  };

  // Wishlist Handlers
  const isProductInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);
  
  const toggleWishlist = useCallback(async (product: Product) => {
    const productId = product.id;
    const isCurrentlyWishlisted = wishlist.includes(productId);

    // Optimistic UI update
    setWishlist(prev => 
        isCurrentlyWishlisted
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
    );

    if (isLoggedIn) {
        try {
            const token = localStorage.getItem('zaina-authToken');
            await axios.post(`${API_BASE_URL}/user/wishlist/toggle`, { productId }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (error) {
            console.error("Failed to sync wishlist", error);
            // Revert optimistic update on failure
            setWishlist(prev => 
                isCurrentlyWishlisted
                    ? [...prev, productId]
                    : prev.filter(id => id !== productId)
            );
            alert("Could not update wishlist. Please try again.");
        }
    }
  }, [wishlist, isLoggedIn]);
  
  // Compare Handlers
  const isProductInCompare = useCallback((productId: string) => compareList.some(p => p.id === productId), [compareList]);
  
  const toggleCompare = useCallback((product: Product) => {
      setCompareList(prev => {
          if (isProductInCompare(product.id)) {
              const newList = prev.filter(p => p.id !== product.id);
              if (newList.length === 0) setIsCompareTrayOpen(false);
              return newList;
          }
          if (prev.length < 4) {
              if (!isCompareTrayOpen) setIsCompareTrayOpen(true);
              return [...prev, product];
          }
          alert("You can only compare up to 4 products.");
          return prev;
      });
  }, [isProductInCompare, isCompareTrayOpen]);
  
  // --- USER DASHBOARD HANDLERS ---
  const onUpdateProfile = async (updatedProfile: UserProfile) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        await axios.put(`${API_BASE_URL}/user/profile`, updatedProfile, { headers: { Authorization: `Bearer ${token}` } });
        setCurrentUser(prev => ({...prev, ...updatedProfile} as UserProfile));
        alert('Profile saved successfully!');
    } catch(err) {
        alert('Failed to save profile.');
    }
  };

  const onChangePassword = async (passwords: { current: string; new: string }): Promise<{ success: boolean; message: string }> => {
     try {
        const token = localStorage.getItem('zaina-authToken');
        const response = await axios.put(`${API_BASE_URL}/user/change-password`, passwords, { headers: { Authorization: `Bearer ${token}` } });
        return { success: true, message: response.data.message };
     } catch (err: any) {
        return { success: false, message: err.response?.data?.message || "Password change failed." };
     }
  };

  const onSaveAddress = async (address: Address) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        if (userAddresses.some(a => a.id === address.id)) {
             await axios.put(`${API_BASE_URL}/user/addresses/${address.id}`, address, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            await axios.post(`${API_BASE_URL}/user/addresses`, address, { headers: { Authorization: `Bearer ${token}` } });
        }
        await fetchUserData(); // Re-fetch all user data
    } catch (err) {
        alert('Failed to save address.');
    }
  };
  
  const onDeleteAddress = async (addressId: string) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        await axios.delete(`${API_BASE_URL}/user/addresses/${addressId}`, { headers: { Authorization: `Bearer ${token}` } });
        await fetchUserData();
        alert('Address deleted.');
    } catch (err) {
        alert('Failed to delete address.');
    }
  };

  const onSaveSupportTicket = async (ticket: SupportTicket) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        if (userSupportTickets.some(t => t.id === ticket.id)) {
             await axios.put(`${API_BASE_URL}/user/support-tickets/${ticket.id}`, ticket, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            await axios.post(`${API_BASE_URL}/user/support-tickets`, ticket, { headers: { Authorization: `Bearer ${token}` } });
        }
        await fetchUserData();
    } catch (err) {
        alert('Failed to save support ticket.');
    }
  };


  // --- ADMIN HANDLERS ---
  const onSaveProduct = async (productData: Product) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        const headers = { Authorization: `Bearer ${token}` };
        
        const isUpdating = productData.id && isMongoDbId(productData.id);
        
        if (isUpdating) {
            await axios.put(`${API_BASE_URL}/admin/products/${productData.id}`, productData, { headers });
            alert('Product updated successfully!');
        } else {
            // For new products, remove the temporary ID before sending
            const { id, ...payload } = productData;
            await axios.post(`${API_BASE_URL}/admin/products`, payload, { headers });
            alert('Product created successfully!');
        }
        await fetchInitialData();
        if (userRole === 'admin') await fetchAdminData();
    } catch (err: any) {
        console.error("Error saving product:", err.response?.data || err.message);
        const errorMessage = err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
        alert('Failed to save product: ' + (errorMessage || 'Please check server logs for details.'));
    }
  };
  
  const onSaveCategory = async (category: Category, parentId: string | null) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        const headers = { Authorization: `Bearer ${token}` };
        
        const isUpdating = category.id && isMongoDbId(category.id);
        
        const payload = {
            name: category.name,
            parentId: parentId
        };
        
        if (isUpdating) {
            await axios.put(`${API_BASE_URL}/admin/categories/${category.id}`, payload, { headers });
        } else {
            await axios.post(`${API_BASE_URL}/admin/categories`, payload, { headers });
        }
        alert('Category saved successfully!');
        await fetchInitialData();
        if (userRole === 'admin') await fetchAdminData();
    } catch (err: any) {
        console.error("Error saving category:", err.response?.data || err.message);
        alert('Failed to save category. ' + (err.response?.data?.message || 'Please check console for details.'));
    }
  };

  const onSaveVariantAttribute = async (attribute: VariantAttribute) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        const headers = { Authorization: `Bearer ${token}` };

        const isUpdating = attribute.id && isMongoDbId(attribute.id);
        
        if (isUpdating) {
            await axios.put(`${API_BASE_URL}/admin/variant-attributes/${attribute.id}`, attribute, { headers });
        } else {
            const { id, ...payload } = attribute;
            await axios.post(`${API_BASE_URL}/admin/variant-attributes`, payload, { headers });
        }
        alert('Attribute saved successfully!');
        await fetchAdminData();
    } catch (err: any) {
        console.error("Error saving attribute:", err.response?.data || err.message);
        alert('Failed to save attribute. ' + (err.response?.data?.message || 'Please check console.'));
    }
  };
  
  const createCmsHandler = (endpoint: string, itemType: string) => async (item: any) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        const isUpdating = item.id && isMongoDbId(item.id);
        if (isUpdating) {
            await axios.put(`${API_BASE_URL}/admin/content/${endpoint}/${item.id}`, item, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            const { id, ...payload } = item;
            await axios.post(`${API_BASE_URL}/admin/content/${endpoint}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        }
        alert(`${itemType} saved successfully!`);
        await fetchInitialData();
        if (userRole === 'admin') await fetchAdminData();
    } catch (err: any) {
        alert(`Failed to save ${itemType}. ` + (err.response?.data?.message || ''));
    }
  };

  const deleteCmsHandler = (endpoint: string, itemType: string) => async (itemId: string) => {
    try {
        const token = localStorage.getItem('zaina-authToken');
        await axios.delete(`${API_BASE_URL}/admin/content/${endpoint}/${itemId}`, { headers: { Authorization: `Bearer ${token}` } });
        alert(`${itemType} deleted successfully!`);
        await fetchInitialData();
        if (userRole === 'admin') await fetchAdminData();
    } catch (err: any) {
        alert(`Failed to delete ${itemType}. ` + (err.response?.data?.message || ''));
    }
  };
  
  const createGenericCrudHandler = (endpoint: string, itemType: string) => {
    const onSave = async (item: any): Promise<boolean> => {
        try {
            const token = localStorage.getItem('zaina-authToken');
            const isUpdating = item.id && isMongoDbId(item.id);
            if (isUpdating) {
                await axios.put(`${API_BASE_URL}/admin/${endpoint}/${item.id}`, item, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                const { id, ...payload } = item;
                await axios.post(`${API_BASE_URL}/admin/${endpoint}`, payload, { headers: { Authorization: `Bearer ${token}` } });
            }
            alert(`${itemType} saved successfully!`);
            await fetchInitialData();
            if (userRole === 'admin') await fetchAdminData();
            return true;
        } catch (err: any) {
            alert(`Failed to save ${itemType}. ` + (err.response?.data?.message || ''));
            return false;
        }
    };

    const onDelete = async (itemId: string): Promise<boolean> => {
        if (!window.confirm(`Are you sure you want to delete this ${itemType.toLowerCase()}? This action cannot be undone.`)) return false;
        try {
            const token = localStorage.getItem('zaina-authToken');
            await axios.delete(`${API_BASE_URL}/admin/${endpoint}/${itemId}`, { headers: { Authorization: `Bearer ${token}` } });
            alert(`${itemType} deleted successfully!`);
            await fetchInitialData();
            if (userRole === 'admin') await fetchAdminData();
            return true;
        } catch (err: any) {
            alert(`Failed to delete ${itemType}. ` + (err.response?.data?.message || ''));
            return false;
        }
    };
    
    return { onSave, onDelete };
  };

  const { onSave: onSaveTestimonial, onDelete: onDeleteTestimonial } = createGenericCrudHandler('testimonials', 'Testimonial');
  const { onSave: onSaveFaq, onDelete: onDeleteFaq } = createGenericCrudHandler('faqs', 'FAQ');
  const { onSave: onSaveShippingZone } = createGenericCrudHandler('shipping/zones', 'Shipping Zone');
  const { onSave: onSaveAdminUser, onDelete: onDeleteAdminUser } = createGenericCrudHandler('users', 'Admin User');

  const onSaveCoupon = async (coupon: Coupon): Promise<boolean> => {
      try {
          const token = localStorage.getItem('zaina-authToken');
          const isUpdating = coupon.id && isMongoDbId(coupon.id);
          if (isUpdating) {
              await axios.put(`${API_BASE_URL}/admin/coupons/${coupon.id}`, coupon, { headers: { Authorization: `Bearer ${token}` } });
          } else {
              const { id, ...payload } = coupon;
              await axios.post(`${API_BASE_URL}/admin/coupons`, payload, { headers: { Authorization: `Bearer ${token}` } });
          }
          alert('Coupon saved successfully!');
          await fetchAdminData();
          return true;
      } catch (err: any) {
          alert('Failed to save coupon: ' + (err.response?.data?.message || err.message));
          return false;
      }
  };

  const onDeleteCoupon = async (couponId: string): Promise<boolean> => {
      if (!window.confirm("Are you sure you want to delete this coupon?")) return false;
      try {
          const token = localStorage.getItem('zaina-authToken');
          await axios.delete(`${API_BASE_URL}/admin/coupons/${couponId}`, { headers: { Authorization: `Bearer ${token}` } });
          alert('Coupon deleted.');
          await fetchAdminData();
          return true;
      } catch (err: any) {
          alert('Failed to delete coupon: ' + (err.response?.data?.message || err.message));
          return false;
      }
  };
  
  const onUploadMedia = async (files: File[]) => {
      for (const file of files) {
          try {
              const token = localStorage.getItem('zaina-authToken');
              const presignedRes = await axios.get(`${API_BASE_URL}/media/presigned-url`, {
                  params: { fileName: file.name, fileType: file.type },
                  headers: { Authorization: `Bearer ${token}` }
              });
              
              const { uploadUrl, fileUrl } = presignedRes.data;
              
              await axios.put(uploadUrl, file, { headers: { 'Content-Type': file.type } });
              
              await axios.post(`${API_BASE_URL}/admin/media`, {
                  name: file.name,
                  url: fileUrl,
                  size: file.size,
                  type: file.type.startsWith('video') ? 'video' : 'image',
              }, { headers: { Authorization: `Bearer ${token}` } });

          } catch (err: any) {
              console.error("Media upload failed:", err.response?.data || err.message);
              alert('Media upload failed. Please ensure your Google Cloud Storage (GCS) credentials are correctly configured in the backend .env file (google-credentials.json) as per the README.');
              return; // Stop on first failure
          }
      }
      alert(`${files.length} file(s) uploaded successfully!`);
      await fetchAdminData(); // Refresh media library
  };
  
  const onDeleteMedia = async (fileId: string) => {
      // This would also need a backend endpoint to delete from GCS
      try {
          const token = localStorage.getItem('zaina-authToken');
          await axios.delete(`${API_BASE_URL}/admin/media/${fileId}`, { headers: { Authorization: `Bearer ${token}` } });
          alert('Media deleted successfully.');
          await fetchAdminData();
      } catch(err: any) {
          alert('Failed to delete media file: ' + (err.response?.data?.message || ''));
      }
  };

  // --- RENDER LOGIC ---

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSlider slides={heroSlides} />
            <TrendingProductStrip 
                title="New Arrivals"
                products={products.filter(p => p.isNew).slice(0, 10)}
                onProductQuickView={handleQuickView}
                onProductQuickShop={handleQuickShop}
                onProductCardClick={(p) => navigateToPage('productDetail', p)}
                onToggleWishlist={toggleWishlist}
                isProductInWishlist={isProductInWishlist}
                onToggleCompare={toggleCompare}
                isProductInCompare={isProductInCompare}
            />
            <ShoppableVideoCarouselSection videos={shoppableVideos} allProducts={products} onQuickShop={handleQuickShop} />
            <ProductGrid
              title="Best Sellers"
              products={products.filter(p => p.isBestSeller)}
              onProductQuickView={handleQuickView}
              onProductQuickShop={handleQuickShop}
              onProductCardClick={(p) => navigateToPage('productDetail', p)}
              onToggleWishlist={toggleWishlist}
              isProductInWishlist={isProductInWishlist}
              onToggleCompare={toggleCompare}
              isProductInCompare={isProductInCompare}
            />
            <ShopByOccasion occasions={occasions} onOccasionSelect={(name) => navigateToPage('shop', { category: name })}/>
            <TestimonialsSlider testimonials={testimonials} />
            <BlogPreviewSection posts={cmsPages.filter(p => p.type === 'post').slice(0,3)} navigateToPage={navigateToPage}/>
            <InstagramBanner/>
          </>
        );
      case 'shop':
        return <ShopPage 
                    products={products} 
                    categories={categories}
                    onProductQuickView={handleQuickView} 
                    onProductQuickShop={handleQuickShop} 
                    onViewProductDetail={(p) => navigateToPage('productDetail', p)}
                    initialCategory={pageData?.category}
                    initialSearchTerm={pageData?.searchTerm}
                    onToggleWishlist={toggleWishlist}
                    isProductInWishlist={isProductInWishlist}
                    onToggleCompare={toggleCompare}
                    isProductInCompare={isProductInCompare}
                />;
      case 'productDetail':
        const viewedProducts = products.filter(p => recentlyViewed.includes(p.id));
        return pageData ? <ProductDetailPage 
                            product={pageData} 
                            allProducts={products}
                            onAddToCart={addToCart} 
                            onNavigateToPage={navigateToPage}
                            onProductQuickView={handleQuickView}
                            onProductQuickShop={handleQuickShop}
                            isLoggedIn={isLoggedIn}
                            onDirectBuyNow={handleDirectBuyNow}
                            onToggleWishlist={toggleWishlist}
                            isWishlisted={isProductInWishlist(pageData.id)}
                            isProductInWishlist={isProductInWishlist}
                            recentlyViewedProducts={viewedProducts}
                            onToggleCompare={toggleCompare}
                            isProductInCompare={isProductInCompare}
                          /> : <NotFoundPage navigateToPage={navigateToPage}/>;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactPage storeSettings={siteSettings!.storeSettings} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onRegister={handleRegister} navigateToPage={navigateToPage} />;
      case 'cart':
        return <CartPage navigateToPage={navigateToPage} initialCartItems={cartItems} updateCartItems={setCartItems} />;
      case 'checkout':
        return <CheckoutPage 
                    cartItems={cartItems} 
                    buyNowItem={buyNowIntent}
                    navigateToPage={navigateToPage}
                    onPlaceOrder={handlePlaceOrder}
                    products={products}
                    currentUser={currentUser}
                />;
      case 'policy':
        return <PolicyPage title={pageData?.title || 'Policy'} htmlContent={pageData?.htmlContent} />;
      case 'userDashboard':
        const wishlistP = products.filter(p => wishlist.includes(p.id));
        const recentP = products.filter(p => recentlyViewed.includes(p.id));
        return <UserDashboardPage 
                    navigateToPage={navigateToPage} 
                    initialSection={pageData?.section} 
                    onLogout={performLogout} 
                    wishlistProducts={wishlistP}
                    recentlyViewedProducts={recentP}
                    onToggleWishlist={toggleWishlist}
                    currentUser={currentUser}
                    orders={userOrders}
                    addresses={userAddresses}
                    supportTickets={userSupportTickets}
                    paymentMethods={userPaymentMethods}
                    onUpdateProfile={onUpdateProfile}
                    onChangePassword={onChangePassword}
                    onSaveAddress={onSaveAddress}
                    onDeleteAddress={onDeleteAddress}
                    onSaveSupportTicket={onSaveSupportTicket}
                />;
      case 'adminDashboard':
        return <AdminDashboardPage 
                    navigateToPage={navigateToPage} 
                    initialSection={pageData?.section} 
                    onLogout={performLogout} 
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    currentUser={currentUser as AdminUser | null}
                    products={products}
                    allOrders={allOrders}
                    allCustomers={allCustomers}
                    allCoupons={allCoupons}
                    adminUsers={adminUsers}
                    supportTickets={userSupportTickets} // Admins see user tickets
                    siteSettings={siteSettings}
                    marketingCampaigns={marketingCampaigns}
                    reviews={reviews}
                    faqs={faqs}
                    categories={categories}
                    variantAttributes={variantAttributes}
                    wishlistAnalytics={wishlistAnalytics}
                    mediaLibrary={mediaLibrary}
                    shippingZones={shippingZones}
                    shippingProviders={shippingProviders}
                    paymentGateways={paymentGateways}

                    // CMS Props
                    heroSlides={heroSlides}
                    shoppableVideos={shoppableVideos}
                    testimonials={testimonials}
                    occasions={occasions}
                    looks={looks}
                    emotions={emotions}
                    cmsPages={cmsPages}
                    floatingInfo={floatingInfo}
                    
                    // Handlers
                    onSaveProduct={onSaveProduct}
                    onSaveCategory={onSaveCategory}
                    onSaveVariantAttribute={onSaveVariantAttribute}
                    onDeleteCategory={() => {}}
                    onDeleteVariantAttribute={() => {}}
                    onAddValueToAttribute={() => {}}
                    onDeleteValueFromAttribute={() => {}}
                    onSaveCoupon={onSaveCoupon}
                    onDeleteCoupon={onDeleteCoupon}
                    onSaveHeroSlide={createCmsHandler('hero-slides', 'Hero Slide')}
                    onDeleteHeroSlide={deleteCmsHandler('hero-slides', 'Hero Slide')}
                    onSaveShoppableVideo={createCmsHandler('shoppable-videos', 'Shoppable Video')}
                    onDeleteShoppableVideo={deleteCmsHandler('shoppable-videos', 'Shoppable Video')}
                    onSaveTestimonial={onSaveTestimonial}
                    onDeleteTestimonial={onDeleteTestimonial}
                    onSaveOccasion={createCmsHandler('occasions', 'Occasion')}
                    onDeleteOccasion={deleteCmsHandler('occasions', 'Occasion')}
                    onSaveLook={createCmsHandler('looks', 'Look')}
                    onDeleteLook={deleteCmsHandler('looks', 'Look')}
                    onSaveEmotion={createCmsHandler('emotions', 'Emotion')}
                    onDeleteEmotion={deleteCmsHandler('emotions', 'Emotion')}
                    onSaveCmsPage={createCmsHandler('cms-pages', 'Page')}
                    onDeleteCmsPage={deleteCmsHandler('cms-pages', 'Page')}
                    onSaveFloatingInfo={createCmsHandler('floating-info', 'Floating Info')}
                    onDeleteFloatingInfo={deleteCmsHandler('floating-info', 'Floating Info')}
                    onSaveFaq={onSaveFaq}
                    onDeleteFaq={onDeleteFaq}
                    onSaveReview={() => {}}
                    onDeleteReview={() => {}}
                    onSaveSiteSettings={async () => true}
                    onUpdateStock={() => {}}
                    onUpdateOrderStatus={() => {}}
                    onSaveAdminUser={onSaveAdminUser}
                    onDeleteAdminUser={onDeleteAdminUser}
                    onToggleCustomerBlock={() => {}}
                    onSaveSupportTicket={() => {}}
                    onBulkUploadProducts={() => {}}
                    onUploadMedia={onUploadMedia}
                    onDeleteMedia={onDeleteMedia}
                    onSaveShippingZone={onSaveShippingZone}
                    onSaveShippingProvider={async () => true}
                    onSavePaymentGateway={async () => true}
                />;
      case 'blogIndex':
        return <BlogIndexPage posts={cmsPages.filter(p => p.type === 'post')} navigateToPage={navigateToPage} />;
      case 'blogPost':
        return pageData ? <BlogPostPage post={pageData} /> : <NotFoundPage navigateToPage={navigateToPage} />;
      default:
        return <NotFoundPage navigateToPage={navigateToPage}/>;
    }
  };

  if (!siteSettings) {
      return <div className="flex items-center justify-center h-screen bg-zaina-sky-blue-light">Loading Zaina Collection...</div>;
  }
  
  const isHomePage = currentPage === 'home';
  const pageContainerClass = `page-content ${isHomePage ? 'is-home' : ''}`;

  return (
    <>
      <Header
        navigateToPage={navigateToPage}
        onLogout={performLogout}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        cartItemCount={cartItems.length}
        wishlistItemCount={wishlist.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        storeName={siteSettings.storeSettings.name}
        headerLinks={siteSettings.headerLinks}
        logoUrl={siteSettings.storeSettings.logoUrl}
        products={products}
      />
      <main className={pageContainerClass}>
        {renderPage()}
      </main>
      
      {currentPage !== 'adminDashboard' && currentPage !== 'auth' && (
        <Footer navigateToPage={navigateToPage} footerSettings={siteSettings.footerSettings} />
      )}
      
      {currentPage !== 'adminDashboard' && currentPage !== 'auth' && <FloatingWhatsAppButton />}
      
      {currentPage !== 'adminDashboard' && currentPage !== 'auth' && <MobileStickyFooter navigateToPage={navigateToPage} />}

      <QuickViewModal
        isOpen={!!selectedProductForQuickView}
        onClose={handleCloseQuickView}
        product={selectedProductForQuickView}
      />
      
      <QuickShopModal 
        isOpen={!!productForQuickShop}
        onClose={handleCloseQuickShop}
        product={productForQuickShop}
        onAddToCart={addToCart}
      />
      
       <CompareTray 
        isOpen={isCompareTrayOpen}
        products={compareList}
        onClose={() => setIsCompareTrayOpen(false)}
        onRemoveFromComparison={(productId) => setCompareList(prev => prev.filter(p => p.id !== productId))}
        onViewProductDetail={(p) => navigateToPage('productDetail', p)}
      />

      <FirstOrderOfferModal 
        isOpen={showFirstOrderOffer}
        onClose={() => setShowFirstOrderOffer(false)}
        couponCode="WELCOME100"
      />
    </>
  );
}
