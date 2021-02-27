import React from 'react';
import { deleteExercise } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteExercise = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteExercise(match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push("/exercise/list");	// Redireccionamos al listado de ejercicios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar ejercicio</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};