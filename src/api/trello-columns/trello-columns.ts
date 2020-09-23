import * as Mongoose from "mongoose";

export interface ITrelloColumns extends Mongoose.Document {
  id: string;
  title: string;
  taskIds: [string];
}

export const TrelloColumnsSchema = new Mongoose.Schema(
  {
    id: { type: Mongoose.Schema.Types.ObjectId },
    title: { type: String, default: "" },
    taskIds: {
      type: [{ type: Mongoose.Schema.Types.ObjectId, ref: "TrelloTasks" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const TrelloColumnsModel = Mongoose.model<ITrelloColumns>(
  "TrelloColumns",
  TrelloColumnsSchema
);
