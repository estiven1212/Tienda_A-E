import { Schema, model } from 'mongoose';

const shipmentSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    tracking: { type: String, required: true },
    status: { type: String, enum: ['pendiente', 'en tránsito', 'entregado'], default: 'pendiente' }
  },
  { timestamps: true }
);

export default model('Shipment', shipmentSchema);
