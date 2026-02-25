import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(2).max(100),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2).max(100),
});

export { registerSchema, loginSchema };
