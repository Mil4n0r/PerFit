import React from 'react';
//import { useHistory } from 'react-router-dom';
import { registerUser } from './api';
import { UserForm } from './UserForm';

export const Register = () => {
	//const history = useHistory();
	
	const onSubmit = async (data) => {
		await registerUser(data);	// Llamamos a la API para registrar al usuario
		//history.push("/list");	// Redireccionamos al listado de usuarios
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Registrarse como nuevo usuario</h3>
				<UserForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}