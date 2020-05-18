import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { jwtValidator } from "../users/user-validator";
import FriendsController from "./friends-controller";
import { readFriendsRequestByValidator, createFriendsRequestPayloadValidator, deleteFriendsRequestPayloadValidator } from "./friends-validator";

export default function (server: Hapi.Server,
    serverConfigs: IServerConfigurations,
    database: IDatabase
) {
    const friendsController = new FriendsController(serverConfigs, database);
    server.bind(friendsController);
    server.route({
        method: 'GET',
        path: "/friends",
        handler: friendsController.getFriends,
        options: {
            auth: "jwt",
            tags: ["api", "friends"],
            description: "Get friends requests.",
            validate: {
                headers: jwtValidator,
                query: readFriendsRequestByValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Contact founded."
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
        path: "/friends",
        handler: friendsController.createFriendsRequest,
        options: {
            auth: "jwt",
            tags: ["api", "friends"],
            description: "Create friends request.",
            validate: {
                headers: jwtValidator,
                payload: createFriendsRequestPayloadValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Friends request created."
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
        path: "/friends/q",
        handler: friendsController.queryFriendsRequest,
        options: {
            auth: "jwt",
            tags: ["api", "friends"],
            description: "Find friends requests.",
            validate: {
                headers: jwtValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Friends requests queried."
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
        method: 'DELETE',
        path: "/friends/{id}",
        handler: friendsController.deliteFriendsRequest,
        options: {
            auth: "jwt",
            tags: ["api", "friends"],
            description: "Delete friends request",
            validate: {
                headers: jwtValidator,
                params: deleteFriendsRequestPayloadValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "Friends request deleted."
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