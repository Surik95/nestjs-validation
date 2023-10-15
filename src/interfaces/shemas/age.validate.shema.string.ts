import * as Joi from 'joi';

export const ageSchemaString = Joi.alternatives().try(
  Joi.number().min(0).max(150),
);
