import User from '../models/User.js';
import Address from '../models/Address.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  ApiResponse.success(res, user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { firstName, lastName, phone },
    { new: true, runValidators: true }
  );
  ApiResponse.success(res, user, 'Profile updated successfully');
});

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
  ApiResponse.success(res, addresses);
});

export const addAddress = asyncHandler(async (req, res) => {
  const existingCount = await Address.countDocuments({ user: req.user._id });
  const isDefault = existingCount === 0 ? true : !!req.body.isDefault;

  const address = await Address.create({
    ...req.body,
    user: req.user._id,
    isDefault,
  });
  ApiResponse.created(res, address, 'Address added successfully');
});

export const updateAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!address) throw new ApiError(404, 'Address not found');
  ApiResponse.success(res, address, 'Address updated successfully');
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!address) throw new ApiError(404, 'Address not found');
  ApiResponse.success(res, null, 'Address deleted successfully');
});
