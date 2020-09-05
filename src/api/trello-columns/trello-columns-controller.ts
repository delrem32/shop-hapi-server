import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest, IIdsRequest } from "../../interfaces/request";

export default class TrelloColumnsController {
  private database: IDatabase;
  private configs: IServerConfigurations;


  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  async getColumnsByIds(request: IIdsRequest) {
    return await this.database.trelloColumnsModel.find({_id: {$in: request.payload.ids}});
  }
  async createColumn(request: IRequest) {
    return await this.database.trelloColumnsModel.create(request.payload);
  }
  async getColumn(request: IRequest) {
    return await this.database.trelloColumnsModel.findById(request.params.id);
  }
  async updateColumn(request: IRequest) {
    return await this.database.trelloColumnsModel.findByIdAndUpdate(request.params.id, request.payload);
  }
  async deleteColumn(request: IRequest) {
    return await this.database.trelloColumnsModel.findByIdAndRemove(request.params.id);
  }
}
