import React from 'react';
import { sendFriendRequest } from '../../api'; 
import { useRouteMatch } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Grid, Typography} from '@material-ui/core';

export const SendFriendRequest = (props) => {
	const match = useRouteMatch();

	const setOpen = props.setOpen;

	const onClick = async () => {
		await sendFriendRequest(match.params.id);
		setOpen(false);
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Enviar petición de amistad
			</CustomTypography>
			<Typography>
				¿Desea enviar una petición de amistad a este usuario?
			</Typography>
			<ButtonsContainer>
				<Grid container spacing={1}>
					<Grid item xs>
						<Button
							onClick={onClick} 
							fullWidth
							variant="contained"
							color="secondary"
						>
							Enviar
						</Button>
					</Grid>
					<Grid item xs>
						<Button
							onClick={onClose}
							fullWidth
							variant="contained"
							color="primary"
						>
							Volver
						</Button>
					</Grid>
				</Grid>
			</ButtonsContainer>	
		</BodyContainer>
	);
};