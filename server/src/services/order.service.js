import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import { sendEmail, orderConfirmationEmailTemplate } from '../helpers/email.js';

export const createOrder = async (userId, orderData) => {
  const { items, shippingAddress, billingAddress, paymentMethod, couponCode, customerNote } = orderData;

  if (!items || items.length === 0) {
    throw new ApiError(400, 'Order must contain at least one item');
  }

  // Calculate pricing
  let subtotal = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) throw new ApiError(404, `Product not found: ${item.name}`);
    if (product.stock < item.quantity) {
      throw new ApiError(400, `Not enough stock for ${product.name}`);
    }
    subtotal += product.price * item.quantity;
  }

  const shippingCharge = subtotal >= 999 ? 0 : 79;
  const tax = 0; // GST included
  let discount = 0;

  if (couponCode === 'WELCOME10') {
    discount = Math.round(subtotal * 0.1);
  }

  const totalAmount = subtotal + shippingCharge - discount;

  const order = await Order.create({
    user: userId,
    items,
    shippingAddress,
    billingAddress: billingAddress || shippingAddress,
    subtotal,
    shippingCharge,
    tax,
    discount,
    totalAmount,
    paymentMethod,
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
    status: 'confirmed',
    couponCode,
    customerNote,
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days delivery
  });

  // Deduct product stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  // Clear cart
  await Cart.findOneAndUpdate({ user: userId }, { items: [] });

  return order;
};

export const getUserOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

export const getOrderById = async (orderId, userId = null) => {
  const query = { _id: orderId };
  if (userId) query.user = userId;

  const order = await Order.findOne(query).populate('user', 'firstName lastName email phone');
  if (!order) throw new ApiError(404, 'Order not found');
  return order;
};

export const updateOrderStatus = async (orderId, status, note = '') => {
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, 'Order not found');

  order.status = status;
  if (status === 'delivered') {
    order.deliveredAt = new Date();
  }
  await order.save();
  return order;
};
