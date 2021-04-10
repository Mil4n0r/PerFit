import React from 'react';
import { deleteActivity } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteActivity = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteActivity(match.params.id);
		history.push("/activity/list");
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar actividad</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};