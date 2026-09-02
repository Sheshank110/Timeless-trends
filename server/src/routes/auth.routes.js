import { Router } from 'express';
import { register, login, logout, refreshToken, verifyEmail, forgotPassword, resetPassword, getMe } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../validators/auth.validator.js';

const router = Router();

// Rate limit auth routes
router.use(authLimiter);

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.get('/me', protect, getMe);

export default router;
