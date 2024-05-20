const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
    default: "low",
  },
  category: {
    type: String,
    enum: ["pending", "done", "started"],
    required: true,
    default: "pending",
  },
  finished: { type: Boolean, default: false },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

const TaskModel = mongoose.model("task", taskSchema, "task");

module.exports = TaskModel;
