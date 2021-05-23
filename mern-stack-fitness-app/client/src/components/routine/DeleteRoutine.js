import React from 'react';
import { deleteRoutine } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteRoutine = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteRoutine(match.params.id);	// Llamamos a la API para borrrar la rutina
		history.push(`/routine/list/${match.params.userid}`);	// Redireccionamos al listado de rutinas del usuario
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