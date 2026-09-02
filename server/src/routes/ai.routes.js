import { Router } from 'express';
import { chatWithStylist } from '../controllers/ai.controller.js';

const router = Router();

router.post('/stylist-chat', chatWithStylist);

export default router;
