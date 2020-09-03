import {IPlugin} from "../interfaces";
import * as Hapi from "hapi";

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "Auth Api",
            description: "Auth Api Documentation",
            version: "1.0"
          },
          tags: [
            {
              name: "users",
              description: "Api users interface."
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          host: 'baazeeboo-hapi.herokuapp.com',
          documentationPath: "/docs"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return {name: "Swagger Documentation", version: "1.0.0"};
    }
  };
};
