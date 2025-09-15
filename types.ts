

import React from 'react';

// Centralized Page and Role Definitions
export type AdminRole = 'Super Admin' | 'Product Manager' | 'Order Manager' | 'Support Manager' | 'Content Editor' | 'Analytics Viewer';
export type PageName = 'home' | 'shop' | 'productDetail' | 'about' | 'contact' | 'auth' | 'cart' | 'checkout' | 'policy' | 'userDashboard' | 'adminDashboard' | 'blogIndex' | 'blogPost' | 'notFound';
export type UserRole = 'user' | 'admin' | AdminRole | null;


export interface Brand {
  id: string;
  name: string;
}

export interface Category {
  id:string;
  name: string;
  slug : string;
  parentId?: string | null;
  subCategories: Category[];
}

export interface VariantAttribute {
  id: string;
  name: string; // e.g., "Size", "Color"
  values: string[]; // e.g., ["S", "M", "L"] or ["Red", "Blue"]
}


export interface Vendor {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  price: number; // Selling Price
  mrp: number; // Product MRP (Maximum Retail Price)
  imageUrl: string;
  images?: string[]; // For multiple images
  
  // For localStorage persistence to avoid quota errors
  primaryImageId?: string;
  galleryImageIds?: string[];
  
  hoverImageUrl?: string;
  fabricDetailImageUrl?: string; 
  modelImageUrl?: string; 
  isNew?: boolean;
  isBestSeller?: boolean;
  isJewellery?: boolean;
  rating?: number; 
  category: string;
  subCategory?: string;
  description: string;
  tags?: string[]; 
  occasion?: string; 
  emotion?: string; 
  sku?: string;
  stockQuantity?: number; // Base stock, overridden by variants if they exist
  variants?: ProductVariant[];
  brand?: string;
  gender?: 'Male' | 'Female' | 'Unisex' | 'Kids';
  isTaxable?: boolean;
  specifications?: { key: string; value: string }[];
  vendor?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishStatus?: 'Draft' | 'Published' | 'Hidden';
  reviews?: ProductReview[];

  // New fields for enhanced product page
  longDescriptionHtml?: string;
  bannerImageUrl?: string;
  bannerLink?: string;
  faqs?: { question: string; answer: string }[];

  // Deprecated top-level fields, now part of variants
  sizes?: string[];
  colors?: string[];
  discountPercentage?: number;
}


export interface ProductVariant {
  id: string;
  attributes: { [key: string]: string }; // e.g., { "Color": "Red", "Size": "M" }
  price: number;
  stockQuantity: number;
  sku: string;
  imageUrl?: string;
}

export interface HeroSlide {
  id: string;
  imageUrl: string; 
  backgroundAnimationImageUrl?: string; 
  modelImageUrl?: string; 
  title?: string; 
  caption?: string; 
  ctaText?: string; 
  ctaLink?: string; 
  ratingText?: string; 
  order: number;
  isActive: boolean;
}

export interface ShoppableVideo {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  tag?: string;
  featuredProductIds: string[];
}

export enum ZainaColor {
  // Updated General Palette based on latest instructions
  PrimarySky = '#4A90E2',         // Powdery Blue / Secondary Blue (for interactive elements)
  SecondaryPink = '#F4C434',      // Mustard Yellow (accents, hover effects)
  AccentLavender = '#9ACCBF',     // Mint Green (trust-building UI)
  CtaPeach = '#AF4474',           // Raspberry Pink (CTA buttons, offer tags, banners)
  
  TextPrimary = '#2C3E50',        // Deep Slate Blue (headers, main text) - Updated HEX

  NeutralLight = '#F8F9FA',       // Off White / Cool White (main light backgrounds) - Updated HEX
  NeutralMedium = '#E9ECEF',      // Light Cool Gray / Cool Gray Medium (cards, borders, input bg) - Updated HEX
  
  // Adjusted utility colors (tints of new primary/text)
  SkyBlueLight = '#DAE7F3',       // Lighter tint of new PrimarySky #4A90E2
  SlateGray = '#BDC3C7',          // General Slate Gray / Silver Accent - Updated HEX

  // Kept from old palette for specific uses or if gradually phasing out
  CoolGrayLight = '#F1F3F5',    
  CoolGrayDark = '#DEE2E6',     
  White = '#FFFFFF',             
  SilverAccent = '#BDC3C7',      // Now same as SlateGray
  DeepRedAccent = '#B42B2B',     

