
import { Response, NextFunction } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/auth.middleware';
import { logAdminAction } from '../services/audit.service';
import bcrypt from 'bcryptjs';
import { slugify, ensureUniqueSlug } from '../utils/slug';

const isMongoDbId = (id: string): boolean => {
    if(!id) return false;
    return /^[0-9a-fA-F]{24}$/.test(id);
};

// Product Controllers
export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { variants, category, subCategory, ...productData } = req.body;
    if (!productData.name || !productData.price || !productData.mrp || !productData.sku || !category) {
        return res.status(400).json({ message: 'Name, Price, MRP, SKU, and Category are required fields.' });
    }
    try {
        const dataForPrisma: any = {
            ...productData,
            categoryName: category,
            subCategoryName: subCategory,
        };

        if (variants && Array.isArray(variants) && variants.length > 0) {
            dataForPrisma.variants = {
                create: variants.map(({ id, ...variantData }) => variantData) // Remove temporary frontend IDs from variants
            };
        }

        const product = await prisma.product.create({
            data: dataForPrisma,
            include: { variants: true },
        });
        await logAdminAction(req, `Created product: ${product.name}`, `ID: ${product.id}`);
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        next(error);
    }
};

export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { variants, category, subCategory, ...productData } = req.body;

    if (!productData.name || !productData.price || !productData.mrp || !productData.sku || !category) {
        return res.status(400).json({ message: 'Name, Price, MRP, SKU, and Category are required fields.' });
    }

    try {
        const dataToUpdate: any = {
            ...productData,
            categoryName: category,
            subCategoryName: subCategory,
        };
        delete dataToUpdate.variants;
        delete dataToUpdate.id;

        const updatedProduct = await prisma.$transaction(
            async (tx) => {
                const product = await tx.product.update({
                    where: { id },
                    data: dataToUpdate,
                });

                if (variants && Array.isArray(variants)) {
                    const existingVariants = await tx.productVariant.findMany({
                        where: { productId: id },
                    });
                    const existingVariantIds = new Set(existingVariants.map((v) => v.id));

                    const incomingVariants = variants.map((v: any) => ({
                        ...v,
                        id: isMongoDbId(v.id) ? v.id : undefined,
                    }));
                    const incomingVariantIds = new Set(
                        incomingVariants.map((v: any) => v.id).filter(Boolean)
                    );

                    // Delete removed variants
                    const variantsToDelete = existingVariants.filter(
                        (v) => !incomingVariantIds.has(v.id)
                    );
                    if (variantsToDelete.length > 0) {
                        await tx.productVariant.deleteMany({
                            where: { id: { in: variantsToDelete.map((v) => v.id) } },
                        });
                    }

                    // Update / Create variants
                    for (const variantData of incomingVariants) {
                        const { id: variantId, ...data } = variantData;
                        if (variantId && existingVariantIds.has(variantId)) {
                            await tx.productVariant.update({
                                where: { id: variantId },
                                data,
                            });
                        } else {
                            await tx.productVariant.create({
                                data: { ...data, productId: id },
                            });
                        }
                    }
                }

                return product;
            },
            {
                timeout: 30000, // <-- extend transaction timeout to 30 seconds
            }
        );

        await logAdminAction(
            req,
            `Updated product: ${updatedProduct.name}`,
            `ID: ${updatedProduct.id}`
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        next(error);
    }
};


export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        await prisma.product.delete({ where: { id } });
        await logAdminAction(req, `Deleted product: ${product?.name || 'Unknown'}`, `ID: ${id}`);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Inventory Controller
export const updateStock = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { productId, variantSku, newStock } = req.body;
    try {
        if (variantSku) {
            // Find the specific variant to update its stock
            const variant = await prisma.productVariant.findFirst({
                where: { productId, sku: variantSku },
            });
            if (variant) {
                await prisma.productVariant.update({
                    where: { id: variant.id },
                    data: { stockQuantity: newStock },
                });
            } else {
                return res.status(404).json({ message: 'Product variant not found.' });
            }
        } else {
            // Update stock for a base product (without variants)
            await prisma.product.update({
                where: { id: productId },
                data: { stockQuantity: newStock },
            });
        }
        await logAdminAction(req, 'Updated stock', `Product ID: ${productId}, SKU: ${variantSku || 'base'}, New Stock: ${newStock}`);
        res.status(200).json({ success: true, message: 'Stock updated successfully.' });
    } catch (error) {
        next(error);
    }
};

