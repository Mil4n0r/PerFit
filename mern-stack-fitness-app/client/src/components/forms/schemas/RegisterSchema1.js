import Joi from 'joi';

export const RegisterSchema1 = Joi.object({
    alias: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "es"]} 
        })
        .required()
        .messages({
            "string.empty": "El email no puede estar vacío",
            "string.email": "El email debe tener un formato adecuado",
            "string.required": "Email requerido"
        }),
	password: Joi.string().required(),
	passwordConfirm: Joi.any().equal(Joi.ref("password"))
});