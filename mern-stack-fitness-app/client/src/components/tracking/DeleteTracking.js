import React from 'react';
import { deleteTracking } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteTracking = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteTracking(match.params.id);	// Llamamos a la API para eliminar el seguimiento
		history.push("/tracking/list");	// Redireccionamos al listado de seguimientos
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar seguimiento</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};