import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * POST /api/ai/stylist-chat
 * Smart luxury fashion assistant responding to style queries
 */
export const chatWithStylist = asyncHandler(async (req, res) => {
  const { message, occasion, gender = 'unisex' } = req.body;

  // Retrieve relevant product catalog items
  const products = await Product.find({ isPublished: true }).limit(8).select('name price images slug gender category fit');

  const lowerMsg = (message || '').toLowerCase();

  let advice = '';
  let matchedProducts = [];

  if (lowerMsg.includes('date') || lowerMsg.includes('dinner') || lowerMsg.includes('evening') || occasion === 'evening') {
    advice = "For an evening dinner or date night, sophistication lies in understated textures. Pair a structured blazer or crisp classic linen shirt with tailored straight-leg trousers and clean minimalist footwear. Keep accessories minimal with a single refined timepiece.";
    matchedProducts = products.filter((p) => p.name.includes('Shirt') || p.name.includes('Blazer') || p.name.includes('Jacket'));
  } else if (lowerMsg.includes('casual') || lowerMsg.includes('weekend') || lowerMsg.includes('brunch') || occasion === 'casual') {
    advice = "For effortless weekend styling, embrace clean silhouettes with relaxed volume. Our Essential Oversized Tee paired with relaxed straight-leg selvedge denim provides comfort without compromising on contemporary style.";
    matchedProducts = products.filter((p) => p.name.includes('Tee') || p.name.includes('Jeans') || p.name.includes('Hoodie'));
  } else if (lowerMsg.includes('formal') || lowerMsg.includes('office') || lowerMsg.includes('work') || occasion === 'formal') {
    advice = "For smart-casual and modern office settings, focus on precision tailoring. An Oxford button-down shirt paired with tailored chinos or utility jacket delivers a polished yet fashion-forward statement.";
    matchedProducts = products.filter((p) => p.name.includes('Oxford') || p.name.includes('Jacket') || p.name.includes('Shirt'));
  } else {
    advice = `Welcome to TIMELESS TRENDS. To build a versatile capsule wardrobe, we recommend starting with high-GSM organic cotton essentials, versatile selvedge denim, and structured layering pieces that effortlessly transition across seasons.`;
    matchedProducts = products.slice(0, 4);
  }

  if (matchedProducts.length === 0) {
    matchedProducts = products.slice(0, 3);
  }

  ApiResponse.success(res, {
    response: advice,
    recommendedProducts: matchedProducts,
  });
});
