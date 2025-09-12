// import React, { useState, useEffect } from "react";
// import { Product, NavLinkItem, Category } from "../../types";
// import ProductGrid from "../ProductGrid";

// interface ShopPageProps {
//   products: Product[];
//   categories: Category[];
//   onProductQuickView: (product: Product) => void;
//   onProductQuickShop: (product: Product) => void;
//   onViewProductDetail: (product: Product) => void;
//   initialCategory?: string;
//   initialSearchTerm?: string;
//   onToggleWishlist: (product: Product) => void;
//   isProductInWishlist: (productId: string) => boolean;
//   onToggleCompare: (product: Product) => void;
//   isProductInCompare: (productId: string) => boolean;
// }

// const ShopPage: React.FC<ShopPageProps> = ({
//   products,
//   categories,
//   onProductQuickView,
//   onProductQuickShop,
//   onViewProductDetail,
//   initialCategory,
//   initialSearchTerm,
//   onToggleWishlist,
//   isProductInWishlist,
//   onToggleCompare,
//   isProductInCompare,
// }) => {
//   const [activeCategory, setActiveCategory] = useState(
//     initialCategory || "ALL"
//   );
//   const [pageTitle, setPageTitle] = useState("Shop Our Collection");
//   const [headerMessage, setHeaderMessage] = useState(
//     "Discover exquisite ethnic wear, curated for the modern woman."
//   );

//   const toLower = (v?: string | null) =>
//     typeof v === "string" ? v.toLowerCase() : "";

//   useEffect(() => {
//     if (initialSearchTerm) {
//       setActiveCategory("ALL"); // When searching, we don't filter by category
//       setPageTitle(`Search Results`);
//       setHeaderMessage(`Showing results for "${initialSearchTerm}"`);
//     } else if (initialCategory) {
//       setActiveCategory(initialCategory.toUpperCase());
//       setPageTitle(initialCategory.toUpperCase());
//       setHeaderMessage(`Explore our collection of ${initialCategory}.`);
//     } else {
//       setActiveCategory("ALL");
//       setPageTitle("Shop Our Collection");
//       setHeaderMessage(
//         "Discover exquisite ethnic wear, curated for the modern woman."
//       );
//     }
//   }, [initialCategory, initialSearchTerm]);

//   const categoriesList = [
//     { id: "all", label: "ALL" },
//     ...categories.map((cat) => ({
//       id: cat.id,
//       label: (cat.name ?? "").toUpperCase(),
//     })),
//   ];

//   // const getFilteredProducts = () => {
//   //   let filtered = products.filter(p => p.publishStatus === 'Published');

//   //   // First, filter by search term if it exists
//   //   if (initialSearchTerm) {
//   //     const term = initialSearchTerm.toLowerCase();
//   //     filtered = filtered.filter(p =>
//   //       p.name.toLowerCase().includes(term) ||
//   //       p.category.toLowerCase().includes(term) ||
//   //       p.description.toLowerCase().includes(term) ||
//   //       (p.tags && p.tags.some(tag => tag.toLowerCase().includes(term)))
//   //     );
//   //     return filtered;
//   //   }

//   //   // If no search term, filter by category
//   //   if (activeCategory === 'ALL') {
//   //     return filtered;
//   //   }

//   //   // Find the category and its subcategories
//   //   const selectedCat = categories.find(c => c.name.toUpperCase() === activeCategory);
//   //   const validCategoryNames = selectedCat ? [selectedCat.name, ...selectedCat.subCategories.map(sc => sc.name)] : [activeCategory];

//   //   return filtered.filter(p =>
//   //     validCategoryNames.some(name => p.category.toLowerCase() === name.toLowerCase())
//   //   );
//   // };

//   const getFilteredProducts = () => {
//     // Only published
//     let filtered = products.filter((p) => p.publishStatus === "Published");

//     // Search flow
//     if (initialSearchTerm) {
//       const term = toLower(initialSearchTerm);
//       filtered = filtered.filter((p) => {
//         const name = toLower(p.name);
//         const category = toLower(p.categoryName);
//         const description = toLower(p.description);
//         const hasTagMatch = (p.tags ?? []).some((tag) =>
//           toLower(tag).includes(term)
//         );
//         return (
//           name.includes(term) ||
//           category.includes(term) ||
//           description.includes(term) ||
//           hasTagMatch
//         );
//       });
//       return filtered;
//     }

//     // Category flow
//     if (activeCategory === "ALL") return filtered;

