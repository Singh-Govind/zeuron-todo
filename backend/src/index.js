const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.json({ msg: "welcome to home route" });
});

// app.listen(PORT, () => {
//   console.log(`server started at ${PORT}`);
// });

module.exports = app;
