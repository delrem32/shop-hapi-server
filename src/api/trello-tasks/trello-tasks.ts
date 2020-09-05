import * as Mongoose from "mongoose";

export interface ITrelloTasks extends Mongoose.Document {
  id: string;
  content: string;
}

export const TrelloTasksSchema = new Mongoose.Schema(
  {
    id: { type: Mongoose.Schema.Types.ObjectId },
    content: String,
  },
  {
    timestamps: true,
  }
);

export const TrelloTasksModel = Mongoose.model<ITrelloTasks>(
  "TrelloTasks",
  TrelloTasksSchema
);
