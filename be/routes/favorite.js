const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

/**
 * Lấy danh sách bài viết yêu thích của người dùng đang đăng nhập
 * GET /api/favorites
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Tìm người dùng và populate danh sách favorites để lấy thông tin bài viết
    const user = await User.findById(req.user.userId).populate("favorites");
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error("Lỗi lấy danh sách yêu thích:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

/**
 * Thêm một bài viết vào danh sách yêu thích của người dùng
 * POST /api/favorites/:postId
 */
router.post("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    // Kiểm tra bài viết có tồn tại không
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    const user = await User.findById(req.user.userId);
    // Kiểm tra nếu bài viết đã có trong favorites
    if (user.favorites.includes(postId)) {
      return res
        .status(400)
        .json({ message: "Bài viết đã nằm trong danh sách yêu thích" });
    }

    user.favorites.push(postId);
    await user.save();

    res.json({
      message: "Bài viết đã được thêm vào danh sách yêu thích",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Lỗi thêm bài viết yêu thích:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

/**
 * Gỡ bỏ một bài viết khỏi danh sách yêu thích của người dùng
 * DELETE /api/favorites/:postId
 */
router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const user = await User.findById(req.user.userId);

    // Kiểm tra bài viết có tồn tại trong favorites hay không
    if (!user.favorites.includes(postId)) {
      return res
        .status(400)
        .json({ message: "Bài viết không nằm trong danh sách yêu thích" });
    }

    // Lọc bỏ bài viết khỏi mảng favorites
    user.favorites = user.favorites.filter((id) => id.toString() !== postId);
    await user.save();

    res.json({
      message: "Bài viết đã được gỡ khỏi danh sách yêu thích",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Lỗi gỡ bài viết yêu thích:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

module.exports = router;
