import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest } from "../../interfaces/request";

export default class CardsController {
  private database: IDatabase;
  private configs: IServerConfigurations;


  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  async getCards() {
    return this.database.cardsModel.find();
  }
  async createCard(request: IRequest) {
    return this.database.cardsModel.create(request.payload);
  }
  async getCard(request: IRequest) {
    return this.database.cardsModel.findById(request.params.id);
  }
  async updateCard(request: IRequest) {
    return await this.database.cardsModel.findByIdAndUpdate(request.params.id, request.payload);
  }
  async queryFriendsRequest({ payload }: IRequest) {
    return this.database.friendsModel.find(payload);
  }
}
