import { Router } from 'express';
import multer from 'multer';
import { uploadImage, deleteImage } from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/admin.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'Image file is required');

    // Convert buffer to base64 data URI
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    const result = await uploadImage(dataURI, 'products');
    ApiResponse.success(res, { url: result.url, publicId: result.publicId }, 'Image uploaded successfully');
  })
);

router.delete(
  '/:publicId',
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    await deleteImage(req.params.publicId);
    ApiResponse.success(res, null, 'Image deleted successfully');
  })
);

export default router;
