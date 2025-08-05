
import { Response, NextFunction } from 'express';
import prisma from '../../prisma';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { logAdminAction } from '../../services/audit.service';

// --- Generic CRUD Factory (for simple models) ---
const createCrudHandlers = (modelName: keyof typeof prisma, logName: string) => {
    const model = prisma[modelName] as any;
    return {
        getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
                const items = await model.findMany();
                res.json(items);
            } catch (error) { next(error); }
        },
        create: async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
                const item = await model.create({ data: req.body });
                await logAdminAction(req, `Created ${logName}`, `ID: ${item.id}`);
                res.status(201).json(item);
            } catch (error) { next(error); }
        },
        update: async (req: AuthRequest, res: Response, next: NextFunction) => {
            const { id } = req.params;
            try {
                const item = await model.update({ where: { id }, data: req.body });
                await logAdminAction(req, `Updated ${logName}`, `ID: ${id}`);
                res.json(item);
            } catch (error) { next(error); }
        },
        delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
            const { id } = req.params;
            try {
                await model.delete({ where: { id } });
                await logAdminAction(req, `Deleted ${logName}`, `ID: ${id}`);
                res.status(204).send();
            } catch (error) { next(error); }
        }
    };
};

// --- Instantiate CRUD handlers for each CMS type ---
const heroSlideHandlers = createCrudHandlers('heroSlide', 'Hero Slide');
export const getHeroSlides = heroSlideHandlers.getAll;
export const createHeroSlide = heroSlideHandlers.create;
export const updateHeroSlide = heroSlideHandlers.update;
export const deleteHeroSlide = heroSlideHandlers.delete;

const shoppableVideoHandlers = createCrudHandlers('shoppableVideo', 'Shoppable Video');
export const getShoppableVideos = shoppableVideoHandlers.getAll;
export const createShoppableVideo = shoppableVideoHandlers.create;
export const updateShoppableVideo = shoppableVideoHandlers.update;
export const deleteShoppableVideo = shoppableVideoHandlers.delete;

const occasionHandlers = createCrudHandlers('occasionContent', 'Occasion');
export const getOccasions = occasionHandlers.getAll;
export const createOccasion = occasionHandlers.create;
export const updateOccasion = occasionHandlers.update;
export const deleteOccasion = occasionHandlers.delete;

const lookHandlers = createCrudHandlers('curatedLook', 'Curated Look');
export const getLooks = lookHandlers.getAll;
export const createLook = lookHandlers.create;
export const updateLook = lookHandlers.update;
export const deleteLook = lookHandlers.delete;

const emotionHandlers = createCrudHandlers('emotionCategory', 'Emotion Category');
export const getEmotions = emotionHandlers.getAll;
export const createEmotion = emotionHandlers.create;
export const updateEmotion = emotionHandlers.update;
export const deleteEmotion = emotionHandlers.delete;


// --- CMS Pages (Blog/Custom Pages) CRUD ---
const cmsPageHandlers = createCrudHandlers('cmsPage', 'CMS Page');
export const getCmsPages = cmsPageHandlers.getAll;
export const createCmsPage = cmsPageHandlers.create;
export const updateCmsPage = cmsPageHandlers.update;
export const deleteCmsPage = cmsPageHandlers.delete;

// --- Floating Info CRUD ---
const floatingInfoHandlers = createCrudHandlers('floatingInfo', 'Floating Info');
export const getFloatingInfo = floatingInfoHandlers.getAll;
export const createFloatingInfo = floatingInfoHandlers.create;
export const updateFloatingInfo = floatingInfoHandlers.update;
export const deleteFloatingInfo = floatingInfoHandlers.delete;