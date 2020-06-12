import * as Joi from 'joi';

export const createOrderRequestPayloadValidator = Joi.object({
  order_date: Joi.date().optional(),
  sum: Joi.number().optional(),
  cart: Joi.array().items(Joi.string()).allow([]).optional(),
  status: Joi.string().valid('completed', 'active', 'canceled').optional(),
  delivery_to: Joi.string().optional(),
  delivery_address: Joi.string().optional(),
  delivery_date: Joi.date().optional(),
  delivery_track: Joi.string().optional(),
  delivery_status: Joi.string().valid('bearbeitung', 'sendet', 'geliefert').optional(),
});
export const getOrderParamsValidator = Joi.object({
    id: Joi.string()
});
export const readOrderRequestByValidator = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    type: Joi.string().optional(),
    quantity: Joi.number().optional()
});
