import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest, IIdsRequest, ITaskRequest } from "../../interfaces/request";

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
  async createTask(request: ITaskRequest) {
    const task = await this.database.trelloTasksModel.create({content: request.payload.content});
    await this.database.trelloColumnsModel.findOneAndUpdate({_id: request.payload.columnId}, {$push: {tasksIds: task._id}});
    return task;
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
