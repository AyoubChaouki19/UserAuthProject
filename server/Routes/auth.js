const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassowrd = await bcrypt.hash(password, 10);
    await Users.create({
      username: username,
      password: hashedPassowrd,
    });
    res.json({ message: "Registration successful" });
  } catch (error) {
    // Handle errors
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      where: { username: username },
    });
    if (user) {
      bcrypt.compare(password, user.password).then((same) => {
        if (!same) {
          res.json({ message: "Wrong combination" });
        } else {
          res.json({ message: "Log In Successful" });
        }
      });
    } else {
      res.json({ message: "Username Does Not Exists" });
    }
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ error: "Login Failed" });
  }
});
module.exports = router;