// Order Controllers
export const getAllOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { orderDate: 'desc' },
            include: { user: { select: { name: true, email: true } } }
        });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status },
        });
        await logAdminAction(req, `Updated order status`, `Order ID: ${id}, New Status: ${status}`);
        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

// controllers/adminOrders.ts
export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        items: {
          include: {
            product: { select: { name: true, sku: true, imageUrl: true } },
            variant: { select: { id: true, attributes: true } }, // optional but handy
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // (Optional) Normalize a “flat” shape for the frontend modal
    const normalized = {
      ...order,
      // shippingAddress is JSON in your model; just pass through
      items: order.items.map(it => ({
        id: it.id,
        quantity: it.quantity,
        priceAtPurchase: it.priceAtPurchase,
        // Prefer the stored snapshot (authoritative at purchase time)
        selectedVariant: { attributes: (it.variantSnapshot as Record<string, any>) ?? {} },
        // Use the live product for name/sku/image
        name: it.product?.name ?? '',
        sku: it.product?.sku ?? '',
        imageUrl: it.product?.imageUrl ?? '',
      })),
    };

    res.json(normalized);
  } catch (error) {
    next(error);
  }
};


// Customer Controllers
export const getAllCustomers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const customersData = await prisma.user.findMany({
            where: { role: 'USER' },
            orderBy: { joinDate: 'desc' },
            include: {
                _count: { select: { orders: true }},
                orders: {
                    select: { totalAmount: true, orderDate: true },
                    orderBy: { orderDate: 'desc' },
                }
            }
        });

        const customersWithStats = customersData.map(c => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            joinDate: c.joinDate,
            totalOrders: c._count.orders,
            totalSpent: c.orders.reduce((sum, order) => sum + order.totalAmount, 0),
            lastOrderDate: c.orders.length > 0 ? c.orders[0].orderDate : undefined,
            profilePictureUrl: c.profilePictureUrl,
            isBlocked: c.isBlocked,
        }));

        res.json(customersWithStats);
    } catch (error) {
        next(error);
    }
};

export const toggleCustomerBlock = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { isBlocked: !user.isBlocked },
        });
        await logAdminAction(req, `Toggled block status for user ${user.name}`, `New status: ${updatedUser.isBlocked ? 'Blocked' : 'Active'}`);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};


// Coupon Controllers
export const getCoupons = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const coupons = await prisma.coupon.findMany({ orderBy: { id: 'desc' } });
        res.json(coupons);
    } catch (error) {
        next(error);
    }
};

export const createCoupon = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const couponData = req.body;
        const coupon = await prisma.coupon.create({ data: couponData });
        await logAdminAction(req, 'Created coupon', `Code: ${coupon.code}`);
        res.status(201).json(coupon);
    } catch (error) {
        next(error);
    }
};

export const updateCoupon = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const couponData = req.body;
    try {
        const coupon = await prisma.coupon.update({ where: { id }, data: couponData });
        await logAdminAction(req, 'Updated coupon', `Code: ${coupon.code}`);
        res.json(coupon);
    } catch (error) {
        next(error);
    }
};

export const deleteCoupon = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const coupon = await prisma.coupon.findUnique({ where: { id } });
        await prisma.coupon.delete({ where: { id } });
        await logAdminAction(req, 'Deleted coupon', `Code: ${coupon?.code}`);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Media Library Controller
export const getMediaLibrary = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const media = await prisma.mediaFile.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(media);
    } catch (error) {
        next(error);
    }
};

export const addMediaFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const mediaFile = await prisma.mediaFile.create({ data: req.body });
        await logAdminAction(req, 'Uploaded media file', `Name: ${mediaFile.name}`);
        res.status(201).json(mediaFile);
    } catch (error) {
        next(error);
    }
};

export const deleteMediaFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const mediaFile = await prisma.mediaFile.findUnique({ where: { id } });
        // In a real app, you would also delete the file from S3 here
        await prisma.mediaFile.delete({ where: { id } });
        await logAdminAction(req, 'Deleted media file', `Name: ${mediaFile?.name}`);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


