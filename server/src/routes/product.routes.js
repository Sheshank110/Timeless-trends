import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getRelatedProducts } from '../controllers/product.controller.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = Router();

router.get('/', optionalAuth, getProducts);
router.get('/:id', getProduct);
router.get('/:id/related', getRelatedProducts);

// Admin routes
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
