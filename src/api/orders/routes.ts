import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import OrdersController from "./orders-controller";
import * as OrdersValidator from "./orders-validator";
import * as ProfileValidator from "../profiles/profile-validator";
import * as UserValidator from "../users/user-validator";

export default function (server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const ordersController = new OrdersController(serverConfigs, database);
  server.bind(ordersController);
  server.route({
    method: 'GET',
    path: "/orders",
    handler: ordersController.getOrders,
    options: {
      auth: false,
      tags: ["api", "orders"],
      description: "Get all orders.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "All orders founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'POST',
    path: "/orders/ordersByUser",
    handler: ordersController.getOrdersByUser,
    options: {
      auth: false,
      tags: ["api", "orders"],
      description: "Get all orders by current user.",
      validate: {
        headers: UserValidator.jwtValidator,
        payload: OrdersValidator.getOrderByProfileId
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "All orders by current user founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'POST',
    path: "/orders",
    handler: ordersController.createOrder,
    options: {
      auth: false,
      tags: ["api", "orders"],
      description: "Create order.",
      validate: {
        payload: OrdersValidator.createOrderRequestPayloadValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Order created."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'GET',
    path: "/orders/{id}",
    handler: ordersController.getOrder,
    options: {
      auth: false,
      tags: ["api", "orders"],
      description: "Get single order.",
      validate: {
        params: OrdersValidator.getOrderParamsValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Order founded."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'PUT',
    path: "/orders/{id}",
    handler: ordersController.updateOrder,
    options: {
      auth: false,
      tags: ["api", "orders"],
      description: "Update single order.",
      validate: {
        payload: OrdersValidator.readOrderRequestByValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Order updated."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'DELETE',
    path: "/orders/{id}",
    handler: ordersController.deleteOrder,
    options: {
      auth: false,
      tags: ["api", "orders"],
      description: "Delete order",
      validate: {
        params: OrdersValidator.getOrderParamsValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Order deleted."
            }
          }
        }
      }
    }
  });
}