// Category Controllers
export const getCategories = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const categories = await prisma.category.findMany({
            where: { parentId: null },
            include: { subCategories: true },
            orderBy: { name: 'asc' }
        });
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

// export const createCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         const category = await prisma.category.create({ data: req.body });
//         await logAdminAction(req, 'Created category', `Name: ${category.name}`);
//         res.status(201).json(category);
//     } catch (error) {
//         next(error);
//     }
// };

// export const updateCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     try {
//         const category = await prisma.category.update({ where: { id }, data: req.body });
//         await logAdminAction(req, 'Updated category', `Name: ${category.name}`);
//         res.json(category);
//     } catch (error) {
//         next(error);
//     }
// };

export const createCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, parentId, slug } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Category name is required." });
    }

    // If slug is provided, normalize it; otherwise derive from name
    const base = slugify(slug || name);
    const uniqueSlug = await ensureUniqueSlug(prisma, base);

    const category = await prisma.category.create({
      data: {
        name,
        parentId: parentId || null,
        slug: uniqueSlug,
      } as any,
    });

    await logAdminAction(req, "Created category", `Name: ${category.name}`);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const { name, parentId, slug } = req.body;

    // Fetch current so we can keep its slug if none is explicitly provided
    const current = await prisma.category.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ message: "Category not found" });

    let data: any = {
      // If you want to allow name to be non-unique later, you can drop @unique on name
      ...(typeof name === "string" ? { name } : {}),
      ...(typeof parentId !== "undefined" ? { parentId: parentId || null } : {}),
    };

    if (typeof slug === "string") {
      // Slug explicitly changed -> normalize & ensure uniqueness
      const base = slugify(slug);
      data.slug = await ensureUniqueSlug(prisma, base, id);
    } else {
      // Not provided -> keep existing slug (stable URLs)
    }

    const category = await prisma.category.update({ where: { id }, data });
    await logAdminAction(req, "Updated category", `Name: ${category.name}`);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        // Recursive delete for subcategories
        const deleteSubCategories = async (parentId: string) => {
            const subCategories = await prisma.category.findMany({ where: { parentId } });
            for (const sub of subCategories) {
                await deleteSubCategories(sub.id);
                await prisma.category.delete({ where: { id: sub.id } });
            }
        };
        await deleteSubCategories(id);
        const category = await prisma.category.delete({ where: { id } });
        
        await logAdminAction(req, 'Deleted category and its subcategories', `Name: ${category?.name}`);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const getCategoryBySlug = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const category = await prisma.category.findFirst({
      where: { slug } as any,
      include: { subCategories: true }
    });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    next(error);
  }
};


// Tag Controllers
export const getTags = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const productsWithTags = await prisma.product.findMany({
            where: { tags: { isEmpty: false } },
            select: { tags: true }
        });
        const tagCounts: Record<string, number> = {};
        productsWithTags.forEach(p => {
            p.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        const result = Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteTagFromAllProducts = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tagName } = req.params;
    try {
        const productsToUpdate = await prisma.product.findMany({
            where: { tags: { has: tagName } },
            select: { id: true, tags: true }
        });

        const updatePromises = productsToUpdate.map(p => {
            return prisma.product.update({
                where: { id: p.id },
                data: { tags: { set: p.tags.filter(t => t !== tagName) } }
            });
        });

        await prisma.$transaction(updatePromises);
        await logAdminAction(req, 'Deleted tag from all products', `Tag: ${tagName}`);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Variant Attribute Controllers
export const getVariantAttributes = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const attributes = await prisma.variantAttribute.findMany();
        res.json(attributes);
    } catch (error) { next(error); }
};
export const createVariantAttribute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const attribute = await prisma.variantAttribute.create({ data: req.body });
        res.status(201).json(attribute);
    } catch (error) { next(error); }
};
export const updateVariantAttribute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const attribute = await prisma.variantAttribute.update({ where: { id: req.params.id }, data: req.body });
        res.json(attribute);
    } catch (error) { next(error); }
};
export const deleteVariantAttribute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await prisma.variantAttribute.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) { next(error); }
};


