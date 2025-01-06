import express from "express";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(403).json({
      success: false,
      message: "Please fill in all fields",
    });
  }
  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(403)
      .json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await User.create({ fullname, email, password: hashedPassword });

  return res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: `Welcome back, ${user.fullname}`,
        });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
router.get("/logout", async (req, res) => {
  return res
    .status(200)
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
});

export default router;
