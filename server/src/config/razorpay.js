import Razorpay from 'razorpay';
import { env } from './env.js';

let razorpayInstance = null;

if (env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  });
  console.log('✅ Razorpay initialized');
} else {
  console.warn('⚠️  Razorpay credentials not configured');
}

export { razorpayInstance };
export default razorpayInstance;
