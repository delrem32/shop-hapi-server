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

    getCards() {
        return this.database.cardsModel.find();
    }
    createCard(request: IRequest) {
        return this.database.cardsModel.create(request.payload);
    }
    deliteFriendsRequest({ params }: IRequest) {
        return this.database.friendsModel.findByIdAndRemove(params.id);
    }
    queryFriendsRequest({ payload }: IRequest) {
        return this.database.friendsModel.find(payload);
    }
}
