import * as Mongoose from 'mongoose';


export interface IProfile extends Mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumberPrefix: string;
  phoneNumber: string;
  gender: string;
  address: string;
  agree: boolean;
  cart: string[];
  role: 'admin' | 'user' | 'content-manager';
}

export const ProfileSchema = new Mongoose.Schema(
  {
    email: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phoneNumberPrefix: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    gender: { type: String, default: '' },
    address: { type: String, default: '' },
    agree: { type: Boolean, default: false },
    cart: {type: [{type: Mongoose.Schema.Types.ObjectId, ref:'Cards'}], default: []},
    role: {type: String, default: 'user'}
  },
  {
    timestamps: true
  }
);

export const ProfileModel = Mongoose.model<IProfile>('Profile', ProfileSchema);
