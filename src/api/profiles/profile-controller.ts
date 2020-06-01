import {compose, cond, equals, fromPairs, identity, map, prop, T, toPairs, type} from "ramda";
import {IServerConfigurations} from "../../configurations";
import {IDatabase} from "../../database";
import {IRequest} from "../../interfaces/request";

export class ProfileController {
  private database: IDatabase;
  private configs: IServerConfigurations;


  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  async getProfiles({query}: IRequest) {

    const a = compose(fromPairs, map(cond([
      [compose(equals('Array'), type, prop('1')), ([k, v]) => ([k, {'$in': v}])],
      [T, identity]
    ])), toPairs)(query);
    return await this.database.profileModel.find(a);
  }

  async getProfile(request: IRequest) {
    return await this.database.profileModel.findById(request.params.id);
  }

  async getManyProfiles({query}: IRequest) {
    return this.database.profileModel.find(query);
  }

  async updateProfile(request: IRequest) {
    const {id} = request.params;
    await this.database.profileModel.findByIdAndUpdate(id, request.payload);
    const profile: any = await this.database.profileModel.findById(id);
    return profile._doc;
  }

  async deleteProfile(request: IRequest) {
    return await this.database.profileModel.findByIdAndRemove(request.params.id);
  }

  async createProfile(request: IRequest) {
    return this.database.profileModel.create(request.payload);
  }


  queryProfiles({payload}: IRequest) {
    return this.database.profileModel.find(payload);
  }

  async patchProfile({payload, params}: IRequest) {
    await this.database.profileModel.findByIdAndUpdate(params.id, {$push: payload});
    return await this.database.profileModel.findById(params.id);
  }
  async deleteOrdersFromCartByPatch({payload, params}: IRequest) {
    await this.database.profileModel.findByIdAndUpdate(params.id,
      {$pullAll: payload});
    return await this.database.profileModel.findById(params.id);
  }
}