//     // Find the selected category safely
//     const selectedCat = categories.find(
//       (c) => (c.name ?? "").toUpperCase() === activeCategory
//     );

//     // Collect valid category names (parent + subcats), filter out empties
//     const validCategoryNames = selectedCat
//       ? ([
//           selectedCat.name,
//           ...(selectedCat.subCategories ?? []).map((sc) => sc?.name),
//         ].filter(Boolean) as string[])
//       : [activeCategory];

//     // Compare in lowercase only
//     return filtered.filter((p) => {
//       const prodCat = toLower(p.category);
//       return validCategoryNames.some((name) => prodCat === toLower(name));
//     });
//   };

//   const filteredProducts = getFilteredProducts();

//   return (
//     <div className="bg-zaina-sky-blue-light dark:bg-dark-zaina-neutral-light min-h-screen py-8 md:py-12">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <header className="mb-8 md:mb-12 text-center">
//           <h1 className="text-4xl md:text-5xl font-heading-playfair font-bold text-zaina-text-primary dark:text-dark-zaina-text-primary mb-3">
//             {pageTitle}
//           </h1>
//           <p className="text-lg text-zaina-text-secondary dark:text-dark-zaina-text-secondary font-body-jost">
//             {headerMessage}
//           </p>
//         </header>

//         {/* Category Tabs are hidden when searching */}
//         {!initialSearchTerm && (
//           <nav className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2 md:gap-4 border-b border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium pb-4">
//             {categoriesList.map((cat) => (
//               <button
//                 key={cat.id}
//                 onClick={() => {
//                   setActiveCategory(cat.label);
//                   setPageTitle(
//                     cat.label === "ALL" ? "All Products" : cat.label
//                   );
//                   setHeaderMessage(`Explore our collection of ${cat.label}.`);
//                 }}
//                 className={`py-2 px-4 md:py-2.5 md:px-6 rounded-md font-body-jost font-semibold text-sm md:text-base transition-all duration-300
//                   ${
//                     activeCategory === cat.label
//                       ? "bg-zaina-gold text-zaina-white dark:bg-zaina-gold dark:text-dark-zaina-text-primary shadow-md"
//                       : `bg-zaina-neutral-light dark:bg-dark-zaina-neutral-medium text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-primary/10 dark:hover:bg-dark-zaina-primary/20 hover:text-zaina-primary dark:hover:text-dark-zaina-primary`
//                   }
//                 `}
//               >
//                 {cat.label}
//               </button>
//             ))}
//           </nav>
//         )}

//         <ProductGrid
//           title={
//             initialSearchTerm
//               ? ""
//               : activeCategory === "ALL"
//               ? "All Products"
//               : ""
//           }
//           products={filteredProducts}
//           onProductQuickView={onProductQuickView}
//           onProductQuickShop={onProductQuickShop}
//           onProductCardClick={onViewProductDetail}
//           sectionBgColor="bg-transparent"
//           titleColor="text-zaina-text-primary dark:text-dark-zaina-text-primary"
//           onToggleWishlist={onToggleWishlist}
//           isProductInWishlist={isProductInWishlist}
//           onToggleCompare={onToggleCompare}
//           isProductInCompare={isProductInCompare}
//         />
//       </div>
//     </div>
//   );
// };

// export default ShopPage;

// src/pages/ShopPage.tsx
import React, { useEffect, useMemo, useState, useRef } from "react";

import SEO from "../SEO";
import { Product, Category, PageName } from "../../types";
import { slugify, findCategoryBySlug } from "../utils/slugs";
import ProductGrid from "../ProductGrid";

const imgExists = (src: string) =>
  new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });

const DESKTOP_BANNER_H = 498;
const MOBILE_BANNER_H = 210;

// Adjust these to your data flags
const specialSlugs = {
  newArrivals: "new-arrival",
  bestSellers: "best-sellers",
  // sale: "sale",
};

type Props = {
  products: Product[];
  categories: Category[];
  onProductQuickView: (product: Product) => void;
  onProductQuickShop: (product: Product) => void;
  onViewProductDetail?: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isProductInWishlist: (id: string) => boolean;
  onToggleCompare: (product: Product) => void;
  isProductInCompare: (id: string) => boolean;
  initialCategorySlug?: string;
  initialSearchTerm?: string;
  navigateToPage: (page: PageName, data?: any) => void;
  // If your grid is a separate component, import and use it here:

  // ProductGrid: React.ComponentType<...>  (or just use <ProductGrid /> directly)
};

