// src/utils/slug.ts
export const slugify = (input: string) =>
  (input || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const ensureUniqueSlug = async (
  prisma: any,
  base: string,
  idToIgnore?: string
): Promise<string> => {
  let slug = base;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.category.findFirst({
      where: { slug, ...(idToIgnore ? { NOT: { id: idToIgnore } } : {}) },
      select: { id: true },
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
};
