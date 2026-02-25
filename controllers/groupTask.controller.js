import Task from '../models/Task.js';

const createGroupTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id,
    group: req.group._id,
  });

  res.status(201).json({ message: 'Task created', task });
};

const getGroupTasks = async (req, res) => {
  console.log(req.params.groupId);
  const tasks = await Task.find({
    group: req.group._id,
  });

  res.json({ total: tasks.length, tasks });
};

export { createGroupTask, getGroupTasks };
