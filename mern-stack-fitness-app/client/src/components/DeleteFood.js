import React from 'react';
import { deleteFood } from '../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteFood = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteFood(match.params.id);	// Llamamos a la API para crear el alimento
		history.push("/food/list");	// Redireccionamos al listado de alimentos
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar alimento</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};