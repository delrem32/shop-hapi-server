import * as Joi from 'joi';

export const createFriendsRequestPayloadValidator = Joi.object({
    from: Joi.string(),
    to: Joi.string()
});
export const deleteFriendsRequestPayloadValidator = Joi.object({
    id: Joi.string()
});
export const readFriendsRequestByValidator = Joi.object({
    id: Joi.string().optional(),
    from: Joi.string().optional(),
    to: Joi.string().optional()
});
