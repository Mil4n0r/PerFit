import React from 'react';
import { rejectFriendRequest } from '../../api';

import { BodyContainer, ButtonsContainer } from '../../style/style';
import { Button} from '@material-ui/core';

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
		<BodyContainer>
			<ButtonsContainer>
				<Button
					onClick={onClick}
					fullWidth
					variant="contained"
					color="primary"
				>
					Rechazar petición
				</Button>
			</ButtonsContainer>	
		</BodyContainer>
	);
};