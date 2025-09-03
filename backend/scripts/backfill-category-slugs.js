// scripts/backfill-category-slugs.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const slugify = (s) => (s||"").toLowerCase().trim()
  .replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");

async function ensureUniqueSlug(base, idToIgnore) {
  let slug = base || "category", n = 1;
  for (;;) {
    const clash = await prisma.category.findFirst({
      where: { slug, ...(idToIgnore ? { NOT: { id: idToIgnore } } : {}) },
      select: { id: true },
    });
    if (!clash) return slug;
    slug = `${base}-${++n}`;
  }
}

(async function run(){
  const cats = await prisma.category.findMany({ select: { id:true, name:true, slug:true } });
  for (const c of cats) {
    if (c.slug && c.slug.trim()) continue;
    const unique = await ensureUniqueSlug(slugify(c.name), c.id);
    await prisma.category.update({ where: { id: c.id }, data: { slug: unique } });
    console.log(`✓ ${c.name} -> ${unique}`);
  }
  await prisma.$disconnect();
})().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1); });