  // Semantic aliases (will automatically update based on above definitions)
  Primary = PrimarySky,                 
  SecondaryBlue = PrimarySky, 
  
  CoolWhite = NeutralLight,             
  DeepNavy = TextPrimary,               

  // General purpose colors often used in UI
  Success = '#28a745', 
  Warning = '#ffc107', 
  Error = DeepRedAccent, 
}

export type MenuTag = 'NEW' | 'HOT' | 'SALE';

export interface MegaMenuColumn {
  id: string;
  title: string;
  links: NavLinkItem[];
}

export interface NavLinkItem {
  id: string;
  label: string;
  href: string; 
  type: 'link' | 'dropdown' | 'mega';
  order: number;
  isSpecial?: boolean; 
  icon?: React.FC<any>; 
  iconUrl?: string; // For image icons
  subLinks?: NavLinkItem[];
  megaMenuColumns?: MegaMenuColumn[];
  pageName?: PageName; 
  category?: string; 
  visible: boolean;
  tag?: MenuTag | '';
}


export interface CuratedLook {
  id: string;
  title: string;
  imageUrl: string;
  productIds: string[]; 
  description: string;
}

export interface Testimonial {
  id: string;
  userImage: string;
  userName: string;
  userHandle?: string;
  quote: string;
  productImageUrl?: string; 
  rating?: number; // Added rating for reviews
  approved?: boolean;
}

export interface OccasionContent {
  id: string;
  name: string; 
  title: string; 
  description: string; 
  imageUrl: string; 
}

export interface EmotionCategory {
  id:string;
  name: string; 
  emotionTag: string; 
  imageUrl: string; 
  description: string; 
}

export interface ActivityFeedItem {
  id: string; 
  message: string; 
  timestamp: Date; 
}

export interface FloatingInfo {
  id: string;
  corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  text: string; 
  triggerSectionId?: string; 
}

export interface GuidedDiscoveryPath {
  id: string;
  prompt: string; 
  targetFilters: { 
    occasion?: string;
    category?: string;
    tags?: string[];
    emotion?: string;
    size?: string;
  };
}

export interface MobileFooterLink {
  id: string;
  label: string;
  icon: React.FC<any>; 
  href: string;
  ariaLabel: string;
  pageName?: PageName;
}

export interface PolicyContent {
  title: string;
  content?: string; 
  htmlContent?: string; 
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant: ProductVariant;
}

export interface CartItemForCheckout {
  productId: string;
  quantity: number;
  variant: ProductVariant;
}


// Dashboard Specific Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
  phone?: string;
  dateOfBirth?: string;
  profilePictureUrl?: string;
  joinDate?: string;
  wishlistProductIds?: string[];
  recentlyViewedProductIds?: string[];
}

export interface Address {
  id: string;
  userId: string;
  type: 'shipping' | 'billing';
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  brand: string;
  isDefault?: boolean;
}


export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded' | 'Returned';

export interface OrderItem extends Product {
  quantity: number;
  selectedVariant: ProductVariant;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  userId: string;
  orderDate: string; // ISO string
  customerName: string; // Simplified for now, could be customerId
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber?: string;
  paymentType?: string; // Added for filtering
  deliveryType?: 'standard' | 'fast';
  deliveryCharge?: number;
  appliedCouponCode?: string;
  discountAmount?: number;
  transactionId?: string;
  paymentStatus?: 'Success' | 'Failed' | 'Pending';
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  lastUpdated: string; // ISO string
  createdAt: string; // ISO string
  messages: {
    sender: 'user' | 'admin';
    text: string;
    timestamp: string; // ISO string
  }[];
  assignedTo?: string; // Admin User ID
}

export interface AdminDashboardStats {
  totalSales: number;
  newOrders: number;
  totalCustomers: number;
  lowStockItems: number;
  revenueChartData?: { month: string; revenue: number }[]; // For 30 days
  liveVisitors?: number; // Added
  activeAdminSessions?: number; // Added
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string; // ISO string
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string; // ISO string
  profilePictureUrl?: string;
  isBlocked?: boolean; // Added
}

// Advanced Admin Dashboard Types
export interface AdminUser extends Omit<UserProfile, 'role'> {
  role: AdminRole;
  lastLogin?: string; // ISO string
  isActive: boolean;
}


