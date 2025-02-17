const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "secretkey"; // Lưu trong biến môi trường

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Kiểm tra user đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại" });

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    console.log("OK");
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.log("server lỗi", error);

    res.status(500).json({ message: "Lỗi server" });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

    // Tạo token
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});
module.exports = router;
