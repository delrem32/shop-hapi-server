import * as Mongoose from 'mongoose';

export interface IFriends extends Mongoose.Document {
    from: string;
    to: string;
    status: boolean;
    createdAt: Date;
    updateAt: Date;
}

export const FriendsSchema = new Mongoose.Schema(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        status: { type: Boolean, required: false, default: false }
    },
    {
        timestamps: true
    }
);

export const FriendsModel = Mongoose.model<IFriends>('Friends', FriendsSchema);