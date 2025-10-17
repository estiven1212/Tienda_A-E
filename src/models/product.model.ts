import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true } 
  },
  { timestamps: true }
);

export default model('Product', productSchema);
