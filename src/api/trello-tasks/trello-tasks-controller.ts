import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest, IIdsRequest } from "../../interfaces/request";

export default class TrelloTasksController {
  private database: IDatabase;
  private configs: IServerConfigurations;


  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  async getTasksByIds(request: IIdsRequest) {
    return await this.database.trelloTasksModel.find({_id: {$in: request.payload.ids}});
  }
  async createTask(request: IRequest) {
    return await this.database.trelloTasksModel.create(request.payload);
  }
  async getTask(request: IRequest) {
    return await this.database.trelloTasksModel.findById(request.params.id);
  }
  async updateTask(request: IRequest) {
    return await this.database.trelloTasksModel.findByIdAndUpdate(request.params.id, request.payload);
  }
  async deleteTask(request: IRequest) {
    return await this.database.trelloTasksModel.findByIdAndRemove(request.params.id);
  }
}
