import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest } from "../../interfaces/request";
import * as Boom from 'boom';
export class ConversationController {
    private database: IDatabase;
    private configs: IServerConfigurations;


    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    async getConversation({ params: { id } }: IRequest) {
        return await this.database.conversationModel
            .findById(id)
            .catch(({ value }: any) => Boom.notFound(`Conversation with id: ${value} not found`));
    }

    async updateProfile(request: IRequest) {
        const { id } = request.params;
        await this.database.profileModel.findByIdAndUpdate(id, request.payload);
        const profile: any = await this.database.profileModel.findById(id);
        return profile._doc;
    }
}
