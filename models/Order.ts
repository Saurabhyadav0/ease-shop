import mongoose, { Schema, models, model } from "mongoose";

const OrderItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    total: { type: Number, required: true },
    items: [OrderItemSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default models.Order || model("Order", OrderSchema);
