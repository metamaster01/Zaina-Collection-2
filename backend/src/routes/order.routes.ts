
import express from 'express';
import { createRazorpayOrder, placeOrder } from '../controllers/order.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/payment/create', isAuthenticated, createRazorpayOrder);
router.post('/', isAuthenticated, placeOrder);

export default router;