import * as Joi from "joi";

export const createColumnValidator = Joi.object({
  title: Joi.string(),
  taskIds: Joi.array().items(Joi.string()).allow([]).unique(),
});
export const getColumnsByIdsValidator = Joi.object({
  ids: Joi.array().items(Joi.string()),
});
export const getColumnValidator = Joi.object({
  id: Joi.string(),
});
