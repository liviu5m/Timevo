import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
  },
});

const Color = mongoose.models.Color || mongoose.model("Color", ColorSchema);

export default Color;
