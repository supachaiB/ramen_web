import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema({
    name: {type:String, required:true},
    category: {type:String, required:true},
    imageUrl:{type:String, required:true},
});

const Gallery = mongoose.models.gallery || mongoose.model('gallery', gallerySchema);

export default Gallery;