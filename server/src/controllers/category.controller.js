import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Category from '../models/Category.js';
import { ApiError } from '../utils/ApiError.js';

export const getCategories = asyncHandler(async (req, res) => {
  const { gender } = req.query;
  const filter = { isActive: true };
  if (gender) filter.gender = { $in: [gender, 'all'] };

  const categories = await Category.find(filter)
    .populate('parent', 'name slug')
    .sort('sortOrder')
    .lean();

  ApiResponse.success(res, categories);
});

export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.id })
    .populate('parent', 'name slug')
    .lean();

  if (!category) throw new ApiError(404, 'Category not found');
  ApiResponse.success(res, category);
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  ApiResponse.created(res, category, 'Category created');
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) throw new ApiError(404, 'Category not found');
  ApiResponse.success(res, category, 'Category updated');
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');
  ApiResponse.success(res, null, 'Category deleted');
});
