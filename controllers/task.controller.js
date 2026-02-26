import Task from '../models/Task.js';

/**
 * * GET TASKS. USER CAN PROVIDE COMPLETED OR PRIORITY ARGUMENT IN REQUEST QUERY.
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
  const id = req.params.id;
  const task = await Task.findById(id);
  res.status(201).json(task);
};

/**
 * * CREATES NEW TASK
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

const editTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { ...req.body },
    { returnDocument: 'after' },
  );
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json({ message: 'Task updated', task });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json({ message: 'Task deleted' });
};

export { getTasks, createTask, getTaskById, editTask, deleteTask };
