import React from 'react';
import { deleteMeasure } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteMeasure = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteMeasure(match.params.id);	// Llamamos a la API para crear el seguimiento
		history.push("/measure/list");	// Redireccionamos al listado de medidas
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar medida</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};