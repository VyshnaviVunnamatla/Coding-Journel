const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

router.get("/", async (req, res) => {
  const problems = await Problem.find().sort({ date: -1 });
  res.json(problems);
});

router.post("/", async (req, res) => {
  const newProblem = new Problem(req.body);
  const saved = await newProblem.save();
  res.json(saved);
});

router.put("/:id", async (req, res) => {
  const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Problem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
