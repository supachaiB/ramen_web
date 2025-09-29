
import orderModel from "@/models/orderModel";
import userModel from "@/models/userModel";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const backendUrl = process.env.BASE_URL;
const frontendUrl = process.env.NEXT_PUBLIC_BASE_URI
export const placeOrder = async ({ userId, items, amount, address }) => {
  //  สร้าง order
  const newOrder = new orderModel({
    userId,
    items,
    amount,
    address,
  });
  await newOrder.save();

  await userModel.findByIdAndUpdate(userId, { cartData: {} });

  const line_items = items.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: { name: item.name },
      unit_amount: item.price * 100 * 80,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: "inr",
      product_data: { name: "Delivery Charges" },
      unit_amount: 2 * 100 * 80,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
  });

  return { success: true, session_url: session.url };
};