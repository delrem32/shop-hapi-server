import * as Mongoose from 'mongoose';

export interface IFile extends Mongoose.Document {
    name: string;
    path: string;
    createdAt: Date;
    updateAt: Date;
}

export const FileSchema = new Mongoose.Schema(
    {
        name: { type: String, required: true },
        path: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export const FileModel = Mongoose.model<IFile>('File', FileSchema);