// Testimonial Controllers
export const getTestimonials = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const testimonials = await prisma.testimonial.findMany({ orderBy: { id: 'desc' } });
        res.json(testimonials);
    } catch (error) { next(error); }
};
export const createTestimonial = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const testimonial = await prisma.testimonial.create({ data: req.body });
        res.status(201).json(testimonial);
    } catch (error) { next(error); }
};
export const updateTestimonial = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const testimonial = await prisma.testimonial.update({ where: { id: req.params.id }, data: req.body });
        res.json(testimonial);
    } catch (error) { next(error); }
};
export const deleteTestimonial = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await prisma.testimonial.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) { next(error); }
};

// Review Controllers
export const getReviews = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const reviews = await prisma.productReview.findMany({
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true } }, product: { select: { name: true, imageUrl: true } } }
        });
        res.json(reviews);
    } catch (error) { next(error); }
};

export const updateReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { approved } = req.body;
    try {
        const review = await prisma.productReview.update({ where: { id }, data: { approved } });
        res.json(review);
    } catch (error) { next(error); }
};

export const deleteReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        await prisma.productReview.delete({ where: { id } });
        res.status(204).send();
    } catch (error) { next(error); }
};

// Support Ticket Controller
export const updateSupportTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, messages } = req.body;
    try {
        const ticket = await prisma.supportTicket.update({
            where: { id },
            data: { status, messages }
        });
        await logAdminAction(req, 'Updated support ticket', `Ticket ID: ${id}, Status: ${status}`);
        res.json(ticket);
    } catch(error) {
        next(error);
    }
};

// Chat Controllers
export const getAdminChatSessions = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const sessions = await prisma.chatSession.findMany({
            orderBy: { lastUpdated: 'desc' },
            include: {
                user: { select: { name: true }},
                messages: { orderBy: { timestamp: 'desc' }, take: 1, select: { text: true }}
            }
        });
        res.json(sessions);
    } catch (error) { next(error); }
};

export const getChatMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { sessionId } = req.params;
    try {
        const messages = await prisma.chatMessage.findMany({
            where: { sessionId },
            orderBy: { timestamp: 'asc' }
        });
        res.json(messages);
    } catch (error) { next(error); }
};

export const sendAdminMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { sessionId } = req.params;
    const { text } = req.body;
    try {
        const message = await prisma.chatMessage.create({
            data: {
                sessionId,
                text,
                sender: 'admin'
            }
        });
        await prisma.chatSession.update({
            where: { id: sessionId },
            data: { lastUpdated: new Date() }
        });
        res.status(201).json(message);
    } catch (error) { next(error); }
};

// FAQ Controllers
export const getFaqs = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const faqs = await prisma.faq.findMany({ orderBy: { order: 'asc' } });
        res.json(faqs);
    } catch (error) { next(error); }
};
export const createFaq = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const faq = await prisma.faq.create({ data: req.body });
        res.status(201).json(faq);
    } catch (error) { next(error); }
};
export const updateFaq = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const faq = await prisma.faq.update({ where: { id: req.params.id }, data: req.body });
        res.json(faq);
    } catch (error) { next(error); }
};
export const deleteFaq = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await prisma.faq.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) { next(error); }
};

// User & Role Management
export const createAdminUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name, email, password, role, isActive } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Name, email, password, and role are required.' });
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });
        await logAdminAction(req, 'Created admin user', `Name: ${user.name}`);
        const { password: _, ...userResponse } = user;
        res.status(201).json(userResponse);
    } catch (error) { next(error); }
};

export const updateAdminUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, email, role, isActive, password } = req.body;
    try {
        const dataToUpdate: any = { name, email, role, isActive };
        if (password && password.length > 0) {
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }
        const user = await prisma.user.update({ where: { id }, data: dataToUpdate });
        await logAdminAction(req, 'Updated admin user', `Name: ${user.name}`);
        const { password: _, ...userResponse } = user;
        res.json(userResponse);
    } catch (error) { next(error); }
};

export const deleteAdminUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        await prisma.user.delete({ where: { id } });
        await logAdminAction(req, 'Deleted admin user', `Name: ${user.name}`);
        res.status(204).send();
    } catch (error) { next(error); }
};

