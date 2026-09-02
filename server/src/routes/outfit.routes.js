import { Router } from 'express';
import Outfit from '../models/Outfit.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

router.get(
  '/my-outfits',
  protect,
  asyncHandler(async (req, res) => {
    const outfits = await Outfit.find({ user: req.user._id }).sort({ createdAt: -1 });
    ApiResponse.success(res, outfits);
  })
);

router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const outfit = await Outfit.create({
      ...req.body,
      user: req.user._id,
    });
    ApiResponse.created(res, outfit, 'Outfit saved');
  })
);

export default router;
