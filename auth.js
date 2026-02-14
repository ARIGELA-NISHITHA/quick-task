const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.create({
    email: req.body.email,
    password: hashed
  });
  res.json({ message: "Registered" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!valid)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({ token, userId: user._id });
});

module.exports = router;
