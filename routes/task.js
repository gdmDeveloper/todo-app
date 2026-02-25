import { Router } from 'express';
import { createTask, getTaskById, getTasks } from '../controllers/task.controller.js';
import { taskSchema } from '../schema/task.schema.js';
import validate from '../middleware/validateSchema.js';
import validateToken from '../middleware/authToken.js';
import { validateIdMiddleware } from '../middleware/validateID.js';

const router = Router();

router.use(validateToken);

router.get('/', getTasks);
router.get('/:id', validateIdMiddleware, getTaskById);
router.post('/', validate(taskSchema), createTask);

export default router;
