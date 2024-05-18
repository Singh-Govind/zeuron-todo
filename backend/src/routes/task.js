const express = require("express");
const Task = require("../controller/task");

const router = express.Router();

router.get("/", Task.getTask);
router.post("/add", Task.addTask);
router.post("/update/:id", Task.updateTask);
router.delete("/:id", Task.deleteTask);

module.exports = router;
