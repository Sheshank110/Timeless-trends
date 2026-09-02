const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];

// Validate required environment variables
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingVars.length > 0 && process.env.NODE_ENV !== 'test') {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('   Please check your .env file.');
  process.exit(1);
}

export const env = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  MONGO_URI: process.env.MONGO_URI || '',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '15m',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',

  // Razorpay
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',

  // Email
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',

  // WhatsApp
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '',

  // AI
  AI_PROVIDER: process.env.AI_PROVIDER || 'openai',
  AI_API_KEY: process.env.AI_API_KEY || '',

  // Client
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
