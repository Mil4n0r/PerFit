import React from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../api';
import { RegisterForm } from './forms/RegisterForm';

export const Register = () => {
	const history = useHistory();
	
	const onSubmit = async (data) => {
		await registerUser(data);	// Llamamos a la API para registrar al usuario
		history.push("/");	// Redireccionamos al listado de usuarios
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Registrarse como nuevo usuario</h3>
				<RegisterForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}