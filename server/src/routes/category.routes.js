import { Router } from 'express';
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
