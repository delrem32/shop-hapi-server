import * as Mongoose from 'mongoose';


export interface IProfile extends Mongoose.Document {
  firstName: string;
  about: string;
  lastName: string;
  middleName: string;
  positionName: string;
  departmentName: string;
  companyName: string;
  photo: string[];
  contacts: string[];
  skills: string[];
  createdAt: Date;
  updateAt: Date;
  privacy: {
    phone: 'all' | 'trusted' | 'none';
    companyName: 'all' | 'trusted' | 'none';
    positionName: 'all' | 'trusted' | 'none';
    showDetails: 'all' | 'trusted' | 'none';
    autoCV: 'all' | 'trusted' | 'none';
    notifyMyChanges: 'all' | 'trusted' | 'none';
    acceptMessages: 'all' | 'trusted' | 'none';
    notifyWhenAdded: boolean;
  };

  validatePassword(requestPassword): boolean;
}

export const ProfileSchema = new Mongoose.Schema(
  {
    firstName: {type: String},
    about: {type: String},
    lastName: {type: String},
    middleName: {type: String},
    positionName: {type: String},
    companyName: {type: String},
    departmentName: {type: String},
    photo: {type: [{type: Mongoose.Schema.Types.ObjectId, ref: 'File'}]},
    contacts: {
      type: [{
        type: {type: String, required: true},
        value: {type: String, unique: true, required: true},
        readonly: {type: Boolean, required: false},
        icon: {type: String, required: false},
        name: {type: String, required: false},
        availableTime: {type: [String], required: false},
      }]
    },
    skills: {type: [Mongoose.Schema.Types.String]},
    privacy: {
      phone: {type: Mongoose.Schema.Types.String},
      companyName: {type: Mongoose.Schema.Types.String},
      positionName: {type: Mongoose.Schema.Types.String},
      showDetails: {type: Mongoose.Schema.Types.String},
      autoCV: {type: Mongoose.Schema.Types.String},
      notifyMyChanges: {type: Mongoose.Schema.Types.String},
      acceptMessages: {type: Mongoose.Schema.Types.String},
      notifyWhenAdded: {type: Mongoose.Schema.Types.Boolean}
    }
  },
  {
    timestamps: true
  }
);

export const ProfileModel = Mongoose.model<IProfile>('Profile', ProfileSchema);
