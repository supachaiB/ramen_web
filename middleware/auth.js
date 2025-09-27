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
  // authorization - frontend or browser , token - backend or test postman
  const authHeader = req.headers.get("authorization") || req.headers.get("token");
  if (!authHeader) throw new Error("Not Authorized. Login Again");

  // includes - frontend or browser , split - backend or test postman
  const token = authHeader.includes("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // ✅ คืน userId
  } catch (err) {
    throw new Error("Invalid Token");
  }
};
