import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number },
    stock: { type: Number, required: true },
    image: { type: String }
})

const Product = mongoose.model('Products', ProductModel);

export default Product;