const router = require("express").Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const getUser = await User.findOne({ email: req.body.email });
    !getUser && res.status(400).json("Wrong credentials");

    const validated = await bcrypt.compare(req.body.password, getUser.password);
    !validated && res.status(400).json("Wrong credentials");

    const { password, ...ohters } = getUser._doc;
    res.status(200).json(ohters);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
