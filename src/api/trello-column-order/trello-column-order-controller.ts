import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest } from "../../interfaces/request";

export default class TrelloColumnOrderController {
  private database: IDatabase;
  private configs: IServerConfigurations;


  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  async getAllColumnOrder() {
    return await this.database.trelloColumnOrderModel.find();
  }
  async createColumnOrder(request: IRequest) {
    return await this.database.trelloColumnOrderModel.create(request.payload);
  }
  async getColumnOrder(request: IRequest) {
    return await this.database.trelloColumnOrderModel.findById(request.params.id);
  }
  async updateColumnOrder(request: IRequest) {
    return await this.database.trelloColumnOrderModel.findByIdAndUpdate(request.params.id, request.payload);
  }
  async deleteColumnOrder(request: IRequest) {
    return await this.database.trelloColumnOrderModel.findByIdAndRemove(request.params.id);
  }
}
