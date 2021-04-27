import React from 'react';
import { joinClass } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';

export const JoinClass = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await joinClass(match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push("/class/list");	// Redireccionamos al listado de ejercicios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Unirse a clase</h3>
				<button onClick={onClick}>Unirse</button>
			</div>
		</div>
	);
};