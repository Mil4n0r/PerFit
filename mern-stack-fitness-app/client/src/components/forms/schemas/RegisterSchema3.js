import Joi from 'joi';

export const RegisterSchema3 = Joi.object({
    role: Joi.string().required(),
    privacy: Joi.string().required()
});