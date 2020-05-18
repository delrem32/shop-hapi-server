import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { jwtValidator } from "../users/user-validator";
import CardsController from "./cards-controller";
import * as CardsValidator from "./cards-validator";
import { CardsModel } from "./cards";

export default function (server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const cardsController = new CardsController(serverConfigs, database);
  server.bind(cardsController);
  server.route({
    method: 'GET',
    path: "/cards",
    handler: cardsController.getCards,
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
  server.route({
    method: 'POST',
    path: "/cards",
    handler: cardsController.createCard,
    options: {
      auth: false,
      tags: ["api", "cards"],
      description: "Create card.",
      validate: {
        payload: CardsValidator.createCardsRequestPayloadValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Card created."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'GET',
    path: "/cards/{id}",
    handler: cardsController.getCard,
    options: {
      auth: false,
      tags: ["api", "cards"],
      description: "Get all cards.",
      validate: {
        params: CardsValidator.getCardPayloadValidator
      },
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
  server.route({
    method: 'PUT',
    path: "/cards/{id}",
    handler: cardsController.updateCard,
    options: {
      auth: false,
      tags: ["api", "cards"],
      description: "Update single card.",
      validate: {
        payload: CardsValidator.readCardsRequestByValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Card updated."
            }
          }
        }
      }
    }
  });
}
