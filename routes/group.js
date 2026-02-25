import { Router } from 'express';
import { createGroup } from '../controllers/group.controller';
import validate from '../middleware/validateSchema';
import { groupSchema } from '../schema/group.schema';

const router = Router();

router.post('/', validateIdMiddleware, validate(groupSchema), createGroup); // Create group
