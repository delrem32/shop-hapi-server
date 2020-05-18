import * as Hapi from "hapi";
import {IServerConfigurations} from "../../configurations";
import {IDatabase} from "../../database";
import { ConversationController } from "./conversation-controller";
import * as UserValidator from "../users/user-validator";
import * as ProfileValidator from "../profiles/profile-validator";




export default function (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const conversationController = new ConversationController(serverConfigs, database);
  server.bind(conversationController);

  server.route({
    method: "GET",
    path: "/conversation/{id}",
    options: {
      handler: conversationController.getConversation,
      auth: "jwt",
      tags: ["api", "conversation"],
      description: "Get conversation.",
      validate: {
        headers: UserValidator.jwtValidator,
        params: ProfileValidator.getProfileParamsValidator,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Conversation founded."
            },
            "401": {
              description: "Please login."
            }
          }
        }
      }
    }
  });
}

