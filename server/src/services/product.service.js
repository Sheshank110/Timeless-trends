import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import { fallbackProducts } from '../data/fallbackProducts.js';

// Search term stemmer / synonyms helper
const getSearchTerms = (term) => {
  if (!term) return [];
  const clean = term.trim().toLowerCase();
  const terms = new Set([clean]);

  // Plural to singular
  if (clean.endsWith('ies')) terms.add(clean.slice(0, -3) + 'y');
  if (clean.endsWith('es')) terms.add(clean.slice(0, -2));
  if (clean.endsWith('s')) terms.add(clean.slice(0, -1));

  // Singular to plural
  terms.add(clean + 's');
  terms.add(clean + 'es');

  // Common fashion category synonyms
  if (clean.includes('shirt')) terms.add('shirt');
  if (clean.includes('tee') || clean.includes('t-shirt') || clean.includes('tshirt')) {
    terms.add('tee');
    terms.add('t-shirt');
  }
  if (clean.includes('jean') || clean.includes('denim')) {
    terms.add('jean');
    terms.add('denim');
  }
  if (clean.includes('pant') || clean.includes('trouser')) {
    terms.add('pant');
    terms.add('trouser');
  }

  return Array.from(terms);
};

// Helper to normalize plural/singular variants
const getVariants = (key) => {
  if (!key) return [];
  const k = key.toLowerCase().trim();
  const variants = new Set([k]);
  // plural -> singular
  variants.add(k.replace(/sses-(\d+)$/, 'ss-$1').replace(/s-(\d+)$/, '-$1'));
  // singular -> plural
  variants.add(k.replace(/ss-(\d+)$/, 'sses-$1').replace(/-(\d+)$/, 's-$1'));
  return Array.from(variants);
};

// Legacy alias mapping for resilience
const ALIAS_MAP = {
  'na-1': 'women-blazer-1',
  'na-2': 'men-shirt-2',
  'na-3': 'women-trouser-1',
  'na-4': 'men-jacket-1',
  'na-5': 'men-jacket-2',
  'na-6': 'women-dress-1',
  'na-7': 'women-blazer-2',
  'na-8': 'men-jean-1',
  'tr-1': 'men-jacket-1',
  'tr-2': 'women-dress-1',
  'tr-3': 'men-jean-1',
  'tr-4': 'women-shoe-1',
  'tr-5': 'men-tshirt-1',
  'tr-6': 'women-trouser-2',
  'tr-7': 'men-shirt-1',
  'tr-8': 'women-shoe-2',
  'cat-9': 'men-shoe-1',
  'cat-10': 'women-dress-2',
  'cat-11': 'men-trouser-1',
  'cat-12': 'women-jean-1',
  'sr-s1': 'men-shirt-1',
  'sr-s2': 'men-shirt-2',
  'sr-s3': 'women-blazer-1',
  'sr-s4': 'men-shirt-3',
};

/**
 * Get all products with filtering, sorting, and pagination
 */
