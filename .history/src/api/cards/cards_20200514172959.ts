import * as Mongoose from 'mongoose';

export interface ICards extends Mongoose.Document {
  name: string;
  type: string;
  description: string;
  quantity: number;
  createdAt: Date;
  updateAt: Date;
}

export const CardsSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

export const CardsModel = Mongoose.model<ICards>('Friends', CardsSchema);
