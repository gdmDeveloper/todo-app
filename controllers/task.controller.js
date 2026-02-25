import Task from '../models/Task.js';

/**
 * Get tasks from the API
 * User can write down in the query the following params for the task search
 * @param completed
 * @param priority
 * @param {*} req
 * @param {*} res
 */

const getTasks = async (req, res) => {
  const { completed, priority } = req.query;
  const filter = { user: req.user.id }; // from payload

  if (completed !== undefined) filter.completed = completed === 'true';

  if (priority) filter.priority = priority;

  const task = await Task.find(filter).populate('user', 'name -_id').sort({ createdAt: -1 });
  res.json({ total: task.length, task });
};

const getTaskById = async (req, res) => {
  console.log('entra');
  const id = req.params.id;
  console.log(id);
  const task = await Task.findById(id);
  res.status(201).json(task);
};

/**
 * Creates new task
 * @param {*} req
 * @param {*} res
 */
const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(task);
};

export { getTasks, createTask, getTaskById };
