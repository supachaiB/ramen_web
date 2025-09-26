import orderModel from "@/models/orderModel";
import userModel from "@/models/userModel";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const baseUrl = process.env.BASE_URL;

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
    success_url: `${baseUrl}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${baseUrl}/verify?success=false&orderId=${newOrder._id}`,
  });

  return { success: true, session_url: session.url }; 
};
