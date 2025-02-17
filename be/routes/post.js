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

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API quản lý bài viết
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Tạo bài viết mới
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             example:
 *               title: "Bài viết đầu tiên"
 *               content: "Nội dung của bài viết đầu tiên."
 *     responses:
 *       201:
 *         description: Bài viết được tạo thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lấy danh sách tất cả bài viết
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Danh sách bài viết.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Lấy chi tiết bài viết theo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Chi tiết bài viết.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Bài viết không tồn tại.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Cập nhật bài viết theo ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             example:
 *               title: "Bài viết đã được cập nhật"
 *               content: "Nội dung mới sau khi cập nhật."
 *     responses:
 *       200:
 *         description: Bài viết được cập nhật thành công.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Bạn không có quyền chỉnh sửa bài viết này.
 *       404:
 *         description: Bài viết không tồn tại.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Xóa bài viết theo ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết cần xóa
 *     responses:
 *       200:
 *         description: Bài viết đã được xóa.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Bạn không có quyền xóa bài viết này.
 *       404:
 *         description: Bài viết không tồn tại.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /api/posts/user/{userId}:
 *   get:
 *     summary: Lấy danh sách bài viết của một user cụ thể theo userId
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của user
 *     responses:
 *       200:
 *         description: Danh sách bài viết của user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: User chưa có bài viết.
 *       500:
 *         description: Lỗi server.
 */

/**
 * @swagger
 * /api/posts/my-posts:
 *   get:
 *     summary: Lấy danh sách bài viết của người dùng đang đăng nhập
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bài viết của người dùng.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Bạn chưa có bài viết nào.
 *       500:
 *         description: Lỗi server.
 */
module.exports = router;
