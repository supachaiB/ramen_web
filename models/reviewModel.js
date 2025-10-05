const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true }, // อ้างอิงอาหาร/สินค้า
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // อ้างอิงผู้ใช้
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);