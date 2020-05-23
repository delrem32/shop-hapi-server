import * as Hapi from "hapi";
import {IServerConfigurations} from "../../configurations";
import {IDatabase} from "../../database";
import * as ProfileValidator from "../profiles/profile-validator";
import * as UserValidator from "../users/user-validator";
import {ProfileController} from "./profile-controller";


export default function (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const profileController = new ProfileController(serverConfigs, database);
  server.bind(profileController);
  server.route({
    method: "GET",
    path: "/profiles/{id}",
    options: {
      handler: profileController.getProfile,
      auth: "jwt",
      tags: ["api", "profiles"],
      description: "Get user profiles.",
      validate: {
        headers: UserValidator.jwtValidator,
        params: ProfileValidator.getProfileParamsValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User founded."
            },
            "401": {
              description: "Please login."
            }
          }
        }
      }
    }
  });
  server.route({
    method: "PUT",
    path: "/profiles/{id}",
    options: {
      handler: profileController.updateProfile,
      auth: "jwt",
      tags: ["api", "profile"],
      description: "Update current profile info.",
      validate: {
        headers: UserValidator.jwtValidator,
        params: ProfileValidator.getProfileParamsValidator,
        payload: ProfileValidator.updateProfilePayloadValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Updated info."
            },
            "401": {
              description: "User does not have authorization."
            }
          }
        }
      }
    }
  });
  server.route({
    method: "PATCH",
    path: "/profiles/{id}",
    options: {
      handler: profileController.patchProfile,
      auth: "jwt",
      tags: ["api", "profile"],
      description: "Update current profile info.",
      validate: {
        headers: UserValidator.jwtValidator,
        params: ProfileValidator.getProfileParamsValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Updated info."
            },
            "401": {
              description: "User does not have authorization."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'DELETE',
    path: "/profiles/{id}",
    handler: profileController.deleteProfile,
    options: {
      auth: "jwt",
      tags: ["api", "profile"],
      description: "Delete profile.",
      validate: {
        headers: UserValidator.jwtValidator,
        params: ProfileValidator.getProfileParamsValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User founded."
            },
            "401": {
              description: "Please login."
            }
          }
        }
      }
    }
  });
  server.route({
    method: 'POST',
    path: "/profiles",
    handler: profileController.createProfile,
    options: {
      auth: "jwt",
      tags: ["api", "profiles"],
      description: "Create profile.",
      validate: {
        headers: UserValidator.jwtValidator,
        payload: ProfileValidator.updateProfilePayloadValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Profile created."
            },
            "401": {
              description: "Please login."
            }
          }
        }
      }
    }
  });
  // server.route({
  //   method: "GET",
  //   path: "/profiles",
  //   options: {
  //     auth: "jwt",
  //     handler: profileController.getManyProfiles,
  //     tags: ["api", "profiles"],
  //     description: "Get user profiles.",
  //     validate: {
  //       headers: UserValidator.jwtValidator
  //     },
  //     plugins: {
  //       "hapi-swagger": {
  //         responses: {
  //           "200": {
  //             description: "Profiles founded."
  //           },
  //           "401": {
  //             description: "Please login."
  //           }
  //         }
  //       }
  //     }
  //   }
  // });

  server.route({
    method: "POST",
    path: "/profiles/q",
    options: {
      handler: profileController.queryProfiles,
      auth: "jwt",
      tags: ["api", "profile"],
      description: "Query profiles info.",
      validate: {
        headers: UserValidator.jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Updated info."
            },
            "401": {
              description: "User does not have authorization."
            }
          }
        }
      }
    }
  });
}
