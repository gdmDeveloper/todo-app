import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(100).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  completed: z.boolean().optional(),
});

export { taskSchema };
