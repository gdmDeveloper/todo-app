import { z } from 'zod';

export const groupSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string().max(100).optional(),
});
