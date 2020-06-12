import * as Mongoose from 'mongoose';
import { date } from 'joi';
const AutoIncrement = require('mongoose-sequence')(Mongoose);

export interface IOrders extends Mongoose.Document {
  order_date: Date;
  sum: number;
  cart: string[];
  status: 'completed' | 'active' | 'canceled';
  delivery_to: string;
  delivery_address: string;
  delivery_date: Date;
  delivery_track: string;
  delivery_status: 'bearbeitung' | 'sendet' | 'geliefert';
}

export const OrdersSchema = new Mongoose.Schema(
  {
    order_date: { type: Date },
    cart: { type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Cards' }], default: [] },
    sum: { type: Number },
    status: { type: String },
    delivery_to: { type: Mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    delivery_address: { type: String },
    delivery_date: { type: Date },
    delivery_track: { type: String },
    delivery_status: { type: String }
  },
  {
    timestamps: true,
    _id: false
  },
);
OrdersSchema.plugin(AutoIncrement);

export const OrdersModel = Mongoose.model<IOrders>('Orders', OrdersSchema);
