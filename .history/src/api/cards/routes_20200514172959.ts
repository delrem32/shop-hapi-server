import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { jwtValidator } from "../users/user-validator";
import CardsController from "./cards-controller";
import { readCardsRequestByValidator, createFriendsRequestPayloadValidator, deleteFriendsRequestPayloadValidator } from "./cards-validator";

export default function (server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const cardsController = new CardsController(serverConfigs, database);
  server.bind(CardsController);
  server.route({
    method: 'GET',
    path: "/cards",
    handler: cardsController.getFriends,
    options: {
      auth: false,
      tags: ["api", "cards"],
      description: "Get all cards.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "All cards founded."
            }
          }
        }
      }
    }
  });
}
