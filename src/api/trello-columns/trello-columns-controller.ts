import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import {
  IRequest,
  IIdsRequest,
  IColumnRequest,
} from "../../interfaces/request";
import { title } from "process";

export default class TrelloColumnsController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  async getColumnsByIds(request: IIdsRequest) {
    return await this.database.trelloColumnsModel.find({
      _id: { $in: request.payload.ids },
    });
  }
  async createColumn(request: IColumnRequest) {
    const { title, tasksIds, columnOrderId } = request.payload;
    const column = await this.database.trelloColumnsModel.create({
      title,
      tasksIds,
    });
    await this.database.trelloColumnOrderModel.findByIdAndUpdate(
      columnOrderId,
      { $push: { columnOrder: column._id } }
    );
    return column;
  }
  async getColumn(request: IRequest) {
    return await this.database.trelloColumnsModel.findById(request.params.id);
  }
  async updateColumn(request: IRequest) {
    return await this.database.trelloColumnsModel.findByIdAndUpdate(
      request.params.id,
      request.payload
    );
  }
  async deleteColumn(request: IRequest) {
    return await this.database.trelloColumnsModel.findByIdAndRemove(
      request.params.id
    );
  }
}
