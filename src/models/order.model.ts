import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['pendiente', 'enviado', 'entregado'], default: 'pendiente' }
  },
  { timestamps: true }
);

export default model('Order', orderSchema);