// Payment Gateway Controllers
export const getPaymentGateways = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const gateways = await prisma.paymentGateway.findMany();
        res.json(gateways);
    } catch (error) { next(error); }
};
export const updatePaymentGateway = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const gateway = await prisma.paymentGateway.update({ where: { id: req.params.id }, data: req.body });
        res.json(gateway);
    } catch (error) { next(error); }
};

// Shipping Controllers
export const getShippingZones = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const zones = await prisma.shippingZone.findMany({ include: { rates: true } });
        res.json(zones);
    } catch (error) { next(error); }
};
export const createShippingZone = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { rates, ...zoneData } = req.body;
    try {
        const data: any = { ...zoneData };
        if (rates && Array.isArray(rates) && rates.length > 0) {
            data.rates = {
                create: rates.map((rate: any) => ({
                    name: rate.name,
                    price: rate.price,
                    condition: rate.condition,
                    conditionValue: rate.conditionValue
                }))
            };
        }
        const zone = await prisma.shippingZone.create({ data });
        res.status(201).json(zone);
    } catch (error) { next(error); }
};
export const updateShippingZone = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const zone = await prisma.shippingZone.update({ where: { id: req.params.id }, data: req.body });
        res.json(zone);
    } catch (error) { next(error); }
};
export const deleteShippingZone = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await prisma.shippingZone.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) { next(error); }
};
export const getShippingProviders = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const providers = await prisma.shippingProvider.findMany();
        res.json(providers);
    } catch (error) { next(error); }
};
export const updateShippingProvider = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const provider = await prisma.shippingProvider.update({ where: { id: req.params.id }, data: req.body });
        res.json(provider);
    } catch (error) { next(error); }
};

// Site Settings
export const getSiteSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const settings = await prisma.siteSettings.findFirst({ where: { singleton: 'global_settings' } });
        res.json(settings);
    } catch (error) { next(error); }
};

// export const updateSiteSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     const settingsData = req.body;
//     try {
//         const settings = await prisma.siteSettings.upsert({
//             where: { singleton: 'global_settings' },
//             update: settingsData,
//             create: { ...settingsData, singleton: 'global_settings' }
//         });
//         await logAdminAction(req, 'Updated site settings');
//         res.json(settings);
//     } catch (error) {
//         next(error);
//     }
// };

// export const updateSiteSettings = async (req: AuthRequest, res: Response) => {
//   try {
//     // destructure id out, since we don't want to pass it to update/create
//     const { id, ...settingsData } = req.body;

//     const settings = await prisma.siteSettings.upsert({
//       where: { singleton: "global_settings" },
//       update: settingsData, // no id here
//       create: {
//         ...settingsData,
//         singleton: "global_settings", // ensure singleton is set
//       },
//     });

//     res.json(settings);
//   } catch (error) {
//     console.error("Failed to update site settings:", error);
//     res.status(500).json({ message: "Failed to update site settings", error });
//   }
// };


// controllers/admin.controller.ts
export const updateSiteSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const newData = req.body;

    // 1. Get existing settings
    const existing = await prisma.siteSettings.findFirst({
      where: { singleton: "global_settings" },
    });

    // 2. Merge existing + new (deep merge)
    const merged = {
      ...existing,
      ...newData,
      // merge JSON sub-objects individually so they don’t get wiped
      storeSettings: { 
        ...(typeof existing?.storeSettings === 'object' && existing?.storeSettings !== null ? existing.storeSettings : {}), 
        ...(typeof newData.storeSettings === 'object' && newData.storeSettings !== null ? newData.storeSettings : {}) 
      },
      seoSettings: { 
        ...(typeof existing?.seoSettings === 'object' && existing?.seoSettings !== null ? existing.seoSettings : {}), 
        ...(typeof newData.seoSettings === 'object' && newData.seoSettings !== null ? newData.seoSettings : {}) 
      },
      themeSettings: { 
        ...(typeof existing?.themeSettings === 'object' && existing?.themeSettings !== null ? existing.themeSettings : {}), 
        ...(typeof newData.themeSettings === 'object' && newData.themeSettings !== null ? newData.themeSettings : {}) 
      },
      footerSettings: { 
        ...(typeof existing?.footerSettings === 'object' && existing?.footerSettings !== null ? existing.footerSettings : {}), 
        ...(typeof newData.footerSettings === 'object' && newData.footerSettings !== null ? newData.footerSettings : {}) 
      },
      integrations: { 
        ...(typeof existing?.integrations === 'object' && existing?.integrations !== null ? existing.integrations : {}), 
        ...(typeof newData.integrations === 'object' && newData.integrations !== null ? newData.integrations : {}) 
      },
      headerLinks: newData.headerLinks ?? existing?.headerLinks ?? [],
    };

    // 3. Upsert with safe full object
    const settings = await prisma.siteSettings.upsert({
      where: { singleton: "global_settings" },
      update: merged,
      create: {
        singleton: "global_settings",
        ...merged,
      },
    });

    await logAdminAction(req, "Updated site settings");
    res.json(settings);
  } catch (error) {
    console.error("Failed to update site settings:", error);
    next(error);
  }
};



