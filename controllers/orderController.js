import orderModel from "@/models/orderModel";
import userModel from "@/models/userModel";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const baseUrl = process.env.BASE_URL; 
// placing user order for frotend
export const placeOrder = async ({ userId, items, amount, address }) => {
  try {
    // บันทึกออเดอร์
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${baseUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${baseUrl}/verify?success=false&orderId=${newOrder._id}`

        })

        res.json({success:true, session_url:session.baseUrl})
    }
    catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

