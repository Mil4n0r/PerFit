import React from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from '@hookform/resolvers/yup';

import { LoginSchema } from '../../../schemas/user/login/LoginSchema';

export const LoginForm = ({ onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		resolver: yupResolver(LoginSchema),
		mode: "onTouched"
	});
	
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
		<form onSubmit={(event) => {
			event.preventDefault();
			submitHandler(event.target.name, event.target.password)
		}}
		>
			<div className="form-group">
				<label htmlFor="text">
					Email
				</label>
				<input className="form-control" type="text" name="email" id="email" placeholder="ejemplo@gmail.com"
				ref={
					register({})
				} 
				/>
				<ErrorMessage errors={errors} name="email" as="p" />
				<label>
					Password
				</label>
				<input className="form-control" type="password" name="password" id="password"
				ref={
					register({})
				}
				/>	
				<ErrorMessage errors={errors} name="password" as="p" />
				<button type="submit">Log in</button>
			</div>
		</form>
	);
};