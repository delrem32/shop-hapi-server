import * as Mongoose from 'mongoose';

export interface ICards extends Mongoose.Document {
  name: string;
  type: string;
  description: string;
  quantity: number;
  files: string[];
  createdAt: Date;
  updateAt: Date;
}

export const CardsSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        files: {type: [{type: Mongoose.Schema.Types.ObjectId, ref:'Files'}], default: []}
    },
    {
        timestamps: true
    }
);

export const CardsModel = Mongoose.model<ICards>('Cards', CardsSchema);
