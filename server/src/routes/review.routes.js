import { Router } from 'express';
import Review from '../models/Review.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const router = Router();

// GET /api/reviews/product/:productId
router.get(
  '/product/:productId',
  asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId, isApproved: true })
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 });
    ApiResponse.success(res, reviews);
  })
);

// POST /api/reviews
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { product, rating, title, comment } = req.body;
    const existing = await Review.findOne({ user: req.user._id, product });
    if (existing) throw new ApiError(400, 'You have already reviewed this product');

    const review = await Review.create({
      user: req.user._id,
      product,
      rating,
      title,
      comment,
      isApproved: true, // auto-approve for seamless user experience
    });

    ApiResponse.created(res, review, 'Review submitted successfully');
  })
);

export default router;
