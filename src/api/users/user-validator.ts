import * as Joi from "joi";

export const responseCreateUserModel = Joi.object({
  token: Joi.string(),
  user: Joi.object({
    _id: Joi.string().required(),
    email: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    profile: Joi.object({
      _id: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      photo: Joi.array().items(Joi.string()),
      phone: Joi.string(),
      createdAt: Joi.date().required(),
      updatedAt: Joi.date().required(),
    })
  })
});


export const createUserModel = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required()
});

export const updateUserModel = Joi.object().keys({
  email: Joi.string().email().trim(),
  name: Joi.string(),
  password: Joi.string().trim()
});

export const loginUserModel = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required()
});

export const jwtValidator = Joi.object({'authorization': Joi.string().required()}).unknown();
