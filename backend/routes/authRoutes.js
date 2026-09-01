const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

module.exports = router;