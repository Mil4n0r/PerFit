import React from 'react';
import { deleteRoutine } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteRoutine = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteRoutine(match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push("/routine/list");	// Redireccionamos al listado de ejercicios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar rutina</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};