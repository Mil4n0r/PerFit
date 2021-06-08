import React from 'react';
import { acceptFriendRequest } from '../../api';

import { BodyContainer, ButtonsContainer } from '../../style/style';
import { Button} from '@material-ui/core';

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
		<BodyContainer>
			<ButtonsContainer>
				<Button
					onClick={onClick}
					fullWidth
					variant="contained"
					color="primary"
				>
					Aceptar petición
				</Button>
			</ButtonsContainer>	
		</BodyContainer>
	);
};