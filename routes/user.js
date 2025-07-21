const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/:userId", (req, res) => {
  res.send("User Account");
});
router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (req.body.userId !== userId) {
    return res.status(403).json("You can update only your account!");
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = {
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (req.body.userId !== userId) {
    return res.status(403).json("You can delete only your account!");
  }

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
