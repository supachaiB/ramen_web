export const runtime = "nodejs"; // บังคับให้ใช้ Node.js runtime

//ตรวจสอบความถูกต้องของ JWT Token
import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization") || req.headers.get("token");
  console.log(authHeader)
  if (!authHeader) throw new Error("Not Authorized. Login Again");

  // includes - frontend or browser , split - backend or test postman
  const token = authHeader.includes("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ส่งสองตัว
    return {
      id: decoded.id,
      role: decoded.role // เพิ่ม role
    };
  } catch (err) {
    throw new Error("Invalid Token");
  }
};
