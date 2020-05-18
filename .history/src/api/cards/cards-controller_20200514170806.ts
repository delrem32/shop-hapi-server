import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest } from "../../interfaces/request";

export default class FriendsController {
    private database: IDatabase;
    private configs: IServerConfigurations;


    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    getFriends({ query }: IRequest) {
        return this.database.friendsModel.find(query);
    }
    createFriendsRequest({ payload }: IRequest) {
        return this.database.friendsModel.create(payload);
    }
    deliteFriendsRequest({ params }: IRequest) {
        return this.database.friendsModel.findByIdAndRemove(params.id);
    }
    queryFriendsRequest({ payload }: IRequest) {
        return this.database.friendsModel.find(payload);
    }
}