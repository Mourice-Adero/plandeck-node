const router = require("express").Router();
const Task = require("../models/Task");

router.post("/", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
    time: req.body.time,
    subtasks: req.body.subtasks,
    userId: req.body.userId,
  });

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
    time: req.body.time,
    subtasks: req.body.subtasks,
  };
  try {
    const task = await Task.findByIdAndUpdate(
      { _id: taskId, userId: req.body.userId },
      updatedTask,
      {
        new: true,
      }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await Task.findByIdAndDelete({ _id: taskId, userId: req.body.userId });
    res.status(200).json("Task deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
