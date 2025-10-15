
import orderModel from "@/models/orderModel";
import userModel from "@/models/userModel";
import mongoose from "mongoose";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const url = process.env.NEXT_PUBLIC_BASE_URI  //  url - use server

export const placeOrder = async ({ userId, items, amount, address }) => {

  //main is newOrder  
  try {
    // แยก id จาก userId ที่เป็น object
    const actualUserId = typeof userId === "string" ? userId : userId.id;

    const newOrder = new orderModel({
      user: new mongoose.Types.ObjectId(actualUserId),
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(actualUserId, { cartData: {} });

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
      success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return { success: true, session_url: session.url };

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};