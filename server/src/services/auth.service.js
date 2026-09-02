import crypto from 'crypto';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../helpers/token.js';
import {
  sendEmail,
  verificationEmailTemplate,
  resetPasswordEmailTemplate,
} from '../helpers/email.js';
import { env } from '../config/env.js';

/**
 * Register a new user
 */
export const registerUser = async ({ firstName, lastName, email, password, phone }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'An account with this email already exists');
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
  });

  // Generate email verification token
  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send verification email
  const verificationUrl = `${env.CLIENT_URL}/verify-email/${verificationToken}`;
  const emailTemplate = verificationEmailTemplate(firstName, verificationUrl);

  try {
    await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });
  } catch (error) {
    console.warn('⚠️  Email sending failed:', error.message);
    // Don't fail registration if email fails
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Return user without password
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;
  delete userObj.emailVerificationToken;
  delete userObj.emailVerificationExpires;

  return { user: userObj, accessToken, refreshToken };
};

/**
 * Login user
 */
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Your account has been deactivated. Contact support.');
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Update user
  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token not provided');
  }

  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

/**
 * Verify email
 */
export const verifyEmail = async (token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired verification token');
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  return user;
};

/**
 * Forgot password — send reset email
 */
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    // Don't reveal whether email exists
    return;
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${env.CLIENT_URL}/reset-password/${resetToken}`;
  const emailTemplate = resetPasswordEmailTemplate(user.firstName, resetUrl);

  try {
    await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, 'Failed to send reset email. Please try again.');
  }
};

/**
 * Reset password
 */
export const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return user;
};
