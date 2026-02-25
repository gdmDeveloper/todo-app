import { z } from 'zod';

const joinGroupSchema = z.object({
  groupId: z.string(),
});

const createGroupSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string().max(100).optional(),
});

const searchGroupSchema = z.object({
  code: z.string(),
});

export { createGroupSchema, joinGroupSchema, searchGroupSchema };
