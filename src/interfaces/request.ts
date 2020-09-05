import * as Hapi from "hapi";

export interface ICredentials extends Hapi.AuthCredentials {
  id: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
  credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
  auth: IRequestAuth;
}

export interface ILoginRequest extends IRequest {
  payload: {
    email: string;
    password: string;
  };
}

export interface ITaskRequest {
  payload: {
    content: string;
    columnId: string;
  };
}

export interface IColumnRequest {
  payload: {
    title: string;
    tasksIds: [string];
  };
}

export interface IIdsRequest {
  payload: {
    ids: [string];
  };
}
