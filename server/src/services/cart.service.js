import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

export const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price images slug stock');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

export const addItemToCart = async (userId, { productId, size, color, quantity = 1 }) => {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, 'Insufficient stock available');

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingIndex = cart.items.findIndex(
    (i) => i.product.toString() === productId && i.size === size && i.color === color
  );

  if (existingIndex > -1) {
    cart.items[existingIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      name: product.name,
      image: product.images?.[0]?.url || '',
      price: product.price,
      size,
      color: color || '',
      quantity,
    });
  }

  await cart.save();
  return cart;
};

export const updateCartItemQuantity = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, 'Cart not found');

  const item = cart.items.id(itemId);
  if (!item) throw new ApiError(404, 'Item not found in cart');

  if (quantity <= 0) {
    cart.items.pull(itemId);
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  return cart;
};

export const removeItemFromCart = async (userId, itemId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, 'Cart not found');

  cart.items.pull(itemId);
  await cart.save();
  return cart;
};

export const clearUserCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return cart;
};
