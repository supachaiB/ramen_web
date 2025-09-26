// import jwt from "jsonwebtoken";

// export const verifyToken = (req) => {
//   const token = req.headers.get("token"); // Next.js ใช้ Request object
//   if (!token) throw new Error("Not Authorized. Login Again");

  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded.id; // คืนค่า userId
//   } catch (err) {
//     throw new Error("Invalid Token");
//   }
// };

import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Not Authorized. Login Again");

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // ✅ คืน userId
  } catch (err) {
    throw new Error("Invalid Token");
  }
};
