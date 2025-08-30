import React, { useState, useEffect } from "react";
import { Product, NavLinkItem, Category } from "../../types";
import ProductGrid from "../ProductGrid";

interface ShopPageProps {
  products: Product[];
  categories: Category[];
  onProductQuickView: (product: Product) => void;
  onProductQuickShop: (product: Product) => void;
  onViewProductDetail: (product: Product) => void;
  initialCategory?: string;
  initialSearchTerm?: string;
  onToggleWishlist: (product: Product) => void;
  isProductInWishlist: (productId: string) => boolean;
  onToggleCompare: (product: Product) => void;
  isProductInCompare: (productId: string) => boolean;
}

const ShopPage: React.FC<ShopPageProps> = ({
  products,
  categories,
  onProductQuickView,
  onProductQuickShop,
  onViewProductDetail,
  initialCategory,
  initialSearchTerm,
  onToggleWishlist,
  isProductInWishlist,
  onToggleCompare,
  isProductInCompare,
}) => {
  const [activeCategory, setActiveCategory] = useState(
    initialCategory || "ALL"
  );
  const [pageTitle, setPageTitle] = useState("Shop Our Collection");
  const [headerMessage, setHeaderMessage] = useState(
    "Discover exquisite ethnic wear, curated for the modern woman."
  );

  const toLower = (v?: string | null) =>
    typeof v === "string" ? v.toLowerCase() : "";

  useEffect(() => {
    if (initialSearchTerm) {
      setActiveCategory("ALL"); // When searching, we don't filter by category
      setPageTitle(`Search Results`);
      setHeaderMessage(`Showing results for "${initialSearchTerm}"`);
    } else if (initialCategory) {
      setActiveCategory(initialCategory.toUpperCase());
      setPageTitle(initialCategory.toUpperCase());
      setHeaderMessage(`Explore our collection of ${initialCategory}.`);
    } else {
      setActiveCategory("ALL");
      setPageTitle("Shop Our Collection");
      setHeaderMessage(
        "Discover exquisite ethnic wear, curated for the modern woman."
      );
    }
  }, [initialCategory, initialSearchTerm]);

  const categoriesList = [
    { id: "all", label: "ALL" },
    ...categories.map((cat) => ({
      id: cat.id,
      label: (cat.name ?? "").toUpperCase(),
    })),
  ];

  // const getFilteredProducts = () => {
  //   let filtered = products.filter(p => p.publishStatus === 'Published');

  //   // First, filter by search term if it exists
  //   if (initialSearchTerm) {
  //     const term = initialSearchTerm.toLowerCase();
  //     filtered = filtered.filter(p =>
  //       p.name.toLowerCase().includes(term) ||
  //       p.category.toLowerCase().includes(term) ||
  //       p.description.toLowerCase().includes(term) ||
  //       (p.tags && p.tags.some(tag => tag.toLowerCase().includes(term)))
  //     );
  //     return filtered;
  //   }

  //   // If no search term, filter by category
  //   if (activeCategory === 'ALL') {
  //     return filtered;
  //   }

  //   // Find the category and its subcategories
  //   const selectedCat = categories.find(c => c.name.toUpperCase() === activeCategory);
  //   const validCategoryNames = selectedCat ? [selectedCat.name, ...selectedCat.subCategories.map(sc => sc.name)] : [activeCategory];

  //   return filtered.filter(p =>
  //     validCategoryNames.some(name => p.category.toLowerCase() === name.toLowerCase())
  //   );
  // };

  const getFilteredProducts = () => {
    // Only published
    let filtered = products.filter((p) => p.publishStatus === "Published");

    // Search flow
    if (initialSearchTerm) {
      const term = toLower(initialSearchTerm);
      filtered = filtered.filter((p) => {
        const name = toLower(p.name);
        const category = toLower(p.categoryName);
        const description = toLower(p.description);
        const hasTagMatch = (p.tags ?? []).some((tag) =>
          toLower(tag).includes(term)
        );
        return (
          name.includes(term) ||
          category.includes(term) ||
          description.includes(term) ||
          hasTagMatch
        );
      });
      return filtered;
    }

    // Category flow
    if (activeCategory === "ALL") return filtered;

    // Find the selected category safely
    const selectedCat = categories.find(
      (c) => (c.name ?? "").toUpperCase() === activeCategory
    );

    // Collect valid category names (parent + subcats), filter out empties
    const validCategoryNames = selectedCat
      ? ([
          selectedCat.name,
          ...(selectedCat.subCategories ?? []).map((sc) => sc?.name),
        ].filter(Boolean) as string[])
      : [activeCategory];

    // Compare in lowercase only
    return filtered.filter((p) => {
      const prodCat = toLower(p.category);
      return validCategoryNames.some((name) => prodCat === toLower(name));
    });
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="bg-zaina-sky-blue-light dark:bg-dark-zaina-neutral-light min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading-playfair font-bold text-zaina-text-primary dark:text-dark-zaina-text-primary mb-3">
            {pageTitle}
          </h1>
          <p className="text-lg text-zaina-text-secondary dark:text-dark-zaina-text-secondary font-body-jost">
            {headerMessage}
          </p>
        </header>

        {/* Category Tabs are hidden when searching */}
        {!initialSearchTerm && (
          <nav className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2 md:gap-4 border-b border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium pb-4">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.label);
                  setPageTitle(
                    cat.label === "ALL" ? "All Products" : cat.label
                  );
                  setHeaderMessage(`Explore our collection of ${cat.label}.`);
                }}
                className={`py-2 px-4 md:py-2.5 md:px-6 rounded-md font-body-jost font-semibold text-sm md:text-base transition-all duration-300
                  ${
                    activeCategory === cat.label
                      ? "bg-zaina-gold text-zaina-white dark:bg-zaina-gold dark:text-dark-zaina-text-primary shadow-md"
                      : `bg-zaina-neutral-light dark:bg-dark-zaina-neutral-medium text-zaina-text-primary dark:text-dark-zaina-text-primary hover:bg-zaina-primary/10 dark:hover:bg-dark-zaina-primary/20 hover:text-zaina-primary dark:hover:text-dark-zaina-primary`
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        )}

        <ProductGrid
          title={
            initialSearchTerm
              ? ""
              : activeCategory === "ALL"
              ? "All Products"
              : ""
          }
          products={filteredProducts}
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
    </div>
  );
};

export default ShopPage;
