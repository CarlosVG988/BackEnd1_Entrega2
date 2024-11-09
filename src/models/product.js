import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    descripcion: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: [String],
    status: Boolean
});

export default mongoose.model("Product", productSchema);
