import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import orderModel from "@/models/orderModel";
import userModel from "@/models/userModel";
import Stripe from "stripe";
import { verifyToken } from "@/middleware/auth";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const baseUrl = process.env.BASE_URL;

const placeOrder = async ({ userId, items, amount, address }) => {
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
    success_url: `${baseUrl}/Verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${baseUrl}/Verify?success=false&orderId=${newOrder._id}`,
  });

  return { success: true, session_url: session.url };
};

export async function POST(req) {
  try {
    await connectMongoDB();

    const userId = verifyToken(req); // ✅ ได้ userId
    const body = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId" },
        { status: 400 }
      );
    }

    const result = await placeOrder({
      userId,
      items: body.items,
      amount: body.amount,
      address: body.address,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
