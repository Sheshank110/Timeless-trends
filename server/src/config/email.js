import nodemailer from 'nodemailer';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

// Verify connection on startup (non-blocking)
if (env.EMAIL_USER && env.EMAIL_PASSWORD) {
  transporter.verify()
    .then(() => console.log('✅ Email service connected'))
    .catch((err) => console.warn('⚠️  Email service not configured:', err.message));
}

export default transporter;
