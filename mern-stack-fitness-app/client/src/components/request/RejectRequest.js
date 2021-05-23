import React from 'react';
import { rejectFriendRequest } from '../../api';

export const RejectRequest = (props) => {

	const requestType = props.type;
	const requestId = props.id;
	const requestCallback = props.parentCallback;

	const onClick = async () => {
		if(requestType === "Amistad") {
			await rejectFriendRequest(requestId);
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
				<button onClick={onClick}>Rechazar petición</button>
			</div>
		</div>
	);
};