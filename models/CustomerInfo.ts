// models/CustomerInfo.ts
import mongoose, { Schema, Document } from "mongoose";

interface ICustomerInfo extends Document {
  userId: string; // Clerk user ID
  name: string;
  email: string;
  contact: string;
  address: string;
}

const CustomerInfoSchema: Schema = new Schema({
  userId: { type: String, required: true },  // New field
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
});

export default mongoose.models.CustomerInfo ||
  mongoose.model<ICustomerInfo>("CustomerInfo", CustomerInfoSchema);
