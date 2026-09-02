import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Generate access token (short-lived)
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE,
  });
};

/**
 * Generate refresh token (long-lived)
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRE,
  });
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};

/**
 * Set auth cookies on response
 */
export const setAuthCookies = (res, accessToken, refreshToken) => {
  const isProduction = env.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth/refresh',
  });
};

/**
 * Clear auth cookies
 */
export const clearAuthCookies = (res) => {
  res.cookie('accessToken', '', { httpOnly: true, expires: new Date(0) });
  res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0), path: '/api/auth/refresh' });
};
