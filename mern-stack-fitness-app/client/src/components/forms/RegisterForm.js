import React from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
	passwordConfirm: Joi.any().equal(Joi.ref("password"))
});

export const RegisterForm = ({ user, onSubmit }) => {
	
	const { register, getValues, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		resolver: joiResolver(schema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});
	
	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Email de usuario:
						</label>
						<input className="form-control" type="text" name="email" id="email"
						ref={
							register({
								//required: "Email requerido"
							})
						} />
						<ErrorMessage errors={errors} name="email" as="p" />
						<label htmlFor="text">
							Contraseña:
						</label>
						<input className="form-control" type="password" name="password" id="password"
						ref={
							register({
								//required: "Contraseña requerida"
							})
						} />
						<ErrorMessage errors={errors} name="password" as="p" />
						<label htmlFor="text">
							Confirmar contraseña:
						</label>
						<input className="form-control" type="password" name="passwordConfirm" id="passwordConfirm" 
						ref={
							register({
								//required: "Confirmación de contraseña requerida",
								//validate: value => value === getValues("password") || "Las contraseñas deben coincidir"
							})
						} />
						<ErrorMessage errors={errors} name="passwordConfirm" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar usuario
						</button>
					</div>
				</form>
	);
}