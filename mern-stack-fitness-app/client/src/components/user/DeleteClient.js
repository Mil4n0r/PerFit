import React from 'react';
import { deleteClient } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteClient = (props) => {
	const match = useRouteMatch();
	const history = useHistory();

	const setOpen = props.setOpen;
	const clientid = props.client;

	const onClick = async () => {
		await deleteClient(match.params.id, clientid);	// Llamamos a la API para eliminar la relación de amistad entre ambos usuarios
		setOpen(false);
	}
	
	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar cliente
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea dejar de ser entrenador personal de este usuario?
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
							Eliminar
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