import * as Hapi from "hapi";
import { IPlugin } from "./plugins/interfaces";
import { IServerConfigurations } from "./configurations";
import * as Logs from "./plugins/logging";
import * as Users from "./api/users";
import * as Profiles from "./api/profiles";
import * as Files from "./api/files";
import * as Conversation from "./api/conversations";
import * as Friends from "./api/friends";
import * as Cards from "./api/cards";
import * as TrelloColumnOrder from "./api/trello-column-order";
import * as TrelloColumns from "./api/trello-columns";
import * as TrelloTasks from "./api/trello-tasks";
import { IDatabase } from "./database";
import { OrdersModel } from "./api/orders/orders";
import * as Orders from "./api/orders";

export async function init(
  configs: IServerConfigurations,
  database: IDatabase
): Promise<Hapi.Server> {
  try {
    const port = process.env.PORT;
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      host: '0.0.0.0',
      port: port,
      routes: {
        cors: {
          origin: ["*"]
        }
      }
    });

    if (configs.routePrefix) {
      server.realm.modifiers.route.prefix = configs.routePrefix;
    }

    //  Setup Hapi Plugins
    const plugins: Array<string> = configs.plugins;
    const pluginOptions = {
      database: database,
      serverConfigs: configs
    };

    let pluginPromises: Promise<any>[] = [];

    plugins.forEach((pluginName: string) => {
      var plugin: IPlugin = require("./plugins/" + pluginName).default();
      console.log(
        `Register Plugin ${plugin.info().name} v${plugin.info().version}`
      );
      pluginPromises.push(plugin.register(server, pluginOptions));
    });

    await Promise.all(pluginPromises);

    console.log("All plugins registered successfully.");

    console.log("Register Routes");
    Logs.init(server, configs, database);
    Users.init(server, configs, database);
    Profiles.init(server, configs, database);
    Files.init(server, configs, database);
    Conversation.init(server, configs, database);
    Friends.init(server, configs, database);
    Cards.init(server, configs, database);
    Orders.init(server, configs, database);
    TrelloColumns.init(server, configs, database);
    TrelloColumnOrder.init(server, configs, database);
    TrelloTasks.init(server, configs, database);
    console.log("Routes registered sucessfully.");

    return server;
  } catch (err) {
    console.log("Error starting server: ", err);
    throw err;
  }
}
