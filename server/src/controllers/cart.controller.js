import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as cartService from '../services/cart.service.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  ApiResponse.success(res, cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addItemToCart(req.user._id, req.body);
  ApiResponse.success(res, cart, 'Item added to bag');
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateCartItemQuantity(req.user._id, req.params.itemId, req.body.quantity);
  ApiResponse.success(res, cart, 'Cart updated');
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await cartService.removeItemFromCart(req.user._id, req.params.itemId);
  ApiResponse.success(res, cart, 'Item removed from bag');
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearUserCart(req.user._id);
  ApiResponse.success(res, cart, 'Cart cleared');
});
