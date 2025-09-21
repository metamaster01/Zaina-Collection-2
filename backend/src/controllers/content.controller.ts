// import { getCache, setCache, delCache } from "../utils/simpleCache";

// import { Request, Response, NextFunction } from 'express';
// import prisma from '../prisma';

// const SITE_DATA_KEY = "site-data";
// const SITE_DATA_TTL_MS = 60_000; // 60s

// export const getSiteData = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const [
//             products, 
//             categories,
//             heroSlides,
//             occasions,
//             looks,
//             emotions,
//             shoppableVideos,
//             testimonials,
//             activityFeed,
//             floatingInfo,
//             fashionGalleryImages,
//             blogPosts,
//             guidedDiscoveryPaths,
//             siteSettings,
//             faqs,
//         ] = await Promise.all([
//             prisma.product.findMany({ 
//                 where: { publishStatus: 'Published' },
//                 include: { variants: true }
//             }),
//             prisma.category.findMany({ include: { subCategories: true } }),
//             prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
//             prisma.occasionContent.findMany(),
//             prisma.curatedLook.findMany(),
//             prisma.emotionCategory.findMany(),
//             prisma.shoppableVideo.findMany(),
//             prisma.testimonial.findMany({ where: { approved: true } }),
//             prisma.activityLog.findMany({ orderBy: { timestamp: 'desc' }, take: 10 }),
//             prisma.floatingInfo.findMany(),
//             prisma.fashionGalleryImage.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }}),
//             prisma.cmsPage.findMany({ where: { type: 'post', status: 'Published' }, orderBy: { lastUpdated: 'desc' }}),
//             prisma.guidedDiscoveryPath.findMany(),
//             prisma.siteSettings.findFirst({ where: { singleton: 'global_settings' } }),
//             prisma.faq.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }),
//         ]);
        
//         // This combines gallery images from the dedicated model and potentially from individual products
//         const allGalleryImages = [
//             ...fashionGalleryImages.map((img : any) => img.imageUrl),
//         ];

//         // This combines all CMS pages (posts, policies, about, etc.)
//         const allCmsPages = await prisma.cmsPage.findMany({ where: { status: 'Published' }});
        
//         res.json({
//             products,
//             categories,
//             siteSettings, // Now fetched from DB
//             cmsPages: allCmsPages,
//             // Homepage Content
//             heroSlides,
//             occasions,
//             looks,
//             emotions,
//             shoppableVideos,
//             testimonials,
//             activityFeed,
//             floatingInfo,
//             fashionGalleryImages: allGalleryImages,
//             blogPosts,
//             guidedDiscoveryPaths,
//             faqs,
//         });

//     } catch (error) {
//         next(error);
//     }
// }

// export const getPublicSiteSettings = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const doc = await prisma.siteSettings.findFirst({
//       where: { singleton: "global_settings" },
//       select: {
//         // keep it tiny — you can expand later
//         storeSettings: true,   // e.g., name, logo, currency, phone, email
//         themeSettings: true,   // e.g., primary colors
//         seoSettings: true,     // e.g., title, metaDescription
//       },
//     });

//     // Reasonable cache — tweak as needed
//     res.set("Cache-Control", "public, max-age=60, s-maxage=300");
//     res.json(doc ?? {});
//   } catch (err) {
//     next(err);
//   }
// };

// content.controller.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

// Simple in-memory TTL cache
import { getCache, setCache /* delCache not used here */ } from "../utils/simpleCache";

const SITE_DATA_KEY = "site-data";
const SITE_DATA_TTL_MS = 60_000; // 60s

export const getSiteData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1) Try cache first
    const cached = getCache<any>(SITE_DATA_KEY);
    if (cached) {
      // Client-cache hints (tweak as you like)
      res.set("Cache-Control", "public, max-age=60, s-maxage=60");
      return res.json(cached);
    }

    // 2) Cold path: gather everything (kept exactly as you had it)
    const [
      products,
      categories,
      heroSlides,
      occasions,
      looks,
      emotions,
      shoppableVideos,
      testimonials,
      activityFeed,
      floatingInfo,
      fashionGalleryImages,
      blogPosts,
      guidedDiscoveryPaths,
      siteSettings,
      faqs,
    ] = await Promise.all([
      prisma.product.findMany({
        where: { publishStatus: "Published" },
        include: { variants: true },
      }),
      prisma.category.findMany({ include: { subCategories: true } }),
      prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      prisma.occasionContent.findMany(),
      prisma.curatedLook.findMany(),
      prisma.emotionCategory.findMany(),
      prisma.shoppableVideo.findMany(),
      prisma.testimonial.findMany({ where: { approved: true } }),
      prisma.activityLog.findMany({ orderBy: { timestamp: "desc" }, take: 10 }),
      prisma.floatingInfo.findMany(),
      prisma.fashionGalleryImage.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.cmsPage.findMany({
        where: { type: "post", status: "Published" },
        orderBy: { lastUpdated: "desc" },
      }),
      prisma.guidedDiscoveryPath.findMany(),
      prisma.siteSettings.findFirst({ where: { singleton: "global_settings" } }),
      prisma.faq.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    ]);

    // Combine gallery images (kept exactly as you had it)
    const allGalleryImages = [
      ...fashionGalleryImages.map((img: any) => img.imageUrl),
    ];

    // Fetch all CMS pages (kept as a separate call like you had it)
    const allCmsPages = await prisma.cmsPage.findMany({ where: { status: "Published" } });

    // 3) Build the exact same payload shape you return now
    const payload = {
      products,
      categories,
      siteSettings, // Now fetched from DB
      cmsPages: allCmsPages,
      // Homepage Content
      heroSlides,
      occasions,
      looks,
      emotions,
      shoppableVideos,
      testimonials,
      activityFeed,
      floatingInfo,
      fashionGalleryImages: allGalleryImages,
      blogPosts,
      guidedDiscoveryPaths,
      faqs,
    };

    // 4) Store in cache for fast subsequent responses
    setCache(SITE_DATA_KEY, payload, SITE_DATA_TTL_MS);

    // 5) Client-cache hints
    res.set("Cache-Control", "public, max-age=60, s-maxage=60");

    // 6) Respond
    res.json(payload);
  } catch (error) {
    next(error);
  }
};

// Tiny, cacheable public settings endpoint for fast first paint
export const getPublicSiteSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await prisma.siteSettings.findFirst({
      where: { singleton: "global_settings" },
      select: {
        storeSettings: true,   // e.g., name, logo, currency, phone, email
        themeSettings: true,   // e.g., primary colors
        seoSettings: true,     // e.g., title, metaDescription
      },
    });

    res.set("Cache-Control", "public, max-age=60, s-maxage=300");
    res.json(doc ?? {});
  } catch (err) {
    next(err);
  }
};
