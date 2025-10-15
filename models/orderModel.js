import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items:{type:Array, required: true},
    amount:{type:Number, required: true},
    address:{type:Object, required: true},
    status:{type:String, default:"Food Processing"},
    createdAt: { type: Date, default: Date.now }, // เวลา order ถูกสร้าง
    payment: { type: Boolean, default: false },   // สถานะจ่ายเงิน
    paidAt: { type: Date }                        // เวลา pay จริง
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)
export default orderModel;