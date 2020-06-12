import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest } from "../../interfaces/request";

export default class OrdersController {
  private database: IDatabase;
  private configs: IServerConfigurations;


  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  async getOrders() {
    return this.database.ordersModel.find();
  }
  async createOrder(request: IRequest) {
    return this.database.ordersModel.create(request.payload);
  }
  async getOrder(request: IRequest) {
    return this.database.ordersModel.findById(request.params.id);
  }
  async updateOrder(request: IRequest) {
    return await this.database.ordersModel.findByIdAndUpdate(request.params.id, request.payload);
  }
  async queryFriendsRequest({ payload }: IRequest) {
    return this.database.ordersModel.find(payload);
  }
  async deleteOrder(request: IRequest) {
    return await this.database.ordersModel.findByIdAndRemove(request.params.id);
  }
}
