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
    agree: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export const ProfileModel = Mongoose.model<IProfile>('Profile', ProfileSchema);
