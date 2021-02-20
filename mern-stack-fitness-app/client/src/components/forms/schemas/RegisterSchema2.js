import Joi from 'joi';

export const RegisterSchema2 = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    dni: Joi.string().required(),
    address: Joi.string().required(),
    telephone: Joi.string().required(),
    birthdate: Joi.date().required(),
});