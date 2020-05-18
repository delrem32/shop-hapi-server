import * as Joi from 'joi';

export const createCardsRequestPayloadValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  quantity: Joi.string()
});
export const deleteFriendsRequestPayloadValidator = Joi.object({
    id: Joi.string()
});
export const readCardsRequestByValidator = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    quantity: Joi.string().optional()
});
