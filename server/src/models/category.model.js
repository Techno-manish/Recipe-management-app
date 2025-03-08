import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true, unique: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
