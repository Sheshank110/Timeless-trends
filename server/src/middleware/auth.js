import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Protect routes — require authentication
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check HTTP-only cookie first, then Authorization header
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized — no token provided');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new ApiError(401, 'Not authorized — user not found');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'Account has been deactivated. Contact support.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, 'Not authorized — invalid token');
  }
});

/**
 * Optional authentication — sets req.user if token exists but doesn't block
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch {
      // Token invalid — continue without user
    }
  }

  next();
});