// Admin Dashboard
export const getDashboardData = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const getCustomerDataPromise = prisma.user.findMany({
            where: { role: 'USER' },
            orderBy: { joinDate: 'desc' },
            include: {
                _count: { select: { orders: true }},
                orders: {
                    select: { totalAmount: true, orderDate: true },
                    orderBy: { orderDate: 'desc' },
                }
            }
        });

        const [orders, customersData, coupons, adminUsers, mediaLibrary, marketingCampaigns, siteSettings] = await Promise.all([
            prisma.order.findMany({ orderBy: { orderDate: 'desc' }, include: { user: { select: { name: true }}} }),
            getCustomerDataPromise,
            prisma.coupon.findMany(),
            prisma.user.findMany({ where: { role: 'ADMIN' } }),
            prisma.mediaFile.findMany(),
            prisma.marketingCampaign.findMany(),
            prisma.siteSettings.findFirst()
        ]);
        
        const customers = customersData.map(c => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            joinDate: c.joinDate,
            totalOrders: c._count.orders,
            totalSpent: c.orders.reduce((sum, order) => sum + order.totalAmount, 0),
            lastOrderDate: c.orders.length > 0 ? c.orders[0].orderDate : undefined,
            profilePictureUrl: c.profilePictureUrl,
            isBlocked: c.isBlocked,
        }));
        
        res.json({ orders, customers, coupons, adminUsers, mediaLibrary, marketingCampaigns, siteSettings });
    } catch (error) {
        next(error);
    }
};

// Analytics
export const getWishlistAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const allUsers = await prisma.user.findMany({
            select: { wishlistProductIds: true }
        });
        const wishlistCounts: Record<string, number> = {};
        allUsers.forEach(user => {
            user.wishlistProductIds.forEach(productId => {
                wishlistCounts[productId] = (wishlistCounts[productId] || 0) + 1;
            });
        });
        const productIds = Object.keys(wishlistCounts);
        const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
        const analytics = products.map(product => ({
            product,
            count: wishlistCounts[product.id]
        })).sort((a, b) => b.count - a.count);

        res.json(analytics);
    } catch (error) {
        next(error);
    }
};

// Notifications Controller
export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { orderDate: 'desc' },
            where: { status: 'Processing' }
        });

        const newUsers = await prisma.user.findMany({
            take: 3,
            orderBy: { joinDate: 'desc' },
            where: { role: 'USER' }
        });

        const notifications: any[] = [];

        recentOrders.forEach(order => {
            notifications.push({
                id: `order_${order.id}`,
                title: 'New Order Received',
                message: `Order #${order.id.slice(-6)} for ₹${order.totalAmount.toFixed(2)} needs processing.`,
                type: 'order',
                seen: false, // In a real app, this would be stored per admin
                timestamp: order.orderDate.toISOString(),
                link: {
                    page: 'adminDashboard',
                    data: { section: 'orders_all' }
                }
            });
        });

        newUsers.forEach(user => {
            notifications.push({
                id: `user_${user.id}`,
                title: 'New User Registered',
                message: `${user.name} has just signed up.`,
                type: 'user',
                seen: false,
                timestamp: user.joinDate.toISOString(),
                link: {
                    page: 'adminDashboard',
                    data: { section: 'customers_all' }
                }
            });
        });

        // Sort by timestamp desc
        notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        res.json(notifications);
    } catch (error) {
        next(error);
    }
};