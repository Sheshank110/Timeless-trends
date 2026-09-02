import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Get all products with filtering, sorting, and pagination
 */
export const getProducts = async (query) => {
  const {
    page = 1, limit = 12, sort = '-createdAt',
    gender, category, minPrice, maxPrice, size, color,
    rating, search, featured, trending, newArrival, brand,
  } = query;

  const filter = { isPublished: true };

  if (gender) filter.gender = gender;
  if (category) filter.category = category;
  if (brand) filter.brand = { $regex: brand, $options: 'i' };
  if (featured === 'true') filter.isFeatured = true;
  if (trending === 'true') filter.isTrending = true;
  if (newArrival === 'true') filter.isNewArrival = true;
  if (size) filter.sizes = { $in: size.split(',') };
  if (color) filter['colors.name'] = { $in: color.split(',').map(c => new RegExp(c, 'i')) };
  if (rating) filter['rating.average'] = { $gte: Number(rating) };

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  // Sort mapping
  const sortMap = {
    'price-asc': { price: 1 },
    'price-desc': { price: -1 },
    'newest': { createdAt: -1 },
    'popular': { 'rating.count': -1 },
    'rating': { 'rating.average': -1 },
    'trending': { isTrending: -1, createdAt: -1 },
  };
  const sortOption = sortMap[sort] || { createdAt: -1 };

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate('category', 'name slug')
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit))
    .lean();

  return {
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

/**
 * Get single product by slug or ID
 */
export const getProductBySlug = async (slugOrId) => {
  let product = await Product.findOne({ slug: slugOrId })
    .populate('category', 'name slug')
    .lean();

  if (!product) {
    // Try by ID
    product = await Product.findById(slugOrId)
      .populate('category', 'name slug')
      .lean();
  }

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  return product;
};

/**
 * Create product (admin)
 */
export const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

/**
 * Update product (admin)
 */
export const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  return product;
};

/**
 * Delete product (admin)
 */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

/**
 * Get related products
 */
export const getRelatedProducts = async (productId, limit = 4) => {
  const product = await Product.findById(productId);
  if (!product) return [];

  return Product.find({
    _id: { $ne: productId },
    isPublished: true,
    $or: [
      { category: product.category },
      { gender: product.gender },
    ],
  })
    .limit(limit)
    .lean();
};
