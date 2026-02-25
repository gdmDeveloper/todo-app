import { Router } from 'express';
import {
  createGroup,
  getUserGroups,
  joinGroup,
  searchGroup,
} from '../controllers/group.controller.js';
import schemaValidatorMiddleware from '../middleware/validateSchema.js';
import validateToken from '../middleware/authToken.js';
import { createGroupSchema, joinGroupSchema, searchGroupSchema } from '../schema/groups.schema.js';
import { isGroupMember } from '../middleware/isGroupMember.js';
import { createGroupTask, getGroupTasks } from '../controllers/groupTask.controller.js';
import { taskSchema } from '../schema/task.schema.js';

const router = Router();

router.use(validateToken);

router.get('/', getUserGroups);
router.post('/', schemaValidatorMiddleware(createGroupSchema), createGroup); // Create group
router.get('/search', schemaValidatorMiddleware(searchGroupSchema, 'query'), searchGroup); // Search group. Doesn't join on query, needs user confirmation.
router.post('/join', schemaValidatorMiddleware(joinGroupSchema), joinGroup); // Join group. Sends groupId.

/*
 * Routes for creating and sharing tasks in a same group
 * Logic at controllers/groupTask.controller.js
 */
/*
POST /api/grupos/:groupId/tareas    → crear tarea en el grupo
GET  /api/grupos/:groupId/tareas    → ver tareas del grupo
PUT  /api/grupos/:groupId/tareas/:tareaId   → editar tarea
DELETE /api/grupos/:groupId/tareas/:tareaId → eliminar tarea
```
*/

router.post(
  '/:groupId/tasks',
  isGroupMember,
  schemaValidatorMiddleware(taskSchema),
  createGroupTask,
); // Create new task in a group
router.get('/:groupId/tasks', isGroupMember, getGroupTasks); // Get all tasks

export default router;
