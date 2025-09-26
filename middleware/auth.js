import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  const token = req.headers.get("token"); // Next.js ใช้ Request object
  if (!token) throw new Error("Not Authorized. Login Again");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // คืนค่า userId
  } catch (err) {
    throw new Error("Invalid Token");
  }
};
