import * as Joi from 'joi';

export const createFriendsRequestPayloadValidator = Joi.object({
    from: Joi.string(),
    to: Joi.string()
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
