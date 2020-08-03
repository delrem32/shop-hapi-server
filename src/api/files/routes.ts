import * as Hapi from "hapi";
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { jwtValidator } from "../users/user-validator";
import FilesController from "./files-controller";
import { getFileparamsValidator, addFileparamsValidator as addFilePayloadValidator } from "./files-validator";

export default function (server: Hapi.Server,
    serverConfigs: IServerConfigurations,
    database: IDatabase
) {
    const filesController = new FilesController(serverConfigs, database);
    server.bind(filesController);
    server.route({
        method: 'GET',
        path: "/files/{id}",
        handler: filesController.getFileById,
        options: {
            auth: false,
            tags: ["api", "files"],
            description: "Get user file.",
            validate: {
                params: getFileparamsValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "File founded."
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
        path: "/files",
        options: {
            auth: "jwt",
            tags: ["api", "files"],
            description: "Add user file.",
            handler: filesController.addFile,
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                allow: 'multipart/form-data',
                parse: true
            },
            validate: {
                headers: jwtValidator,
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "File created."
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
        path: "/files/{id}",
        handler: filesController.deleteFileById,
        options: {
            auth: "jwt",
            tags: ["api", "files"],
            description: "Get user file.",
            validate: {
                headers: jwtValidator,
                params: getFileparamsValidator
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "File deleted."
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