import mongoose, { Schema, models, model } from "mongoose";

const OrderItemSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new Schema({
  userId: String,
  total: Number,
  items: [OrderItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Order || model("Order", OrderSchema);

