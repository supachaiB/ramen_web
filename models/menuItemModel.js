import mongoose, { Schema } from "mongoose";

const menuItemSchema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    category: {type:String, required:true},
    imageUrl:{type:String, required:true},
});

const MenuItem = mongoose.models.menu || mongoose.model('menu', menuItemSchema);

export default MenuItem;