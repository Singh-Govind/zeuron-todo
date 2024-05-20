const { default: mongoose } = require("mongoose");
const TaskModel = require("../model/task");

const Task = {};

Task.getTask = async (req, res) => {
  try {
    let id = req.headers["authorization"];
    const { filter } = req.query;

    if (!id) {
      return res.status(404).json({ msg: "not found" });
    }

    let makeQuery = {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
      },
    };

    if (filter) {
      makeQuery.$match.priority = filter;
    }

    const pipeline = [makeQuery];

    const tasks = await TaskModel.aggregate(pipeline);

    res.json({ msg: "ok", tasks });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Task.addTask = async (req, res) => {
  try {
    let id = req.headers["authorization"];

    const {
      name,
      category = "pending",
      priority = "low",
      finished = false,
    } = req.body;

    if (!name) {
      return res.status(401).json({ msg: "please send all the data" });
    }

    if (!id) {
      return res.status(404).json({ msg: "not found" });
    }

    const task = await TaskModel.create({
      name,
      category,
      finished,
      priority,
      userId: id,
    });

    res.json({ msg: "task added", task });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Task.updateTask = async (req, res) => {
  try {
    let userId = req.headers["authorization"];
    let { id } = req.params;

    const data = req.body;

    const filter = ["name", "finished", "category", "priority"];
    const catValue = ["pending", "done", "started"];
    const priorityValue = ["low", "medium", "high"];
    const finValue = [true, false];

    let obj = {};

    for (const d in data) {
      if (filter.includes(d)) {
        if (d === "category" && !catValue.includes(data[d])) {
          continue;
        }
        if (d === "finished" && !finValue.includes(data[d])) {
          continue;
        }
        if (d === "priority" && !priorityValue.includes(data[d])) {
          continue;
        }
        obj = {
          ...obj,
          [d]: data[d],
        };
      }
    }

    if (!id || !userId) {
      return res.status(404).json({ msg: "not found" });
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: id,
        userId: userId,
      },
      obj,
      { new: true }
    );

    res.json({ msg: "task updated", updatedTask });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

Task.deleteTask = async (req, res) => {
  try {
    let userId = req.headers["authorization"];
    let { id } = req.params;

    if (!id || !userId) {
      return res.status(404).json({ msg: "not found" });
    }

    await TaskModel.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    res.json({ msg: "task deleted" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

module.exports = Task;