const productMatchesCategorySlug = (p: Product, slug?: string) => {
  if (!slug) return true;

  // Special categories
  if (slug === specialSlugs.newArrivals) {
    // adapt to your flags/tags
    return (
      !!(p as any).isNew || (p.tags || []).some((t: string) => /new/i.test(t))
    );
  }
  if (slug === specialSlugs.bestSellers) {
    return (
      !!(p as any).isBestSeller ||
      (p.tags || []).some((t: string) => /best/i.test(t))
    );
  }
  // if (slug === specialSlugs.sale) {
  //   const hasDiscount =
  //     (!!(p as any).mrp &&
  //       !!(p as any).price &&
  //       (p as any).price < (p as any).mrp) ||
  //     (!!(p as any).discountPercentage && (p as any).discountPercentage > 0) ||
  //     (p.tags || []).some((t: string) => /sale|discount/i.test(t));
  //   return !!hasDiscount;
  // }

  // Normal categories use product.category string
  return slugify((p as any).category) === slug;
};

// Simple banner resolver. Put images in /public/banners/{slug}.jpg
const bannerSrcFor = (slug?: string) => {
  if (!slug) return "/new-arrival.png";
  return `/${slug}.png`; // fallback image names as per your assets
};

const ShopPage: React.FC<Props> = (props) => {
  const {
    products,
    categories,
    onProductQuickView,
    onProductQuickShop,
    onViewProductDetail,
    onToggleWishlist,
    isProductInWishlist,
    onToggleCompare,
    isProductInCompare,
    initialCategorySlug,
    initialSearchTerm,
    navigateToPage,
  } = props;

  const [activeSlug, setActiveSlug] = useState<string | undefined>(
    initialCategorySlug
  );
  const [resolvedBanner, setResolvedBanner] =
    useState<string>("/new-arrival.png");
  useEffect(() => {
    (async () => {
      const target = bannerSrcFor(activeSlug);
      const fallback = "/new-arrival.png";
      // try .png first, then .jpg, else fallback
      const candidates = [target, target.replace(".png", ".jpg")];
      for (const src of candidates) {
        if (await imgExists(src)) {
          setResolvedBanner(src);
          return;
        }
      }
      setResolvedBanner(fallback);
    })();
  }, [activeSlug]);

  const CategoryBanner: React.FC<{ src: string; alt: string }> = ({
    src,
    alt,
  }) => {
    const [loaded, setLoaded] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    // subtle parallax (max 12px translate)
    useEffect(() => {
      const onScroll = () => {
        if (!wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        // when banner is on screen, drift slower than scroll
        const progress = Math.min(
          1,
          Math.max(
            0,
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          )
        );
        setOffset(Math.round((progress - 0.5) * 24)); // -12..+12px
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <div ref={wrapRef} className="relative w-full h-auto bg-white">
        {/* skeleton while loading */}
        {/* <div className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}>
        <div className="h-[220px] md:h-[550px] bg-gray-100 animate-pulse" />
      </div> */}

        {/* banner image */}
        <picture>
          <img
            src={src}
            alt={alt}
            style={{ transform: `translateY(${offset}px)` }}
            className={`block w-full h-[250px] md:h-[550px] object-cover object-center select-none transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            draggable={false}
          />
        </picture>
      </div>
    );
  };

  // Derive active category data / texts
  const matchedCat = useMemo(
    () => findCategoryBySlug(categories, activeSlug),
    [categories, activeSlug]
  );

  const pageTitle = useMemo(() => {
    if (initialSearchTerm) return `Search: ${initialSearchTerm}`;
    if (matchedCat?.name) return matchedCat.name;
    if (activeSlug === specialSlugs.newArrivals) return "New Arrivals";
    if (activeSlug === specialSlugs.bestSellers) return "Best Sellers";
    // if (activeSlug === specialSlugs.sale) return "Sale";
    return "Shop Our Collection";
  }, [initialSearchTerm, matchedCat, activeSlug]);

  const pageDescription = useMemo(() => {
    if (initialSearchTerm)
      return `Explore "${initialSearchTerm}" across our latest Zaina Collection picks.`;
    if (matchedCat?.name)
      return `Explore ${matchedCat.name} from Zaina Collection — premium styles curated for you.`;
    if (activeSlug === specialSlugs.newArrivals)
      return "Fresh arrivals, handpicked for your wardrobe.";
    if (activeSlug === specialSlugs.bestSellers)
      return "Our best-selling styles loved by customers.";
    // if (activeSlug === specialSlugs.sale)
    //   return "Limited-time offers on selected pieces — don’t miss out!";
    return "Discover exquisite ethnic wear, curated for the modern woman.";
  }, [initialSearchTerm, matchedCat, activeSlug]);

  useEffect(() => {
    // keep state in sync when url changes
    setActiveSlug(initialCategorySlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [initialCategorySlug]);

  useEffect(() => {
    (async () => {
      if (!activeSlug) {
        setResolvedBanner("/new-arrival.png");
        return;
      }
      const candidates = [`/${activeSlug}.jpg`, `/${activeSlug}.png`];
      for (const src of candidates) {
        if (await imgExists(src)) {
          setResolvedBanner(src);
          return;
        }
      }
      setResolvedBanner("/banners/new-arrival.png");
    })();
  }, [activeSlug]);

  const specialSet = new Set(Object.values(specialSlugs));

  const categoryPills = (categories ?? [])
    // remove any category that collides with a special slug
    .filter((c) => c?.slug && !specialSet.has(c.slug))
    // avoid accidental dupes in your data
    .filter((c, i, arr) => arr.findIndex((x) => x.slug === c.slug) === i)
    .map((c) => ({ label: c.name, slug: c.slug! }));

  // Build pills (All + specials + categories)
  const pillItems = [
    { label: "All", slug: undefined },
    { label: "New Arrivals", slug: specialSlugs.newArrivals },
    { label: "Best Sellers", slug: specialSlugs.bestSellers },
    // { label: "Sale", slug: specialSlugs.sale },
    ...categoryPills,
    { label: "Track Order", slug: "#track-order-pill#" }, // non-category
  ];

  // const filteredProducts = useMemo(() => {
  //   const base = (products || []).filter((p: any) =>
  //     p?.publishStatus ? p.publishStatus === "Published" : true
  //   );
  //   if (initialSearchTerm) {
  //     const q = initialSearchTerm.toLowerCase();
  //     return base.filter(
  //       (p: any) =>
  //         (p.name || "").toLowerCase().includes(q) ||
  //         (p.description || "").toLowerCase().includes(q) ||
  //         (p.tags || []).some((t: string) => String(t).toLowerCase().includes(q))
  //     );
  //   }
  //   return base.filter((p) => productMatchesCategorySlug(p, activeSlug));
  // }, [products, initialSearchTerm, activeSlug]);

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];

    // keep only published (or when field is absent)
    const base = list.filter((p: any) => {
      const s = p?.publishStatus;
      return !s || String(s).toLowerCase() === "published";
    });

    if (initialSearchTerm?.trim()) {
      const q = initialSearchTerm.toLowerCase();
      return base.filter(
        (p: any) =>
          String(p?.name || "")
            .toLowerCase()
            .includes(q) ||
          String(p?.description || "")
            .toLowerCase()
            .includes(q) ||
          (Array.isArray(p?.tags) &&
            p.tags.some((t: string) => String(t).toLowerCase().includes(q)))
      );
    }

    return base.filter((p) => productMatchesCategorySlug(p, activeSlug));
  }, [products, initialSearchTerm, activeSlug]);

  // SEO (JSON-LD)
  const canonical =
    typeof window !== "undefined" ? window.location.href : undefined;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${window.location.origin || ""}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${window.location.origin || ""}/shop`,
      },
      ...(activeSlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: pageTitle,
              item: canonical,
            },
          ]
        : []),
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Zaina Collection",
      url: window.location.origin || "",
    },
  };

  // const bannerSrc = getBannerForSlug(activeSlug);

  return (
    <div className="overflow-hidden bg-white">
      <SEO
        title={`${pageTitle} | Zaina Collection`}
        description={pageDescription}
        canonical={canonical}
        ogImage={resolvedBanner}
        jsonLd={{ "@graph": [breadcrumbLd, collectionLd] }}
      />

      {/* Banner */}
      {/* <section
        style={{
background: resolvedBanner
        ? `url('${resolvedBanner}') center/cover no-repeat`
        : "linear-gradient(180deg, #F4F6FF 0%, #FFFFFF 100%)",
      borderBottom: "1px solid #EEE",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 12px" }}>
          <h1 style={{ fontSize: 36, margin: 0, fontWeight: 800, color: bannerSrc ? "#fff" : "#222", textShadow: bannerSrc ? "0 1px 14px rgba(0,0,0,0.35)" : "none" }}>
            {pageTitle}
          </h1>
          <p style={{ marginTop: 8, color: bannerSrc ? "rgba(255,255,255,0.95)" : "#555", maxWidth: 720, fontSize: 16, fontWeight: 500 }}>
            {pageDescription}
          </p>
        </div>
      </section> */}

      {/* Banner (white bg, no text) */}
      <CategoryBanner src={resolvedBanner} alt={pageTitle} />

      {/* Category Pills */}
      {/* <div style={{ background: "#fff", borderBottom: "1px dashed #E1E4EA" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "12px 12px", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {pillItems.map((p) => {
            const isTrack = p.slug === "#track-order-pill#";
            const isActive = !isTrack && ((activeSlug || undefined) === (p.slug || undefined));
            return isTrack ? (
              <a
                key={p.label}
                href="#"
                style={{
                  border: "1px dashed #AAB2C5",
                  background: "#fff",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Track Order
              </a>
            ) : (
              <button
                key={`pill-${p.slug ?? "all"}`}
                onClick={() => {
                  setActiveSlug(p.slug);
        if (p.slug) navigateToPage("shop", { categorySlug: p.slug });
        else navigateToPage("shop");
                }}
                style={{
                  border: isActive ? "2px solid #2C4A9A" : "1px dashed #AAB2C5",
                  background: isActive ? "#F5F7FF" : "#fff",
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontWeight: 700,
                  color: isActive ? "#2C4A9A" : "#222",
                  cursor: "pointer",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div> */}

      {/* Product Grid */}
      {/*<section style={{ maxWidth: 1240, margin: "0 auto", padding: "18px 12px 40px" }}>
      
        { <div
          style={{
            display: "grid",


            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {filteredProducts.map((prod: any) => {
            const discounted = !!(prod?.mrp && prod?.price && prod.price < prod.mrp);
            return (
              <article
                key={String(prod.id ?? prod._id)}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <div
                  onClick={() => onViewProductDetail(prod)}
                  style={{ width: "100%", aspectRatio: "1/1", background: "#f7f7f7", cursor: "pointer" }}
                >
            
                </div>
                <div style={{ padding: 12 }}>
                  <h3 style={{ fontSize: 16, margin: "0 0 6px", fontWeight: 700, lineHeight: 1.3 }}>
                    {prod.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>₹{prod.price}</div>
                    {discounted ? (
                      <>
                        <div style={{ textDecoration: "line-through", color: "#888" }}>₹{prod.mrp}</div>
                        <div style={{ color: "#0A8F2E", fontWeight: 700 }}>
                          {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% off
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      onClick={() => onProductQuickView(prod)}
                      style={{
                        flex: 1,
                        background: "#fff",
                        border: "1px solid #E0E0E0",
                        borderRadius: 8,
                        padding: "8px 10px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => onProductQuickShop(prod)}
                      style={{
                        flex: 1,
                        background: "#2C4A9A",
                        color: "#fff",
                        border: "1px solid #27418A",
                        borderRadius: 8,
                        padding: "8px 10px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Quick Shop
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      onClick={() => onToggleWishlist(prod)}
                      style={{
                        flex: 1,
                        background: isProductInWishlist(String(prod.id ?? prod._id)) ? "#FFF4F6" : "#fff",
                        border: "1px solid #E0E0E0",
                        borderRadius: 8,
                        padding: "8px 10px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ♥ Wishlist
                    </button>
                    <button
                      onClick={() => onToggleCompare(prod)}
                      style={{
                        flex: 1,
                        background: isProductInCompare(String(prod.id ?? prod._id)) ? "#F4F9FF" : "#fff",
                        border: "1px solid #E0E0E0",
                        borderRadius: 8,
                        padding: "8px 10px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ⇄ Compare
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666", marginTop: 40 }}>
            No products found. Try clearing filters or searching something else.
          </div>
        ) : null}
      </section> */}

      <ProductGrid
        title={pageTitle || "Shop"}
        products={filteredProducts} // <-- pass the array to show
        onProductQuickView={onProductQuickView}
        onProductQuickShop={onProductQuickShop}
        onProductCardClick={onViewProductDetail}
        sectionBgColor="bg-transparent"
        titleColor="text-zaina-text-primary dark:text-dark-zaina-text-primary"
        onToggleWishlist={onToggleWishlist}
        isProductInWishlist={isProductInWishlist}
        onToggleCompare={onToggleCompare}
        isProductInCompare={isProductInCompare}
      />
    </div>
  );
};

export default ShopPage;
