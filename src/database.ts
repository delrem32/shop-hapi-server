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

export interface IDatabase {
  loggingModel: Mongoose.Model<ILogging>;
  userModel: Mongoose.Model<IUser>;
  profileModel: Mongoose.Model<IProfile>;
  fileModel: Mongoose.Model<IFile>;
  messageModel: Mongoose.Model<IMessage>;
  conversationModel: Mongoose.Model<IConversation>;
  friendsModel: Mongoose.Model<IFriends>;
  cardsModel: Mongoose.Model<ICards>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;
  const uris = process.env.MONGO_URL || config.connectionString;
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
    cardsModel: CardsModel
  };
}
