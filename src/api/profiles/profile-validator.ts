import * as Joi from "joi";

export const getProfileParamsValidator = Joi.object({ id: Joi.string().required() });

export const updateProfilePayloadValidator = Joi.object().keys(
    {
      email: Joi.string().allow('').optional(),
      firstName: Joi.string().allow('').optional(),
      lastName: Joi.string().allow('').optional(),
      phoneNumberPrefix: Joi.string().allow('').optional(),
      phoneNumber: Joi.string().allow('').optional(),
      gender: Joi.string().allow('').optional(),
      address: Joi.string().allow('').optional(),
      agree: Joi.boolean().allow('').optional(),
      cart: Joi.array().items(Joi.string()).allow([]).optional(),
      role: Joi.string().valid('admin', 'user', 'content-manager').optional()
    }
);

export const patchCartWithItem = Joi.object({ cart: Joi.array().items(Joi.string())});
