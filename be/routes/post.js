const express = require("express");
const Post = require("../models/Post");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

/**  1. Tạo bài viết */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({ title, content, author: req.user.userId });
    await newPost.save();
    res.status(201).json({ message: "Bài viết đã được tạo!", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

/**   2. Lấy danh sách bài viết */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy bài viết của một user theo userId
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId }).populate(
      "author",
      "username email"
    );

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "User này chưa có bài viết nào." });
    }

    res.json(posts);
  } catch (error) {
    console.error("Lỗi lấy bài viết của user:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

// Lấy bài viết của người dùng đang đăng nhập
router.get("/my-posts", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId }).populate(
      "author",
      "username email"
    );

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "Bạn chưa có bài viết nào." });
    }

    res.json(posts);
  } catch (error) {
    console.error("Lỗi lấy bài viết của user:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

/**   3. Lấy chi tiết bài viết theo ID */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (!post)
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

/**   4. Cập nhật bài viết */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Bài viết không tồn tại" });

    //   Kiểm tra quyền sở hữu
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền chỉnh sửa bài viết này" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json({ message: "Bài viết đã được cập nhật!", post });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

/**   5. Xóa bài viết */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Bài viết không tồn tại" });

    //   Kiểm tra quyền sở hữu
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa bài viết này" });
    }

    await post.deleteOne();
    res.json({ message: "Bài viết đã được xóa!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

module.exports = router;
