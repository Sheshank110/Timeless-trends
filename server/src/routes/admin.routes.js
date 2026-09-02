import { Router } from 'express';
import {
  getDashboardStats,
  getAllUsers,
  toggleUserRole,
  getAllOrders,
  getInventory,
  updateStock,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getAdminReviews,
  moderateReview,
  getSiteSettings,
  updateSiteSettings,
} from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = Router();

router.use(protect, adminOnly);

router.get('/dashboard-stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', toggleUserRole);
router.get('/orders', getAllOrders);
router.get('/inventory', getInventory);
router.put('/inventory/:id', updateStock);
router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);
router.delete('/coupons/:id', deleteCoupon);
router.get('/reviews', getAdminReviews);
router.put('/reviews/:id/moderation', moderateReview);
router.get('/settings', getSiteSettings);
router.put('/settings', updateSiteSettings);

export default router;
