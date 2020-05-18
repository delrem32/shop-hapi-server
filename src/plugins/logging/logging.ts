import * as Mongoose from "mongoose";

export interface ILogging extends Mongoose.Document {
  userId: string;
  payload: String;
  response: String;
}

export const LoggingSchema = new Mongoose.Schema(
  {
    userId: {type: String, required: true},
    payload: {type: String, required: true},
    response: {type: String, required: true}
  },
  {
    timestamps: true
  }
);

export const LoggingModel = Mongoose.model<ILogging>("logging", LoggingSchema);
