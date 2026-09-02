import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as orderService from '../services/order.service.js';

export const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.user._id, req.body);
  ApiResponse.created(res, order, 'Order placed successfully');
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getUserOrders(req.user._id);
  ApiResponse.success(res, orders);
});

export const getOrderDetails = asyncHandler(async (req, res) => {
  // If admin, can view any order; else must be own
  const userId = req.user.role === 'admin' ? null : req.user._id;
  const order = await orderService.getOrderById(req.params.id, userId);
  ApiResponse.success(res, order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status, req.body.note);
  ApiResponse.success(res, order, 'Order status updated');
});
