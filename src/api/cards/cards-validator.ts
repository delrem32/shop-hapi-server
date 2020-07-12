import * as Joi from 'joi';

export const createCardsRequestPayloadValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  type: Joi.string(),
  quantity: Joi.number(),
  files: Joi.array().items(Joi.string()).allow([]).optional()
});
export const getCardPayloadValidator = Joi.object({
    id: Joi.string()
});
export const readCardsRequestByValidator = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    type: Joi.string().optional(),
    quantity: Joi.number().optional(),
    files: Joi.array().items(Joi.string()).allow([]).optional()
});
