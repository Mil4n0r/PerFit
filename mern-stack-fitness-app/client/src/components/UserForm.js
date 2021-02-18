import React from 'react'
import { useForm } from 'react-hook-form';

export const UserForm = ({ user, onSubmit }) => {
	
	const { register, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: {
			email: user ? user.emailUsuario : "",
			password: user ? user.passwordUsuario : "",
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
						<input className="form-control" ref={register} type="text" name="email" id="email" />
						<label htmlFor="text">
							Contraseña:
						</label>
						<input className="form-control" ref={register} type="password" name="password" id="password" />
						<label htmlFor="text">
							Confirmar contraseña:
						</label>
						<input className="form-control" ref={register} type="password" name="passwordConfirm" id="passwordConfirm" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar usuario
						</button>
					</div>
				</form>
	);
}