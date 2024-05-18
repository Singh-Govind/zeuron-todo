const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Task = {};

Task.getTask = async (req, res) => {
  try {
    let id = req.headers["authorization"];
    const { filter } = req.query;

    if (!id) {
      return res.status(404).json({ msg: "not found" });
    }

    let makeQuery = {
      userId: parseInt(id),
    };

    if (filter) {
      makeQuery = {
        ...makeQuery,
        priority: filter,
      };
    }

    const tasks = await prisma.task.findMany({
      where: makeQuery,
    });

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

    const task = await prisma.task.create({
      data: {
        name,
        category,
        finished,
        priority,
        userId: parseInt(id),
      },
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

    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
        userId: parseInt(userId),
      },
      data: { ...obj },
    });

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

    await prisma.task.delete({
      where: {
        id: parseInt(id),
        userId: parseInt(userId),
      },
    });

    res.json({ msg: "task deleted" });
  } catch (e) {
    res.status(500).json({ msg: "Internal Server Error", err: e.message });
  }
};

module.exports = Task;
