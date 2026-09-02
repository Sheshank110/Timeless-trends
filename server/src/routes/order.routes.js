import { Router } from 'express';
import { createOrder, getMyOrders, getOrderDetails, updateOrderStatus } from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = Router();

router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderDetails);
router.put('/:id/status', adminOnly, updateOrderStatus);

export default router;
