import { ApiError } from '../utils/ApiError.js';

/**
 * Restrict route to admin users only.
 * Must be used after the protect middleware.
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    throw new ApiError(403, 'Access denied — admin privileges required');
  }
};
