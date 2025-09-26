import userModel from "@/models/userModel";

// Add item to cart
export const addToCart = async ({ userId, itemId }) => {
  const user = await userModel.findById(userId);
  if (!user) throw new Error("User not found");

  const cartData = user.cartData || {};
  cartData[itemId] = (cartData[itemId] || 0) + 1;

  await userModel.findByIdAndUpdate(userId, { cartData });
  return { success: true, message: "Added To Cart" };
};


// remove items to user cart
export const removeFromCart = async ({ userId, itemId}) => {
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

// //fetch user cart data
export const getCart = async ({ userId }) => {
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    const cartData = user.cartData || {};
    return { success: true, cart: cartData }
}

