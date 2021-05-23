import React from 'react';
import { deleteDiet } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteDiet = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteDiet(match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push(`/diet/list/${match.params.userid}`);	// Redireccionamos al listado de ejercicios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar dieta</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};