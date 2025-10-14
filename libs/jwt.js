export const runtime = "nodejs"; // บังคับให้ใช้ Node.js runtime

import jwt from "jsonwebtoken";

export const  createToken = (id, role = "user") => {
    return jwt.sign({id, role},process.env.JWT_SECRET, { expiresIn: '1h' })
}