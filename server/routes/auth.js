import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();


// =========================
// REGISTER
// =========================

router.post("/register", async (req, res) => {

  try {

    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "User registered"
    });

  } catch (err) {

    res.status(500).json({
      message: "Register failed"
    });
  }
});


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      "secretkey"
    );

    res.json({
      token
    });

  } catch (err) {

    res.status(500).json({
      message: "Login failed"
    });
  }
});

export default router;