export type CouponType = 'percentage' | 'fixed_amount' | 'bogo'; // BOGO = Buy One Get One

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number; // Percentage or fixed amount
  description?: string; // e.g., "Buy 1 Anarkali, Get 1 Kurti Free" for BOGO
  startDate?: string; // ISO string
  endDate?: string; // ISO string
  usageLimit?: number;
  usageCount?: number;
  isActive: boolean;
  rules?: string; // Text field for complex rules
}

export interface HomepageBanner {
    id: string;
    title: string;
    imageUrl: string;
    ctaLink: string;
    isActive: boolean;
    order: number;
}

export interface CmsPage {
  id: string;
  type: 'page' | 'post';
  title: string;
  slug: string;
  content: string; // Holds HTML content
  metaTitle: string;
  metaDescription: string;
  status: 'Published' | 'Draft';
  lastUpdated: string; // ISO string
  lastUpdatedBy: string; // Admin User Name
  featuredImageUrl?: string;
}

export interface AdminActivityLogItem {
    id: string;
    timestamp: string; // ISO string
    adminUserId: string;
    adminUserName: string;
    action: string; // e.g., "Logged In", "Updated Product SKU-123", "Changed Order O-456 Status to Shipped"
    ipAddress?: string;
    details?: string; // Optional: More details about the action
}

// Admin NavLink Types
export interface AdminNavLinkItem extends NavLinkItem {
  subLinks?: NavLinkItem[];
  action?: () => void;
}
export interface AdminNavHeader {
    type: 'header';
    label: string;
}
export type AdminNavLink = AdminNavLinkItem | AdminNavHeader;

export interface MediaFile {
  id: string;
  name: string;
  url: string; // Can be a path or a base64 data URL
  size: number; // in bytes
  type: 'image' | 'video';
  createdAt: string; // ISO string
}

// Notification System Types
export type NotificationType = 'order' | 'user' | 'payment' | 'inventory' | 'support' | 'general';
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    seen: boolean;
    timestamp: string; // ISO String
    link?: {
        page: PageName;
        data?: any;
    };
}


// --- Site Settings ---

export interface StoreSettings {
    name: string;
    tagline: string;
    supportEmail: string;
    supportPhone: string;
    instagramUrl: string;
    facebookUrl: string;
    twitterUrl: string;
    logoUrl?: string;
    faviconUrl?: string;
}

export interface SeoSettings {
    homepageTitle: string;
    homepageDescription: string;
    metaKeywords: string[];
}

export interface ThemeSettings {
    colorPrimary: string; 
    colorGold: string;
    colorCtaBlue: string;
    fontBody: string; 
    fontHeadingDisplay: string;
    fontHeadingCormorant: string;
}

// --- Dynamic Footer Settings ---
export interface FooterLink {
  id: string;
  label: string;
  href: string;
}
export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}
export interface FooterSettings {
  columns: FooterColumn[];
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  copyrightText: string;
}

// --- Integrations ---
export interface IntegrationsSettings {
    googleAnalyticsId: string;
}

export interface SiteSettingsBundle {
    storeSettings: StoreSettings;
    seoSettings: SeoSettings;
    themeSettings: ThemeSettings;
    headerLinks: NavLinkItem[];
    footerSettings: FooterSettings;
    integrations: IntegrationsSettings;
}


// --- New Types for Admin Panel Backend Connection ---
export interface MarketingCampaign {
  id: string;
  name: string;
  type: 'email' | 'push';
  subject?: string;
  content: string;
  status: 'Draft' | 'Sent' | 'Active';
  sentAt?: string;
  recipients?: number;
}

export interface CustomerGroup {
    id: string;
    name: string;
    memberCount: number;
    rules: string; // Text description of rules
}

export interface ShippingRate {
  id: string;
  name: string;
  price: number;
  condition?: 'min_order_value' | 'weight_based';
  conditionValue?: number; // e.g., 2000 for min order value of 2000
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  states: string[];
  postcodes: string[];
  rates: ShippingRate[];
}

export interface ShippingProvider {
  id: string;
  name: string; // e.g., 'Shiprocket'
  apiKey?: string;
  apiSecret?: string;
  enabled: boolean;
}


export interface PaymentGateway {
    id: string;
    name: string;
    enabled: boolean;
    settings: {
        apiKey?: string;
        apiSecret?: string;
    }
}

export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO string
  approved: boolean;
  user: { name: string };
  // For admin view, we include product info
  product?: { name: string; imageUrl: string };
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}