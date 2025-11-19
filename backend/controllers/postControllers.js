import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import HttpError from "../models/errorModel.js";
import generatePreview from "../utils/generatePreview.js";
import cloudinary from "../config/cloudinary.js";

// ---------------------- CREATE POST ----------------------
const createPost = async (req, res, next) => {
  try {
    const { title, category, description, thumbnail, thumbnailPublicId } = req.body;

    if (!title || !category || !description) {
      throw new HttpError("Fill all fields correctly", 422);
    }

    if (thumbnail && typeof thumbnail !== "string") {
      throw new HttpError("Thumbnail must be a valid URL", 422);
    }

    const previewDescription = generatePreview(description);

    const newPost = await Post.create({
      title,
      category,
      description,
      previewDescription,
      thumbnail: thumbnail || null,
      thumbnailPublicId: thumbnailPublicId || null,
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
    const { title, description, category, thumbnail, thumbnailPublicId } = req.body;

    if (!title || !category || !description) {
      throw new HttpError("Fill all fields correctly", 422);
    }

    const post = await Post.findOne({ _id: id, authorId: req.user.id });
    if (!post) throw new HttpError("Post not found or unauthorized", 404);

    if (thumbnailPublicId && post.thumbnailPublicId && post.thumbnailPublicId !== thumbnailPublicId) {
      try {
        await cloudinary.uploader.destroy(post.thumbnailPublicId);
      } catch (err) {
        console.error("Failed to delete old image from Cloudinary:", err.message);
      }
    }

    const previewDescription = generatePreview(description);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        previewDescription,
        thumbnail: thumbnail || post.thumbnail,
        thumbnailPublicId: thumbnailPublicId || post.thumbnailPublicId,
      },
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
    if (!post) throw new HttpError("Post not found", 404);

    if (post.thumbnailPublicId) {
      try {
        await cloudinary.uploader.destroy(post.thumbnailPublicId);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary:", err.message);
      }
    }

    await Post.findByIdAndDelete(id);
    await User.findByIdAndUpdate(req.user.id, { $inc: { posts: -1 } });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ----------------------- GET POSTS -----------------------
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
    const posts = await Post.find({ authorId: req.params.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const categoryPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: req.params.category }).sort({ createdAt: -1 });

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
