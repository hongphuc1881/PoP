const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "secretkey";

// Middleware kiểm tra token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, truy cập bị từ chối!" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded; // Lưu thông tin user vào req
    next();
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

// Middleware kiểm tra quyền admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Không có quyền truy cập" });
  next();
};

module.exports = { authMiddleware, adminMiddleware };
