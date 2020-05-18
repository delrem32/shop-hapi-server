import * as Mongoose from 'mongoose';

export interface IMessage extends Mongoose.Document {
  from: string;
  to: string;
  text: string;
}


export const MessageSchema = new Mongoose.Schema(
  {
    from: { type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    to: { type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true
  }
);


export const MessagesModel = Mongoose.model<IMessage>('Message', MessageSchema);