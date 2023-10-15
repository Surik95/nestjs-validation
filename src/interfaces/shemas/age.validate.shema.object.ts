import * as Joi from 'joi';

export const ageSchemaObject = Joi.object().keys({
  age: Joi.number().min(0).max(150).required(),
});
