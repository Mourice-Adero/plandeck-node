const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/task");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

dotenv.config();
const dbString = process.env.MONGO_DB;
mongoose.connect(dbString);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Backend running on port " + port);
});
