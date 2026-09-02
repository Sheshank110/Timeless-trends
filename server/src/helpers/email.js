import transporter from '../config/email.js';
import { env } from '../config/env.js';

/**
 * Send email using configured transporter
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: `"TIMELESS TRENDS" <${env.EMAIL_USER}>`,
    to,
    subject,
    html,
    text,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Email verification template
 */
export const verificationEmailTemplate = (name, verificationUrl) => ({
  subject: 'Verify Your Email — TIMELESS TRENDS',
  html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF9F6; padding: 40px 30px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: Georgia, serif; font-size: 24px; color: #111; letter-spacing: 3px; margin: 0;">TIMELESS TRENDS</h1>
      </div>
      <div style="background: #fff; padding: 40px 30px; border: 1px solid #eee;">
        <h2 style="font-size: 20px; color: #111; margin: 0 0 20px;">Welcome, ${name}!</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.7;">Thank you for creating an account with TIMELESS TRENDS. Please verify your email address to get started.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="display: inline-block; background: #111; color: #fff; padding: 14px 40px; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Verify Email</a>
        </div>
        <p style="color: #999; font-size: 13px; line-height: 1.6;">If you didn't create this account, you can safely ignore this email. This link expires in 24 hours.</p>
      </div>
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #bbb; font-size: 12px;">© ${new Date().getFullYear()} TIMELESS TRENDS. All rights reserved.</p>
      </div>
    </div>
  `,
});

/**
 * Password reset email template
 */
export const resetPasswordEmailTemplate = (name, resetUrl) => ({
  subject: 'Reset Your Password — TIMELESS TRENDS',
  html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF9F6; padding: 40px 30px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: Georgia, serif; font-size: 24px; color: #111; letter-spacing: 3px; margin: 0;">TIMELESS TRENDS</h1>
      </div>
      <div style="background: #fff; padding: 40px 30px; border: 1px solid #eee;">
        <h2 style="font-size: 20px; color: #111; margin: 0 0 20px;">Password Reset</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.7;">Hi ${name}, we received a request to reset your password. Click the button below to set a new password.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: #111; color: #fff; padding: 14px 40px; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Reset Password</a>
        </div>
        <p style="color: #999; font-size: 13px; line-height: 1.6;">If you didn't request a password reset, you can safely ignore this email. This link expires in 1 hour.</p>
      </div>
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #bbb; font-size: 12px;">© ${new Date().getFullYear()} TIMELESS TRENDS. All rights reserved.</p>
      </div>
    </div>
  `,
});

/**
 * Order confirmation email template
 */
export const orderConfirmationEmailTemplate = (name, order) => ({
  subject: `Order Confirmed #${order.orderNumber} — TIMELESS TRENDS`,
  html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF9F6; padding: 40px 30px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: Georgia, serif; font-size: 24px; color: #111; letter-spacing: 3px; margin: 0;">TIMELESS TRENDS</h1>
      </div>
      <div style="background: #fff; padding: 40px 30px; border: 1px solid #eee;">
        <h2 style="font-size: 20px; color: #111; margin: 0 0 20px;">Order Confirmed!</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.7;">Hi ${name}, thank you for your order! Your order <strong>#${order.orderNumber}</strong> has been confirmed.</p>
        <div style="background: #FAF9F6; padding: 20px; margin: 20px 0; border-radius: 4px;">
          <p style="color: #333; font-size: 14px; margin: 5px 0;"><strong>Order Total:</strong> ₹${order.totalAmount}</p>
          <p style="color: #333; font-size: 14px; margin: 5px 0;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p style="color: #333; font-size: 14px; margin: 5px 0;"><strong>Items:</strong> ${order.items?.length || 0}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${env.CLIENT_URL}/orders/${order._id}" style="display: inline-block; background: #111; color: #fff; padding: 14px 40px; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Track Order</a>
        </div>
      </div>
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #bbb; font-size: 12px;">© ${new Date().getFullYear()} TIMELESS TRENDS. All rights reserved.</p>
      </div>
    </div>
  `,
});
