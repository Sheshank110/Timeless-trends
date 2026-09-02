import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as productService from '../services/product.service.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { products, pagination } = await productService.getProducts(req.query);
  ApiResponse.paginated(res, products, pagination);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.id);
  ApiResponse.success(res, product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  ApiResponse.created(res, product, 'Product created successfully');
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  ApiResponse.success(res, product, 'Product updated successfully');
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  ApiResponse.success(res, null, 'Product deleted successfully');
});

export const getRelatedProducts = asyncHandler(async (req, res) => {
  const products = await productService.getRelatedProducts(req.params.id);
  ApiResponse.success(res, products);
});
