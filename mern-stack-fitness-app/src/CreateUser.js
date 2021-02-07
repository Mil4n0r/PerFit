import React from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from './api';
import { UserForm } from './UserForm';

export const CreateUser = () => {
	const history = useHistory();
	
	const onSubmit = async (data) => {
		await createUser(data);	// Llamamos a la API para crear el usuario
		history.push("/list");	// Redireccionamos al listado de usuarios
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear usuario</h3>
				<UserForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}