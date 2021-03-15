const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/api/v1/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;
  try {
    const user = new User({ name, phone, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "USER SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "USER SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

module.exports = router;
