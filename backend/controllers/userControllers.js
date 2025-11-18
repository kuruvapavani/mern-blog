import HttpError from "../models/errorModel.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cloudinary from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------- REGISTER ----------------------
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, password2 } = req.body;

    if (!username || !email || !password) {
      throw new HttpError("Fill in all the fields", 400);
    }

    const newEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });

    if (emailExists) throw new HttpError("Email already exists", 409);
    if (password.length < 8)
      throw new HttpError("Password should contain at least 8 characters", 400);
    if (password !== password2)
      throw new HttpError("Passwords do not match", 400);

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email: newEmail,
      password: hashedPass,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// ---------------------- LOGIN ----------------------
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(422)
        .json({ message: "Please provide both email and password" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, id: user._id, username: user.username });
  } catch (error) {
    next(error);
  }
};

// ---------------------- GET ALL AUTHORS ----------------------
const getAuthor = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ---------------------- GET USER ----------------------
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) throw new HttpError("User not found", 404);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ---------------------- CHANGE AVATAR (CLOUDINARY) ----------------------

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files?.avatar) {
      throw new HttpError("Please choose an image", 422);
    }

    const avatar = req.files.avatar;

    if (avatar.size > 1_000_000) {
      throw new HttpError("Avatar too large. Must be less than 1MB", 422);
    }

    const uploadDir = join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const tempPath = join(uploadDir, avatar.name);
    await avatar.mv(tempPath);

    const cloudUpload = await cloudinary.uploader.upload(tempPath, {
      folder: "avatars",
    });

    fs.unlinkSync(tempPath);

    const user = await User.findById(req.user.id);
    if (!user) throw new HttpError("User not found", 404);

    if (user.avatarPublicId) {
      await cloudinary.uploader.destroy(user.avatarPublicId);
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: cloudUpload.secure_url,
        avatarPublicId: cloudUpload.public_id,
      },
      { new: true }
    );

    if (!updatedUser) throw new HttpError("Avatar cannot be changed", 500);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};


// ---------------------- UPDATE USER DETAILS ----------------------
const updateDetails = async (req, res) => {
  try {
    const {
      username,
      email,
      currentPassword,
      newPassword,
      newconfirmPassword,
    } = req.body;

    if (
      !username ||
      !email ||
      !currentPassword ||
      !newPassword ||
      !newconfirmPassword
    )
      return res.status(422).json({ error: "Fill in all the fields" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(403).json({ error: "User not found" });

    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists.id !== req.user.id)
      return res.status(422).json({ error: "Email already exists" });

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword)
      return res.status(422).json({ error: "Invalid current Password" });

    if (newPassword.length < 8)
      return res
        .status(422)
        .json({ error: "Password must contain at least 8 characters" });

    if (newPassword !== newconfirmPassword)
      return res.status(422).json({ error: "Passwords do not match" });

    const hashedPass = await bcrypt.hash(newPassword, 10);

    const updatedInfo = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, password: hashedPass },
      { new: true }
    );

    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  registerUser,
  loginUser,
  getAuthor,
  updateDetails,
  changeAvatar,
  getUser,
};
