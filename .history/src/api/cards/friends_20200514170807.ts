import * as Mongoose from 'mongoose';

export interface ICards extends Mongoose.Document {
    from: string;
    to: string;
    status: boolean;
    createdAt: Date;
    updateAt: Date;
}

export const CardsSchema = new Mongoose.Schema(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        status: { type: Boolean, required: false, default: false }
    },
    {
        timestamps: true
    }
);

export const CardsModel = Mongoose.model<ICards>('Friends', CardsSchema);
