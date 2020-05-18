import * as Joi from "joi";

export const getProfileParamsValidator = Joi.object({ id: Joi.string().required() });
export const getProfilesQueryValidator = Joi.object().keys(
    { contacts: Joi.array().items(Joi.string()).optional() }
);

export const updateProfilePayloadValidator = Joi.object().keys(
    {
        firstName: Joi.string().allow('').optional(),
        about: Joi.string().allow('').optional(),
        lastName: Joi.string().allow('').optional(),
        middleName: Joi.string().allow('').optional(),
        companyName: Joi.string().allow('').optional(),
        departmentName: Joi.string().allow('').optional(),
        positionName: Joi.string().allow('').optional(),
        skills: Joi.array().items(Joi.string()).allow([]).optional(),
        photo: Joi.array().items(Joi.string()).allow([]).optional(),
        contacts: Joi.array().items(Joi.object({
            availableTime: Joi.array().items(Joi.string()),
            icon: Joi.string(),
            name: Joi.string(),
            readonly: Joi.boolean(),
            type: Joi.string(),
            value: Joi.string(),
        })).allow({}).optional()
    }
);