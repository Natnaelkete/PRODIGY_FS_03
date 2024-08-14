import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    company: { type: String },
    description: { type: String },
    price: { type: Number },
    colors: [],
    featured: Boolean,
    image: { type: String },
    shipping: Boolean,
    category: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
