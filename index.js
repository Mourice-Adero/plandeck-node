const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use(express.json());

dotenv.config();
const dbString = process.env.MONGO_DB;
mongoose.connect(dbString);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Backend running on port " + port);
});
