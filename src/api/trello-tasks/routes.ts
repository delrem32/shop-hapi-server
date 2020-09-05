import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { jwtValidator } from "../users/user-validator";
import TrelloTasksController from "./trello-tasks-controller";
import * as TrelloTasksValidator from "./trello-tasks-validator";


export default function (server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const trelloTasksController = new TrelloTasksController(serverConfigs, database);
  server.bind(trelloTasksController);
  server.route({
    method: 'POST',
    path: "/trello/tasks/getTasksByIds",
    handler: trelloTasksController.getTasksByIds,
    options: {
      auth: false,
      tags: ["api", "tasks"],
      description: "Get tasks by ids.",
      validate: {
        payload: TrelloTasksValidator.getTasksByIdsValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Tasks founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'POST',
    path: "/trello/tasks",
    handler: trelloTasksController.createTask,
    options: {
      auth: false,
      tags: ["api", "tasks"],
      description: "Create task.",
      validate: {
        payload: TrelloTasksValidator.createTaskValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Task created."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'GET',
    path: "/trello/tasks/{id}",
    handler: trelloTasksController.getTask,
    options: {
      auth: false,
      tags: ["api", "tasks"],
      description: "Get task.",
      validate: {
        params: TrelloTasksValidator.getTaskValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Task founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'PUT',
    path: "/trello/tasks/{id}",
    handler: trelloTasksController.updateTask,
    options: {
      auth: false,
      tags: ["api", "tasks"],
      description: "Update single task.",
      validate: {
        params: TrelloTasksValidator.getTaskValidator,
        payload: TrelloTasksValidator.createTaskValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Task updated."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'DELETE',
    path: "/trello/tasks/{id}",
    handler: trelloTasksController.deleteTask,
    options: {
      auth: false,
      tags: ["api", "tasks"],
      description: "Delete task",
      validate: {
        params: TrelloTasksValidator.getTaskValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Task deleted."
            }
          }
        }
      }
    }
  });
}
