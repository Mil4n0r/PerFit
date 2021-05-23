import React from 'react';
import { acceptFriendRequest } from '../../api';

export const AcceptRequest = (props) => {
	const requestType = props.type;
	const requestId = props.id;
	const requestCallback = props.parentCallback;

	const onClick = async () => {
		if(requestType === "Amistad") {
			await acceptFriendRequest(requestId);
		}
		else if(requestType === "Entrenamiento") {
			//await acceptTrainingRequest(requestId);
			console.log("FALTA PROGRAMAR")
		}
		requestCallback(requestId);
	}

	return (
		<div className="container">
			<div className="mt-3">
				<button onClick={onClick}>Aceptar petición</button>
			</div>
		</div>
	);
};