export const getProducts = async (query) => {
  const {
    page = 1, limit = 12, sort = '-createdAt',
    gender, category, minPrice, maxPrice, size, color,
    rating, search, featured, trending, newArrival, brand,
  } = query;

  const isDbConnected = mongoose.connection.readyState === 1;

  // Offline / development fallback when MongoDB is not connected
  if (!isDbConnected) {
    let list = [...fallbackProducts];

    if (gender) {
      const g = gender.trim().toLowerCase();
      list = list.filter((p) => (p.gender || '').toLowerCase() === g);
    }
    if (category) {
      const c = category.trim().toLowerCase();
      const cSingular = c.endsWith('s') ? c.slice(0, -1) : c;
      list = list.filter((p) => {
        const catSlug = (p.category?.slug || '').toLowerCase();
        const catName = (p.category?.name || p.categoryName || '').toLowerCase();
        const catSingular = catName.endsWith('s') ? catName.slice(0, -1) : catName;
        return catSlug === c || catName === c || catSingular === cSingular || catSlug === cSingular;
      });
    }
    if (featured === 'true') list = list.filter((p) => p.isFeatured);
    if (trending === 'true') list = list.filter((p) => p.isTrending || (p.rating?.average || 0) >= 4.8);
    if (newArrival === 'true') list = list.filter((p) => p.isNewArrival);

    if (search) {
      const searchTerms = getSearchTerms(search);
      list = list.filter((p) => {
        const text = `${p.name} ${p.description} ${p.categoryName || p.category?.name} ${(p.tags || []).join(' ')} ${p.material || ''}`.toLowerCase();
        return searchTerms.some((term) => text.includes(term));
      });
    }

    if (minPrice) list = list.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'popular' || sort === 'rating') list.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));

    const total = list.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginated = list.slice(skip, skip + Number(limit));

    return {
      products: paginated,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)) || 1,
      },
    };
  }

  const filter = { isPublished: true };

  if (gender) filter.gender = new RegExp('^' + gender + '$', 'i');
  if (category) filter.category = category;
  if (brand) filter.brand = { $regex: brand, $options: 'i' };
  if (featured === 'true') filter.isFeatured = true;
  if (trending === 'true') filter.isTrending = true;
  if (newArrival === 'true') filter.isNewArrival = true;
  if (size) filter.sizes = { $in: size.split(',') };
  if (color) filter['colors.name'] = { $in: color.split(',').map((c) => new RegExp(c, 'i')) };
  if (rating) filter['rating.average'] = { $gte: Number(rating) };

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    const searchTerms = getSearchTerms(search);
    const regexList = searchTerms.map((t) => new RegExp(t, 'i'));
    filter.$or = [
      { name: { $in: regexList } },
      { description: { $in: regexList } },
      { tags: { $in: regexList } },
      { categoryName: { $in: regexList } },
      { material: { $in: regexList } },
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
  const isDbConnected = mongoose.connection.readyState === 1;
  const rawKey = String(slugOrId || '').trim();
  const lowerKey = rawKey.toLowerCase();
  const targetKey = ALIAS_MAP[lowerKey] || lowerKey;

  if (!isDbConnected) {
    const variants = new Set([
      targetKey,
      lowerKey,
      ...getVariants(targetKey),
      ...getVariants(lowerKey),
    ]);

    let product = fallbackProducts.find((p) => {
      const pSlug = (p.slug || '').toLowerCase();
      const pId = (p._id || '').toLowerCase();
      return variants.has(pSlug) || variants.has(pId);
    });

    // Fuzzy match if still not found
    if (!product) {
      product = fallbackProducts.find((p) => {
        const pSlug = (p.slug || '').toLowerCase();
        const pId = (p._id || '').toLowerCase();
        return pSlug.includes(lowerKey) || pId.includes(lowerKey);
      });
    }

    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }

  let product = await Product.findOne({
    $or: [{ slug: rawKey }, { slug: targetKey }, { _id: mongoose.isValidObjectId(rawKey) ? rawKey : null }]
  })
    .populate('category', 'name slug')
    .lean();

  if (!product && mongoose.isValidObjectId(rawKey)) {
    product = await Product.findById(rawKey)
      .populate('category', 'name slug')
      .lean();
  }

  if (!product) {
    // Fall back to fallback dataset before throwing 404
    const fbProduct = fallbackProducts.find((p) => {
      const pSlug = (p.slug || '').toLowerCase();
      const pId = (p._id || '').toLowerCase();
      return pSlug === targetKey || pId === targetKey;
    });
    if (fbProduct) return fbProduct;

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
  const isDbConnected = mongoose.connection.readyState === 1;
  const rawKey = String(productId || '').trim().toLowerCase();
  const targetKey = ALIAS_MAP[rawKey] || rawKey;

  if (!isDbConnected) {
    const current = fallbackProducts.find((p) => {
      const pSlug = (p.slug || '').toLowerCase();
      const pId = (p._id || '').toLowerCase();
      return pSlug === targetKey || pId === targetKey;
    });

    if (!current) return fallbackProducts.slice(0, limit);

    const currentGender = (current.gender || '').toLowerCase();
    const currentCat = (current.category?.slug || current.category?.name || current.categoryName || '').toLowerCase();

    const related = fallbackProducts.filter((p) => {
      if (p._id === current._id) return false;
      const pGender = (p.gender || '').toLowerCase();
      const pCat = (p.category?.slug || p.category?.name || p.categoryName || '').toLowerCase();
      return pCat === currentCat || pGender === currentGender;
    });

    return related.slice(0, limit);
  }

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
