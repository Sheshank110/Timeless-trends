import Wishlist from '../models/Wishlist.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: 'products',
    select: 'name slug price originalPrice images gender category rating inStock stock',
    populate: { path: 'category', select: 'name' }
  });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }
  ApiResponse.success(res, wishlist);
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [productId] });
  } else {
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
  }
  ApiResponse.success(res, wishlist, 'Added to wishlist');
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (wishlist) {
    wishlist.products.pull(productId);
    await wishlist.save();
  }
  ApiResponse.success(res, wishlist, 'Removed from wishlist');
});
