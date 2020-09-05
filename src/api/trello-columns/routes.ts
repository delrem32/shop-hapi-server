import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { jwtValidator } from "../users/user-validator";
import TrelloColumnsController from "./trello-columns-controller";
import * as TrelloColumnsValidator from "./trello-columns-validator";


export default function (server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const trelloColumnsController = new TrelloColumnsController(serverConfigs, database);
  server.bind(trelloColumnsController);
  server.route({
    method: 'POST',
    path: "/trello/columns/getByIds",
    handler: trelloColumnsController.getColumnsByIds,
    options: {
      auth: false,
      tags: ["api", "columns"],
      description: "Get columns by ids.",
      validate: {
        payload: TrelloColumnsValidator.getColumnsByIdsValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "All columns founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'POST',
    path: "/trello/columns",
    handler: trelloColumnsController.createColumn,
    options: {
      auth: false,
      tags: ["api", "columns"],
      description: "Create column.",
      validate: {
        payload: TrelloColumnsValidator.createColumnValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Column created."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'GET',
    path: "/trello/columns/{id}",
    handler: trelloColumnsController.getColumn,
    options: {
      auth: false,
      tags: ["api", "columns"],
      description: "Get column.",
      validate: {
        params: TrelloColumnsValidator.getColumnValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Column founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'PUT',
    path: "/trello/columns/{id}",
    handler: trelloColumnsController.updateColumn,
    options: {
      auth: false,
      tags: ["api", "columns"],
      description: "Update single column.",
      validate: {
        payload: TrelloColumnsValidator.createColumnValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Column updated."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'DELETE',
    path: "/trello/columns/{id}",
    handler: trelloColumnsController.deleteColumn,
    options: {
      auth: false,
      tags: ["api", "columns"],
      description: "Delete column",
      validate: {
        params: TrelloColumnsValidator.getColumnValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Column deleted."
            }
          }
        }
      }
    }
  });
}
