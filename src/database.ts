import * as Mongoose from "mongoose";
import { ConversationModel, IConversation } from "./api/conversations/conversation";
import { FileModel, IFile } from "./api/files/file";
import { FriendsModel, IFriends } from "./api/friends/friends";
import { IMessage, MessagesModel } from "./api/message/message";
import { IProfile, ProfileModel } from "./api/profiles/profile";
import { IUser, UserModel } from "./api/users/user";
import { IDataConfiguration } from "./configurations";
import { ILogging, LoggingModel } from "./plugins/logging/logging";
import { ICards, CardsModel } from "./api/cards/cards";
import { IOrders, OrdersModel } from "./api/orders/orders";
import { ITrelloColumns, TrelloColumnsModel } from "./api/trello-columns/trello-columns";
import { ITrelloTasks, TrelloTasksModel } from "./api/trello-tasks/trello-tasks";
import { ITrelloColumnOrder, TrelloColumnOrderModel } from "./api/trello-column-order/trello-column-order";
const AutoIncrement = require('mongoose-sequence')(Mongoose);

export interface IDatabase {
  loggingModel: Mongoose.Model<ILogging>;
  userModel: Mongoose.Model<IUser>;
  profileModel: Mongoose.Model<IProfile>;
  fileModel: Mongoose.Model<IFile>;
  messageModel: Mongoose.Model<IMessage>;
  conversationModel: Mongoose.Model<IConversation>;
  friendsModel: Mongoose.Model<IFriends>;
  cardsModel: Mongoose.Model<ICards>;
  ordersModel: Mongoose.Model<IOrders>;
  trelloColumnsModel: Mongoose.Model<ITrelloColumns>;
  trelloTasksModel: Mongoose.Model<ITrelloTasks>;
  trelloColumnOrderModel: Mongoose.Model<ITrelloColumnOrder>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;
  const uris = "mongodb+srv://trello-bzb_1:Mypass1234@baazeeboo.cg1la.mongodb.net/trello-db?retryWrites=true&w=majority";
  Mongoose.connect(uris);
  let mongoDb = Mongoose.connection;
  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${uris}`);
  });

  mongoDb.once("open", () => {
    console.log(`Connected to database: ${uris}`);
  });

  return {
    loggingModel: LoggingModel,
    userModel: UserModel,
    profileModel: ProfileModel,
    fileModel: FileModel,
    messageModel: MessagesModel,
    conversationModel: ConversationModel,
    friendsModel: FriendsModel,
    cardsModel: CardsModel,
    ordersModel: OrdersModel,
    trelloColumnOrderModel: TrelloColumnOrderModel,
    trelloColumnsModel: TrelloColumnsModel,
    trelloTasksModel: TrelloTasksModel
  };
}
