
import { Response, NextFunction } from 'express';
import Razorpay from 'razorpay';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/auth.middleware';
import config from '../config';

const razorpay = new Razorpay({
    key_id: config.razorpay.keyId!,
    key_secret: config.razorpay.keySecret!,
});

export const createRazorpayOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { totalAmount } = req.body;
    if (!totalAmount) {
        return res.status(400).json({ message: 'Total amount is required' });
    }

    const options = {
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ orderId: order.id });
    } catch (error) {
        next(error);
    }
};

export const placeOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { order: orderData, guestDetails } = req.body;
    const userId = req.user?.id;

    if (!userId && !guestDetails?.email) {
        return res.status(401).json({ message: 'Authentication is required to place an order.' });
    }

    try {
        const orderItems = orderData.items.map((item: any) => ({
            productId: item.id,
            variantId: item.selectedVariant.id,
            quantity: item.quantity,
            priceAtPurchase: item.selectedVariant.price,
            variantSnapshot: item.selectedVariant.attributes,
        }));
        
        const newOrder = await prisma.order.create({
            data: {
                totalAmount: orderData.totalAmount,
                status: 'Processing',
                shippingAddress: orderData.shippingAddress,
                paymentType: orderData.paymentType,
                deliveryType: orderData.deliveryType,
                deliveryCharge: orderData.deliveryCharge,
                appliedCouponCode: orderData.appliedCouponCode,
                discountAmount: orderData.discountAmount,
                userId: userId,
                customerName: orderData.customerName,
                items: {
                    create: orderItems,
                }
            },
        });

        const firstItemName = orderData.items[0]?.name || 'an item';
        await prisma.activityLog.create({
            data: {
                message: `Someone in ${orderData.shippingAddress.city} just purchased a "${firstItemName}".`
            }
        });
        
        res.status(201).json({ success: true, order: newOrder });

    } catch (error) {
        next(error);
    }
};