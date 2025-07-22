const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    subtasks: [{ title: { type: String }, completed: { type: Boolean } }],
    completed: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", taskSchema);
