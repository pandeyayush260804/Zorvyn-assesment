import {
  createUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService
} from "../services/user.service.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 🔹 Helper to remove password
const sanitizeUser = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

// 🔹 Register
export const createUser = async (req, res) => {
  try {
    // Force default role
    req.body.role = "viewer";
    const user = await createUserService(req.body);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userObj
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // update last login
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: userObj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      data: users.map(sanitizeUser) // 🔒 fixed
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Update User
export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: sanitizeUser(user) // 🔒 fixed
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Delete User
export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};