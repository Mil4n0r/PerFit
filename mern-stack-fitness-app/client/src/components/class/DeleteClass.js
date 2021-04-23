import React from 'react';
import { deleteClass } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';

export const DeleteClass = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteClass(match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push("/class/list");	// Redireccionamos al listado de ejercicios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar clase</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};