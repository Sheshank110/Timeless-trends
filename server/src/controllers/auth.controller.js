import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { setAuthCookies, clearAuthCookies } from '../helpers/token.js';
import * as authService from '../services/auth.service.js';

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.registerUser(req.body);

  setAuthCookies(res, accessToken, refreshToken);

  ApiResponse.created(res, { user, accessToken }, 'Account created successfully. Please verify your email.');
});

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body);

  setAuthCookies(res, accessToken, refreshToken);

  ApiResponse.success(res, { user, accessToken }, 'Login successful');
});

/**
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookies(res);
  ApiResponse.success(res, null, 'Logged out successfully');
});

/**
 * POST /api/auth/refresh
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken, refreshToken: newRefreshToken } = await authService.refreshAccessToken(token);

  setAuthCookies(res, accessToken, newRefreshToken);

  ApiResponse.success(res, { accessToken }, 'Token refreshed');
});

/**
 * GET /api/auth/verify-email/:token
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  await authService.verifyEmail(req.params.token);
  ApiResponse.success(res, null, 'Email verified successfully');
});

/**
 * POST /api/auth/forgot-password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  // Always return success to prevent email enumeration
  ApiResponse.success(res, null, 'If an account exists with that email, a reset link has been sent.');
});

/**
 * POST /api/auth/reset-password
 */
export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  ApiResponse.success(res, null, 'Password reset successful. You can now log in.');
});

/**
 * GET /api/auth/me — Get current user
 */
export const getMe = asyncHandler(async (req, res) => {
  ApiResponse.success(res, { user: req.user });
});
