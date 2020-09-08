import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Jwt from "jsonwebtoken";
import { IUser } from "./user";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { ILoginRequest, IRequest } from "../../interfaces/request";

export default class UserController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
    const email = request.payload.email.toLowerCase();
    const password = request.payload.password.toLowerCase();
    let user: IUser = await this.database.userModel.findOne({ email });

    if (!user) {
      return Boom.unauthorized("User does not exists.");
    }

    if (!user.validatePassword(password)) {
      return Boom.unauthorized("Password is invalid.");
    }

    return { token: this.generateToken(user) };
  }

  public async createUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
    const { email } = request.payload;
    try {
      let user: any = await this.database.userModel.create(request.payload);
      let profile: any = await this.database.profileModel.create({});
      await profile.set("email", email).save();
      let trelloColumnOrder: any = await this.database.trelloColumnOrderModel.create(
        {}
      );
      await user.set("profile", profile._id).save();
      await user.set("trelloColumnOrder", trelloColumnOrder._id).save();
      return h.response({ token: this.generateToken(user) }).code(201);
    } catch (error) {
      if (this.database.userModel.find({ email: email })) {
        return Boom.badRequest("Schon existiert!");
      } else {
        return Boom.badImplementation("fuck not");
      }
    }
  }

  public async updateUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;

    try {
      let user: IUser = await this.database.userModel.findByIdAndUpdate(
        id,
        { $set: request.payload },
        { new: true }
      );
      return user;
    } catch (error) {
      return Boom.unauthorized(error);
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    let user: IUser = await this.database.userModel.findByIdAndRemove(id);

    return user;
  }

  public async infoUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    let user: IUser = await this.database.userModel.findById(id);

    return user;
  }

  async authorized(request: IRequest) {
    const id = request.auth.credentials.id;
    const user = await this.database.userModel.findById(id).lean(true);
    if (!user) {
      return { authorized: false };
    }
    return { authorized: true };
  }

  private generateToken(user: IUser) {
    const jwtSecret = this.configs.jwtSecret;
    const jwtExpiration = this.configs.jwtExpiration;
    const payload = { id: user._id };

    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  }
}
