
import React, { useState, useEffect } from 'react';
import { NavLinkItem, AdminNavLink, Product, Order, Coupon, AdminUser, CmsPage, Customer, OrderStatus, MediaFile, Testimonial, Notification, PageName, Category, VariantAttribute, HeroSlide, OccasionContent, CuratedLook, EmotionCategory, ShoppableVideo, StoreSettings, SeoSettings, ThemeSettings, FooterSettings, SiteSettingsBundle, MarketingCampaign, ProductReview, UserProfile, SupportTicket, Faq, FloatingInfo, ShippingZone, ShippingProvider, PaymentGateway, IntegrationsSettings } from '../../types';
import { ADMIN_DASHBOARD_NAV_LINKS } from '../../constants';
import AdminLayout from '../dashboard/admin/AdminLayout';

// Import all section components
import AdminOverviewSection from '../dashboard/admin/AdminOverviewSection';
import AdminOrderManagementSection from '../dashboard/admin/AdminOrderManagementSection';
import AdminProductManagementSection from '../dashboard/admin/AdminProductManagementSection';
import { AdminCustomerManagementSection } from '../dashboard/admin/AdminCustomerManagementSection';
import AdminInventorySection from '../dashboard/admin/AdminInventorySection';
import AdminAnalyticsSection from '../dashboard/admin/AdminAnalyticsSection';
import AdminCouponsSection from '../dashboard/admin/AdminCouponsSection';
import AdminRolesSection from '../dashboard/admin/AdminRolesSection';
import AdminSecuritySection from '../dashboard/admin/AdminSecuritySection';
import AdminCategoryManagementSection from '../dashboard/admin/AdminCategoryManagementSection';
import AdminStoreSettingsSection from '../dashboard/admin/AdminStoreSettingsSection';
import AdminPendingOrdersSection from '../dashboard/admin/AdminPendingOrdersSection';
import AdminShippedOrdersSection from '../dashboard/admin/AdminShippedOrdersSection';
import AdminReturnedOrdersSection from '../dashboard/admin/AdminReturnedOrdersSection';
import AdminOrderStatusTrackerSection from '../dashboard/admin/AdminOrderStatusTrackerSection';
import AdminTagsSection from '../dashboard/admin/AdminTagsSection';
import AdminVariantsSection from '../dashboard/admin/AdminVariantsSection';
import AdminBulkUploadSection from '../dashboard/admin/AdminBulkUploadSection';
import AdminCustomerGroupsSection from '../dashboard/admin/AdminCustomerGroupsSection';
import AdminWishlistsSection from '../dashboard/admin/AdminWishlistsSection';
import AdminFeedbackSection from '../dashboard/admin/AdminFeedbackSection';
import AdminEmailCampaignsSection from '../dashboard/admin/AdminEmailCampaignsSection';
import AdminPushNotificationsSection from '../dashboard/admin/AdminPushNotificationsSection';
import AdminSocialAdsSection from '../dashboard/admin/AdminSocialAdsSection';
import { AdminTestimonialsSection } from '../dashboard/admin/AdminTestimonialsSection';
import AdminBlogSection from '../dashboard/admin/AdminBlogSection';
import AdminFaqSection from '../dashboard/admin/AdminFaqSection';
import AdminCustomPagesSection from '../dashboard/admin/AdminCustomPagesSection';
import AdminReviewsSection from '../dashboard/admin/AdminReviewsSection';
import AdminShippingSection from '../dashboard/admin/AdminShippingSection';
import AdminPaymentsSection from '../dashboard/admin/AdminPaymentsSection';
import AdminThemeSettingsSection from '../dashboard/admin/AdminThemeSettingsSection';
import AdminIntegrationsSection from '../dashboard/admin/AdminIntegrationsSection';
import AdminSupportTicketsSection from '../dashboard/admin/AdminSupportTicketsSection';
import AdminHelpArticlesSection from '../dashboard/admin/AdminHelpArticlesSection';
import AdminChatLogsSection from '../dashboard/admin/AdminChatLogsSection';
import AdminNotificationsSection from '../dashboard/admin/AdminNotificationsSection';
import AdminSeoSettingsSection from '../dashboard/admin/AdminSeoSettingsSection';
import AdminAddProductSection from '../dashboard/admin/AdminAddProductSection';
import AdminShoppableVideosSection from '../dashboard/admin/AdminShoppableVideosSection';
import AdminOrderDetailModal from '../dashboard/admin/AdminOrderDetailModal';
import AdminUpdateStockModal from '../dashboard/admin/AdminUpdateStockModal';
import AdminCustomerDetailModal from '../dashboard/admin/AdminCustomerDetailModal';
import AdminMediaManagerSection from '../dashboard/admin/AdminMediaManagerSection';
import AdminHeroSliderSection from '../dashboard/admin/AdminHeroSliderSection';
import AdminOccasionsSection from '../dashboard/admin/AdminOccasionsSection';
import AdminLooksSection from '../dashboard/admin/AdminLooksSection';
import AdminEmotionsSection from '../dashboard/admin/AdminEmotionsSection';
import AdminHeaderManagerSection from '../dashboard/admin/AdminHeaderManagerSection';
import AdminFooterManagerSection from '../dashboard/admin/AdminFooterManagerSection';
import AdminProfileSection from '../dashboard/admin/AdminProfileSection';
import AdminFloatingInfoSection from '../dashboard/admin/AdminFloatingInfoSection';


