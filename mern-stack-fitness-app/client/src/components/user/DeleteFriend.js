import React from 'react';
import { deleteFriend } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteFriend = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteFriend(match.params.id, match.params.id2);	// Llamamos a la API para eliminar la relación de amistad entre ambos usuarios
		history.push(`/friend/list/${match.params.id}`);	// Redireccionamos a la lista de amigos
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar amigo</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};