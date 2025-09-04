// src/utils/slug.ts
export const slugify = (input: string) =>
  (input || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const findCategoryBySlug = <T extends { slug?: string }>(cats: T[], slug?: string) =>
  (slug ? cats.find((c) => c.slug === slug) : undefined) || undefined;