interface AdminDashboardPageProps {
  navigateToPage: (page: PageName, data?: any) => void;
  initialSection?: string;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: AdminUser | null;
  
  // Data props from App state
  products: Product[];
  allOrders: Order[];
  allCustomers: Customer[];
  allCoupons: Coupon[];
  adminUsers: AdminUser[];
  supportTickets: SupportTicket[];
  siteSettings: SiteSettingsBundle | null;
  marketingCampaigns: MarketingCampaign[];
  reviews: ProductReview[];
  faqs: Faq[];
  categories: Category[];
  variantAttributes: VariantAttribute[];
  wishlistAnalytics: any[];
  mediaLibrary: MediaFile[];
  shippingZones: ShippingZone[];
  shippingProviders: ShippingProvider[];
  paymentGateways: PaymentGateway[];

  // Handler props from App state
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onSaveAdminUser: (user: AdminUser) => void;
  onDeleteAdminUser: (userId: string) => void;
  onSaveCoupon: (coupon: Coupon) => Promise<boolean>;
  onDeleteCoupon: (couponId: string) => Promise<boolean>;
  onSaveSupportTicket: (ticket: SupportTicket) => void;
  onBulkUploadProducts: (products: Product[], counts: { created: number; updated: number }) => void;
  onSaveSiteSettings: (settings: SiteSettingsBundle) => Promise<boolean>;
  onSaveReview: (review: ProductReview) => void;
  onDeleteReview: (reviewId: string) => void;
  onSaveFaq: (faq: Faq) => Promise<boolean>;
  onDeleteFaq: (faqId: string) => Promise<boolean>;
  onSaveProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number, variantSku?: string) => void;
  onSaveCategory: (category: Category, parentId: string | null) => void;
  onDeleteCategory: (categoryId: string) => void;
  onSaveVariantAttribute: (attribute: VariantAttribute) => void;
  onDeleteVariantAttribute: (attributeId: string) => void;
  onAddValueToAttribute: (attributeId: string, value: string) => void;
  onDeleteValueFromAttribute: (attributeId: string, value: string) => void;
  onUploadMedia: (files: File[]) => void;
  onDeleteMedia: (fileId: string) => void;
  onToggleCustomerBlock: (customerId: string) => void;
  onSaveShippingZone: (zone: ShippingZone) => Promise<boolean>;
  onSaveShippingProvider: (provider: ShippingProvider) => Promise<boolean>;
  onSavePaymentGateway: (gateway: PaymentGateway) => Promise<boolean>;

  // New CMS props
  heroSlides: HeroSlide[];
  onSaveHeroSlide: (slide: HeroSlide) => void;
  onDeleteHeroSlide: (slideId: string) => void;
  shoppableVideos: ShoppableVideo[];
  onSaveShoppableVideo: (video: ShoppableVideo) => void;
  onDeleteShoppableVideo: (videoId: string) => void;
  testimonials: Testimonial[];
  onSaveTestimonial: (testimonial: Testimonial) => void;
  onDeleteTestimonial: (testimonialId: string) => void;
  occasions: OccasionContent[];
  onSaveOccasion: (occasion: OccasionContent) => void;
  onDeleteOccasion: (occasionId: string) => void;
  looks: CuratedLook[];
  onSaveLook: (look: CuratedLook) => void;
  onDeleteLook: (lookId: string) => void;
  emotions: EmotionCategory[];
  onSaveEmotion: (emotion: EmotionCategory) => void;
  onDeleteEmotion: (emotionId: string) => void;
  cmsPages: CmsPage[];
  onSaveCmsPage: (page: CmsPage) => void;
  onDeleteCmsPage: (pageId: string) => void;
  floatingInfo: FloatingInfo[];
  onSaveFloatingInfo: (info: FloatingInfo) => void;
  onDeleteFloatingInfo: (infoId: string) => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = (props) => {
  const { 
    navigateToPage, initialSection, onLogout, isDarkMode, toggleDarkMode, currentUser,
    products, allOrders, allCustomers, allCoupons, adminUsers, supportTickets,
    onUpdateOrderStatus,
    onSaveAdminUser, onDeleteAdminUser, onSaveCoupon, onDeleteCoupon, onSaveSupportTicket, onBulkUploadProducts,
    onSaveSiteSettings, siteSettings, marketingCampaigns,
    reviews, onSaveReview, onDeleteReview,
    faqs, onSaveFaq, onDeleteFaq, onSaveProduct, onUpdateStock,
    categories, onSaveCategory, onDeleteCategory,
    variantAttributes, onSaveVariantAttribute, onDeleteVariantAttribute,
    onAddValueToAttribute, onDeleteValueFromAttribute,
    onUploadMedia, onDeleteMedia, mediaLibrary, wishlistAnalytics, onToggleCustomerBlock,
    shippingZones, shippingProviders, onSaveShippingZone, onSaveShippingProvider,
    paymentGateways, onSavePaymentGateway,
    // CMS Props
    heroSlides, onSaveHeroSlide, onDeleteHeroSlide,
    shoppableVideos, onSaveShoppableVideo, onDeleteShoppableVideo,
    testimonials, onSaveTestimonial, onDeleteTestimonial,
    occasions, onSaveOccasion, onDeleteOccasion,
    looks, onSaveLook, onDeleteLook,
    emotions, onSaveEmotion, onDeleteEmotion,
    cmsPages, onSaveCmsPage, onDeleteCmsPage,
    floatingInfo, onSaveFloatingInfo, onDeleteFloatingInfo
  } = props;
  
  const [activeTab, setActiveTab] = useState(initialSection || 'dashboard');
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [stockUpdateTarget, setStockUpdateTarget] = useState<{product: Product, variantSku?: string} | null>(null);

  const handleNavLinkClick = (id: string) => {
      if (id === 'logout') {
          onLogout();
      } else {
          setActiveTab(id);
          setProductToEdit(null); // Clear editing state when navigating
      }
  };
  
  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setActiveTab('products_add');
  };

  const handleSaveProductAndSwitch = (productData: Product) => {
    onSaveProduct(productData);
    setActiveTab('products_all');
    setProductToEdit(null);
  };

  const handleCancelEdit = () => {
    setActiveTab('products_all');
    setProductToEdit(null);
  };

  const navLinksWithAction = ADMIN_DASHBOARD_NAV_LINKS.map(link => {
    if (!('id' in link)) {
      return link;
    }
    return {
        ...link,
        action: () => handleNavLinkClick(link.id)
    }
  });

  const renderActiveTabContent = () => {
    switch (activeTab) {
      // Main
      case 'dashboard': return <AdminOverviewSection navigateToPage={navigateToPage} />;
      case 'notifications': return <AdminNotificationsSection onNotificationClick={handleNavLinkClick}/>;
      
      // E-Commerce
      case 'orders_all': return <AdminOrderManagementSection orders={allOrders} onUpdateStatus={onUpdateOrderStatus} onViewOrder={setViewingOrder} />;
      case 'orders_pending': return <AdminPendingOrdersSection orders={allOrders} onUpdateStatus={onUpdateOrderStatus} onViewOrder={setViewingOrder} />;
      case 'orders_shipped': return <AdminShippedOrdersSection orders={allOrders} onUpdateStatus={onUpdateOrderStatus} onViewOrder={setViewingOrder} />;
      case 'orders_returned': return <AdminReturnedOrdersSection orders={allOrders} onUpdateStatus={onUpdateOrderStatus} onViewOrder={setViewingOrder} />;
      case 'orders_tracker': return <AdminOrderStatusTrackerSection orders={allOrders} onUpdateStatus={onUpdateOrderStatus} />;

      case 'products_all': return <AdminProductManagementSection onEditProduct={handleEditProduct} />;
      case 'products_add': return <AdminAddProductSection 
                                    products={products} 
                                    onSave={handleSaveProductAndSwitch} 
                                    onCancel={handleCancelEdit} 
                                    productToEdit={productToEdit}
                                    onUploadMedia={onUploadMedia}
                                    mediaLibrary={mediaLibrary}
                                    variantAttributes={variantAttributes}
                                    categories={categories}
                                  />;
      case 'products_categories': return <AdminCategoryManagementSection categories={categories} onSaveCategory={onSaveCategory} onDeleteCategory={onDeleteCategory} />;
      case 'products_tags': return <AdminTagsSection products={products} />;
      case 'products_variants': return <AdminVariantsSection attributes={variantAttributes} onSaveAttribute={onSaveVariantAttribute} onDeleteAttribute={onDeleteVariantAttribute} onAddValue={onAddValueToAttribute} onDeleteValue={onDeleteValueFromAttribute} />;
      case 'inventory_all': return <AdminInventorySection products={products} onUpdateStockClick={(p, v) => setStockUpdateTarget({product: p, variantSku: v})}/>;
      case 'inventory_upload': return <AdminBulkUploadSection products={products} onBulkSaveProducts={onBulkUploadProducts} />;
      case 'customers_all': return <AdminCustomerManagementSection customers={allCustomers} onViewDetails={setViewingCustomer} onToggleBlock={onToggleCustomerBlock} />;
      case 'customers_groups': return <AdminCustomerGroupsSection />;
      case 'customers_wishlist': return <AdminWishlistsSection wishlistAnalytics={wishlistAnalytics} />;
      case 'customers_feedback': return <AdminFeedbackSection reviews={reviews} onSaveReview={onSaveReview} onDeleteReview={onDeleteReview} />;
      case 'marketing_coupons': return <AdminCouponsSection initialCoupons={allCoupons} onSave={onSaveCoupon} onDelete={onDeleteCoupon} />;
      case 'marketing_email': return <AdminEmailCampaignsSection />;
      case 'marketing_push': return <AdminPushNotificationsSection />;
      case 'marketing_social': return <AdminSocialAdsSection />;
      case 'reviews_all': return <AdminReviewsSection reviews={reviews} onSaveReview={onSaveReview} onDeleteReview={onDeleteReview} />;
      
      // Content
      case 'media': return <AdminMediaManagerSection media={mediaLibrary} onUpload={onUploadMedia} onDelete={onDeleteMedia} />;
      case 'cms_sliders': return <AdminHeroSliderSection slides={heroSlides} onSave={onSaveHeroSlide} onDelete={onDeleteHeroSlide} mediaLibrary={mediaLibrary} onUploadMedia={onUploadMedia}/>;
      case 'cms_banners': return <AdminShoppableVideosSection initialVideos={shoppableVideos} onSave={onSaveShoppableVideo} onDelete={onDeleteShoppableVideo} allProducts={products} mediaLibrary={mediaLibrary} onUploadMedia={onUploadMedia} />;
      case 'cms_testimonials': return <AdminTestimonialsSection testimonials={testimonials} onSave={onSaveTestimonial} onDelete={onDeleteTestimonial} />;
      case 'cms_blog': return <AdminBlogSection pages={cmsPages.filter(p=>p.type === 'post')} onSavePage={onSaveCmsPage} onDeletePage={onDeleteCmsPage} mediaLibrary={mediaLibrary} onUploadMedia={onUploadMedia} />;
      case 'cms_faq': return <AdminFaqSection faqs={faqs} onSaveFaq={onSaveFaq} onDeleteFaq={onDeleteFaq} />;
      case 'cms_pages': return <AdminCustomPagesSection initialPages={cmsPages.filter(p=>p.type === 'page')} onSavePage={onSaveCmsPage} onDeletePage={onDeleteCmsPage} mediaLibrary={mediaLibrary} onUploadMedia={onUploadMedia} />;
      case 'cms_occasions': return <AdminOccasionsSection occasions={occasions} onSave={onSaveOccasion} onDelete={onDeleteOccasion} mediaLibrary={mediaLibrary} onUploadMedia={onUploadMedia} />;
      case 'cms_looks': return <AdminLooksSection looks={looks} onSave={onSaveLook} onDelete={onDeleteLook} mediaLibrary={mediaLibrary} onUploadMedia={onUploadMedia} />;
      case 'cms_emotions': return <AdminEmotionsSection emotions={emotions} onSave={onSaveEmotion} onDelete={onDeleteEmotion} mediaLibrary={mediaLibrary} onUploadMedia={onUploadMedia} />;
      case 'cms_floating_info': return <AdminFloatingInfoSection items={floatingInfo} onSave={onSaveFloatingInfo} onDelete={onDeleteFloatingInfo} />;

      // Platform
      case 'shipping_zones': return <AdminShippingSection shippingZones={shippingZones} shippingProviders={shippingProviders} onSaveZone={onSaveShippingZone} onSaveProvider={onSaveShippingProvider} />;
      case 'payments_methods':
      case 'payments_logs': return <AdminPaymentsSection orders={allOrders} paymentGateways={paymentGateways} onSaveGateway={onSavePaymentGateway} />;
      
      case 'analytics_sales': return <AdminAnalyticsSection orders={allOrders} products={products} customers={allCustomers} />;
      
      case 'users_admins': 
      case 'users_roles': return <AdminRolesSection initialAdminUsers={adminUsers} onSaveUser={onSaveAdminUser} onDeleteUser={onDeleteAdminUser} />;
      case 'users_history': return <AdminSecuritySection />;
      
      // Platform - Settings
      case 'settings_store':
        if (!siteSettings) return <p>Loading settings...</p>;
        return <AdminStoreSettingsSection
          storeSettings={siteSettings.storeSettings}
          onSaveStoreSettings={(s: StoreSettings) => onSaveSiteSettings({ ...siteSettings, storeSettings: s })}
        />;
      case 'settings_header':
        if (!siteSettings) return <p>Loading settings...</p>;
        return <AdminHeaderManagerSection
            headerLinks={siteSettings.headerLinks}
            onSaveHeaderLinks={(links: NavLinkItem[]) => onSaveSiteSettings({ ...siteSettings, headerLinks: links })}
        />
      case 'settings_footer':
        if (!siteSettings) return <p>Loading settings...</p>;
        return <AdminFooterManagerSection
            footerSettings={siteSettings.footerSettings}
            onSaveFooterSettings={(fs: FooterSettings) => onSaveSiteSettings({ ...siteSettings, footerSettings: fs })}
        />
      case 'settings_seo':
        if (!siteSettings) return <p>Loading settings...</p>;
        return <AdminSeoSettingsSection
            seoSettings={siteSettings.seoSettings}
            onSaveSeoSettings={(ss: SeoSettings) => onSaveSiteSettings({ ...siteSettings, seoSettings: ss })}
        />
      case 'settings_theme':
        if (!siteSettings) return <p>Loading settings...</p>;
        return <AdminThemeSettingsSection
            themeSettings={siteSettings.themeSettings}
            onSaveThemeSettings={(ts: ThemeSettings) => onSaveSiteSettings({ ...siteSettings, themeSettings: ts })}
        />;
      case 'settings_integrations':
        if (!siteSettings) return <p>Loading settings...</p>;
        return <AdminIntegrationsSection
            integrations={siteSettings.integrations}
            onSaveIntegrations={(i: IntegrationsSettings) => onSaveSiteSettings({ ...siteSettings, integrations: i })}
        />;

      case 'admin_profile': return <AdminProfileSection user={currentUser} />;
      
      // Support
      case 'support_tickets': return <AdminSupportTicketsSection initialTickets={supportTickets} onSaveTicket={onSaveSupportTicket} />;
      case 'support_help': return <AdminHelpArticlesSection 
          pages={cmsPages.filter(p => p.type === 'page')} 
          onSavePage={onSaveCmsPage}
          onDeletePage={onDeleteCmsPage}
          mediaLibrary={mediaLibrary}
          onUploadMedia={onUploadMedia}
        />;
      case 'support_chat': return <AdminChatLogsSection />;
      
      // Default to overview for unimplemented sections
      default: return <AdminOverviewSection navigateToPage={navigateToPage} />;
    }
  };
  
  const findLabel = (links: AdminNavLink[], id: string): string | undefined => {
    for (const link of links) {
        if (!('id' in link)) continue;
        if (link.id === id) return link.label;
        if (link.subLinks) {
            const found = findLabel(link.subLinks, id);
            if (found) return found;
        }
    }
    return undefined;
  };
  
  let activeLink = findLabel(ADMIN_DASHBOARD_NAV_LINKS, activeTab);
  if (activeTab === 'products_add') {
    activeLink = productToEdit ? 'Edit Product' : 'Add New Product';
  } else if (activeTab === 'admin_profile') {
    activeLink = 'My Profile';
  }
  
  return (
    <>
      <AdminLayout
          navLinks={navLinksWithAction}
          activeNavLinkId={activeTab}
          onNavLinkClick={handleNavLinkClick}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          pageTitle={activeLink || 'Dashboard'}
          onLogout={onLogout}
          onNavigate={navigateToPage}
          currentUser={currentUser as UserProfile | null}
      >
          {renderActiveTabContent()}
      </AdminLayout>

      <AdminOrderDetailModal order={viewingOrder} onClose={() => setViewingOrder(null)} />
      <AdminCustomerDetailModal customer={viewingCustomer} orders={allOrders} onClose={() => setViewingCustomer(null)} />
      <AdminUpdateStockModal
          target={stockUpdateTarget}
          onClose={() => setStockUpdateTarget(null)}
          onSave={onUpdateStock}
      />
    </>
  );
};

export default AdminDashboardPage;
