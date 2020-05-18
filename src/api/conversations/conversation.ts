import * as Mongoose from 'mongoose';
import * as Bcrypt from 'bcryptjs';
import { IMessage } from '../message/message';




export interface IConversation extends Mongoose.Document {
  users: string[];
  messages: IMessage[];
}

export const ConversationSchema = new Mongoose.Schema(
  {
    users: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    messages: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: true
  }
);

// UserSchema.pre('save', function (next) {
//   const user = this;

//   if (!user.isModified('password')) {
//     return next();
//   }

//   user['password'] = hashPassword(user['password']);

//   return next();
// });

// UserSchema.pre('findOneAndUpdate', function () {
//   const password = hashPassword(this.getUpdate().$set.password);

//   if (!password) {
//     return;
//   }

//   this.findOneAndUpdate({}, { password: password });
// });

export const ConversationModel = Mongoose.model<IConversation>('Conversation', ConversationSchema);
