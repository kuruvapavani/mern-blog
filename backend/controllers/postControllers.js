import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import HttpError from "../models/errorModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------- CREATE POST ----------------------

const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description || !req.files?.thumbnail) {
      throw new HttpError("Fill all fields and upload an image", 422);
    }

    const thumbnail = req.files.thumbnail;

    if (thumbnail.size > 2_000_000) {
      throw new HttpError("Image too big. Should be less than 2MB", 422);
    }

    // Unique temp name
    const tempName = Date.now() + "_" + thumbnail.name;
    const tempPath = join(__dirname, "..", "uploads", tempName);
    await thumbnail.mv(tempPath);

    // Upload to Cloudinary
    const cloudUpload = await cloudinary.uploader.upload(tempPath, {
      folder: "blog",
    });

    // Delete temp file
    fs.unlinkSync(tempPath);

    const newPost = await Post.create({
      title,
      category,
      description,
      thumbnail: cloudUpload.secure_url,
      authorId: req.user.id,
    });

    await User.findByIdAndUpdate(req.user.id, { $inc: { posts: 1 } });

    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};

// ----------------------- EDIT POST -----------------------

const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    if (!title || !category || !description || description.length < 12) {
      throw new HttpError("Fill all fields correctly", 422);
    }

    const post = await Post.findOne({ _id: id, authorId: req.user.id });
    if (!post) {
      throw new HttpError("Post not found or unauthorized", 404);
    }

    let thumbnailUrl = post.thumbnail;

    if (req.files?.thumbnail) {
      const thumbnail = req.files.thumbnail;

      if (thumbnail.size > 2_000_000) {
        throw new HttpError("Image too big. Should be less than 2MB", 422);
      }

      const tempName = Date.now() + "_" + thumbnail.name;
      const tempPath = join(__dirname, "..", "uploads", tempName);
      await thumbnail.mv(tempPath);

      const cloudUpload = await cloudinary.uploader.upload(tempPath, {
        folder: "blog",
      });

      fs.unlinkSync(tempPath);

      thumbnailUrl = cloudUpload.secure_url;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, category, thumbnail: thumbnailUrl },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// ----------------------- DELETE POST -----------------------

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      throw new HttpError("Post not found", 404);
    }

    // Extract Cloudinary public_id
    const urlParts = post.thumbnail.split("/");
    const fileName = urlParts.pop().split(".")[0];
    const publicId = `blog/${fileName}`;

    await cloudinary.uploader.destroy(publicId);

    await Post.findByIdAndDelete(id);

    await User.findByIdAndUpdate(req.user.id, { $inc: { posts: -1 } });

    res.json("Post deleted successfully");
  } catch (error) {
    next(error);
  }
};

// ----------------------- GETS -----------------------

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const authorPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ authorId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const categoryPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: req.params.category }).sort({
      createdAt: -1,
    });

    if (!posts.length) throw new HttpError("No posts in this category", 404);

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new HttpError("Post not found", 404);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export default {
  getPost,
  getPosts,
  editPost,
  deletePost,
  authorPosts,
  categoryPosts,
  createPost,
};
