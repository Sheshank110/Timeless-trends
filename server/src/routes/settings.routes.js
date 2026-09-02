import { Router } from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

// Public site settings for client
router.get(
  '/',
  asyncHandler(async (req, res) => {
    let settings = await SiteSettings.findById('site-settings');
    if (!settings) {
      settings = await SiteSettings.create({ _id: 'site-settings' });
    }
    ApiResponse.success(res, settings);
  })
);

export default router;
