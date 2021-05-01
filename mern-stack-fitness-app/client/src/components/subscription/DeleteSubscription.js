import React from 'react';
import { deleteSubscription } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteSubscription = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteSubscription(match.params.id);
		history.push("/subscription/list");
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar suscripción</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};