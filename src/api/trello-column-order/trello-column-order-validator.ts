import * as Joi from "joi";

export const createColumnOrderValidator = Joi.object({
  columnOrder: Joi.array().items(Joi.string()),
});
export const getColumnOrderValidator = Joi.object({
  id: Joi.string(),
});