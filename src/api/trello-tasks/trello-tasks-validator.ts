import * as Joi from 'joi';

export const createTaskValidator = Joi.object({
  content: Joi.string(),
  columnId: Joi.string().optional()
});
export const getTasksByIdsValidator = Joi.object({
  ids: Joi.array().items(Joi.string())
});
export const getTaskValidator = Joi.object({
  id: Joi.string()
});

