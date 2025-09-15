// components/JewellerySection.tsx
"use client";

import React, { useMemo } from "react";
import type { Product } from "../types";
import ProductGrid from "./ProductGrid";

interface JewellerySectionProps {
  title?: string;
  products: Product[]; // full site product list
  onProductQuickView: (product: Product) => void;
  onProductQuickShop: (product: Product) => void;
  onProductCardClick?: (product: Product) => void;
  sectionBgColor?: string;
  titleColor?: string;
  onToggleWishlist?: (product: Product) => void;
  isProductInWishlist?: (productId: string) => boolean;
  onToggleCompare?: (product: Product) => void;
  isProductInCompare?: (productId: string) => boolean;
  // optional: explicit filter override (if you want to pass prefiltered list)
  prefiltered?: Product[] | null;
}

/**
 * JewellerySection
 * - Filters the global products array to only jewellery items using multiple heuristics:
 *   * explicit product.isJewellery boolean
 *   * category string includes "jewel" / "jewellery"
 *   * product.slug or product.categorySlug equals 'jewellery'
 *   * product.tags contains 'jewellery' or 'jewel'
 *
 * This keeps the filter robust to varied product shapes returned by your backend.
 */
const JewellerySection: React.FC<JewellerySectionProps> = ({
  title = "Jewellery",
  products,
  onProductQuickView,
  onProductQuickShop,
  onProductCardClick,
  sectionBgColor = "bg-white",
  titleColor = "text-gray-900",
  onToggleWishlist,
  isProductInWishlist,
  onToggleCompare,
  isProductInCompare,
  prefiltered = null,
}) => {
  // If the caller provided a prefiltered list, use that (higher priority).
  const jewelleryProducts = useMemo(() => {
    const list = Array.isArray(prefiltered) ? prefiltered : products ?? [];

    const normalize = (s: any) =>
      typeof s === "string" ? s.trim().toLowerCase() : "";

    return list.filter((p: any) => {
      if (!p) return false;

      // 1. explicit flag
      if (p.isJewellery === true) return true;

      // 2. category, categoryName, categorySlug, category object
      const categoryFields = [
        p.category,
        p.categoryName,
        p.categorySlug,
        (p.category && typeof p.category === "object" && p.category.name) || null,
        (p.category && typeof p.category === "object" && p.category.slug) || null,
      ];

      for (const c of categoryFields) {
        if (normalize(c).includes("jewel")) return true;
      }

      // 3. product slug / handle / type
      if (normalize(p.slug).includes("jewel") || normalize(p.handle).includes("jewel")) return true;

      // 4. tags array
      if (Array.isArray(p.tags)) {
        const tagsLower = p.tags.map((t: any) => normalize(t));
        if (tagsLower.some((t: string) => t.includes("jewel"))) return true;
      }

      // 5. fallback: product.name includes jewellery keyword
      if (normalize(p.name).includes("jewel")) return true;

      // otherwise not jewellery
      return false;
    });
  }, [products, prefiltered]);

  // Pass the filtered products into your existing ProductGrid (keeps UI consistent).
  return (
    <ProductGrid
      title={title}
      products={jewelleryProducts}
      onProductQuickView={onProductQuickView}
      onProductQuickShop={onProductQuickShop}
      onProductCardClick={onProductCardClick}
      sectionBgColor={sectionBgColor}
      titleColor={titleColor}
      onToggleWishlist={onToggleWishlist}
      isProductInWishlist={isProductInWishlist}
      onToggleCompare={onToggleCompare}
      isProductInCompare={isProductInCompare}
    />
  );
};

export default JewellerySection;
