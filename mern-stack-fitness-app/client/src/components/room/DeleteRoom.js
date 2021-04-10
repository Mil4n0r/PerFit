import React from 'react';
import { deleteRoom } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteRoom = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteRoom(match.params.id);
		history.push("/room/list");
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar sala</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};