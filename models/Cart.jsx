import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product_color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductsColor",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
