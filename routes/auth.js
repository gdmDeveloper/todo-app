import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../schema/auth.schema.js';
import validate from '../middleware/validateSchema.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
