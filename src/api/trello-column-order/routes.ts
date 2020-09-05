import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { jwtValidator } from "../users/user-validator";
import * as TrelloColumnOrderValidator from "./trello-column-order-validator";
import TrelloColumnOrderController from "./trello-column-order-controller";

export default function (server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const trelloColumnOrderController = new TrelloColumnOrderController(serverConfigs, database);
  server.bind(trelloColumnOrderController);
  server.route({
    method: 'GET',
    path: "/trello/column-order",
    handler: trelloColumnOrderController.getAllColumnOrder,
    options: {
      auth: false,
      tags: ["api", "columnOrder"],
      description: "Get all column order data.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "All column order data founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'POST',
    path: "/trello/column-order",
    handler: trelloColumnOrderController.createColumnOrder,
    options: {
      auth: false,
      tags: ["api", "columnOrder"],
      description: "Create column order data.",
      validate: {
        payload: TrelloColumnOrderValidator.createColumnOrderValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Column order data created."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'GET',
    path: "/trello/column-order/{id}",
    handler: trelloColumnOrderController.getColumnOrder,
    options: {
      auth: false,
      tags: ["api", "columnOrder"],
      description: "Get all Column order data.",
      validate: {
        params: TrelloColumnOrderValidator.getColumnOrderValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "All Column order data founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'PUT',
    path: "/trello/column-order/{id}",
    handler: trelloColumnOrderController.updateColumnOrder,
    options: {
      auth: false,
      tags: ["api", "columnOrder"],
      description: "Update single column order data.",
      validate: {
        payload: TrelloColumnOrderValidator.createColumnOrderValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "column order data updated."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'DELETE',
    path: "/trello/column-order/{id}",
    handler: trelloColumnOrderController.deleteColumnOrder,
    options: {
      auth: false,
      tags: ["api", "columnOrder"],
      description: "Delete column order data",
      validate: {
        params: TrelloColumnOrderValidator.getColumnOrderValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "column order data deleted."
            }
          }
        }
      }
    }
  });
}
