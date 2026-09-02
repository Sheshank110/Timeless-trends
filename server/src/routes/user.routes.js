import { Router } from 'express';
import { getProfile, updateProfile, getAddresses, addAddress, updateAddress, deleteAddress } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/addresses', getAddresses);
router.post('/addresses', addAddress);
router.put('/addresses/:id', updateAddress);
router.delete('/addresses/:id', deleteAddress);

export default router;
