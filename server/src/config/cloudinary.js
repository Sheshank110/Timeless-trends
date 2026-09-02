import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (fileStr, folder = 'products') => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: `timeless-trends/${folder}`,
      resource_type: 'auto',
    });
    return {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    };
  } catch (error) {
    if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY) {
      return {
        url: fileStr.startsWith('data:') ? 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' : fileStr,
        publicId: `mock_${Date.now()}`,
      };
    }
    throw error;
  }
};

export const deleteImage = async (publicId) => {
  try {
    if (publicId && !publicId.startsWith('mock_')) {
      return await cloudinary.uploader.destroy(publicId);
    }
    return { result: 'ok' };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return null;
  }
};

export { cloudinary };
export default cloudinary;
