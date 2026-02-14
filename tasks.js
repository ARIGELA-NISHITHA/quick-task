const router = require("express").Router();
const Task = require("../models/Task");

// Create Task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Get User Tasks
router.get("/:userId", async (req, res) => {
  const tasks = await Task.find({
    userId: req.params.userId
  });
  res.json(tasks);
});

// Delete Task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
