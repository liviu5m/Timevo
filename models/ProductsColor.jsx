import mongoose from "mongoose";

const ProductsColorSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
});

const ProductsColor =
  mongoose.models.ProductsColor || mongoose.model("ProductsColor", ProductsColorSchema);

export default ProductsColor;
