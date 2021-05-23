import React from 'react';
import { sendFriendRequest } from '../../api'; 
import { useRouteMatch } from "react-router-dom";

export const SendFriendRequest = () => {
	const match = useRouteMatch();

	const onClick = async () => {
		await sendFriendRequest(match.params.id);
	}

	return (
		<div className="container">
			<div className="mt-3">
				<button onClick={onClick}>Enviar petición de amistad</button>
			</div>
		</div>
	);
};