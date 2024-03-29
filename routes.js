const express = require('express');
const router = express.Router();
const Task = require('./models/task');

// Create a task
router.post('/tasks', async (req, res) => {
  try {
    const { name, priority } = req.body;
    const task = new Task({ name, priority });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a task
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'priority', 'status'];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
