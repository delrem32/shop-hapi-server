import * as Boom from 'boom';
import { createWriteStream, readFile, unlink } from 'fs';
import { join } from 'path';
import { bindNodeCallback, of } from 'rxjs';
import { catchError, tap, mapTo } from 'rxjs/internal/operators';
import { IServerConfigurations } from "../../configurations";
import { IDatabase } from "../../database";
import { IRequest } from "../../interfaces/request";

export default class FilesController {
    private database: IDatabase;
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations, database: IDatabase) {
        this.database = database;
        this.configs = configs;
    }

    async deleteFileById(request: IRequest) {
        try {
            const file = await this.database.fileModel.findByIdAndRemove(request.params.id);
            return bindNodeCallback(unlink)(file.path).pipe(mapTo(file), catchError((e) => of(e))).toPromise();
        } catch {
            Boom.notFound('File does not exists.');
        }
    }

    async getFileById(request: IRequest) {

        try {
            const file = await this.database.fileModel.findById(request.params.id);
            return bindNodeCallback(readFile)(file.path).toPromise();
        } catch {
            Boom.notFound('File does not exists.');
        }
    }

    async addFile(request: IRequest) {
        const path = join(__dirname, '../../../../../data', request.payload['file'].hapi.filename);
        const name = request.payload['file'].hapi.filename;
        const existing = await this.database.fileModel.findOne({ path, name });
        const stream = request.payload['file'].pipe(createWriteStream(path));
        return await new Promise((res, rej) => {
            stream.on('close', async (err) => {
                if (!err) {
                    const data = existing ? existing : await this.database.fileModel.create({ path, name });
                    res(data);
                }
                return rej(Boom.badRequest(err.message));
            });
        });
    }
}