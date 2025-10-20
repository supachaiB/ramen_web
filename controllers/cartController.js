import { verifyToken } from "@/middleware/auth";
import userModel from "@/models/userModel";
import mongoose from "mongoose";

// Add item to cart
export const addToCart = async (req) => {
 // ตรวจสอบ JWT และดึง user info
    const { id: userId } = verifyToken(req); // แยก id ออกมาใช้

    const { itemId } = await req.json();
    console.log(userId)

    // ตรวจสอบ userId ว่าถูกต้องไหม
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
    }

    const user = await userModel.findById(userId).lean(); // .lean คืนค่า plain JS object
    if (!user) throw new Error("User not found");

    const cartData = user.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    user.cartData = cartData;
    await user.save();

    // await userModel.findByIdAndUpdate(userId, { cartData });
    return { success: true, message: "Added To Cart" };
};


// remove items to user cart
export const removeFromCart = async ({ userId, itemId }) => {
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    const cartData = user.cartData || {};
    if (cartData[itemId]) {
        cartData[itemId] -= 1;

        if (cartData[itemId] <= 0) {
            delete cartData[itemId];
        }
    } else {
        throw new Error("Item not found in cart")
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return { success: true, message: "Deleted From Cart" };
}

//fetch user cart data
export const getCart = async ({ userId, role }) => {
    if (role === "admin") {
        // admin ไม่มี cart → return empty
        return { success: true, cartData: {} };
    }

    const user = await userModel.findById(userId)
    if (!user) throw new Error("User not found");

    const cartData = user.cartData || {};
    return { success: true, cart: cartData }
}

