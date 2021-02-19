import React from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export const UserForm = ({ user, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: {
			email: user ? user.userInfo.emailUsuario : ""
		}	// Asignamos valores por defecto en caso de estar modificando
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
						<input className="form-control" ref={register({required: "Email requerido"})} type="text" name="email" id="email" />
						<ErrorMessage errors={errors} name="email" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar usuario
						</button>
					</div>
				</form>
	);
}