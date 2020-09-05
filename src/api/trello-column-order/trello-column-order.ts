import * as Mongoose from "mongoose";

export interface ITrelloColumnOrder extends Mongoose.Document {
  id: string;
  columnOrder: string[];
}

export const TrelloColumnOrderSchema = new Mongoose.Schema(
  {
    id: { type: Mongoose.Schema.Types.ObjectId },
    columnOrder: {
      type: [{ type: Mongoose.Schema.Types.ObjectId, ref: "TrelloColumns" }],
    },
  },
  {
    timestamps: true,
  }
);

export const TrelloColumnOrderModel = Mongoose.model<ITrelloColumnOrder>(
  "TrelloColumnOrder",
  TrelloColumnOrderSchema
);
