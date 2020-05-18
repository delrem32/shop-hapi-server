import * as Joi from "joi";

export const getFileparamsValidator = Joi.object({
    id: Joi.string()
});
export const addFileparamsValidator = Joi.object({
    file: Joi.object({
        file: Joi.object({
            type: Joi.string(),
            data: Joi.array().items(Joi.string())
        })
    })
});