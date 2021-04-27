import React from 'react';
import { leaveClass } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';

export const LeaveClass = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await leaveClass(match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push("/class/list");	// Redireccionamos al listado de ejercicios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Abandonar clase</h3>
				<button onClick={onClick}>Abandonar</button>
			</div>
		</div>
	);
};