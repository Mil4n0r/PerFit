import React from 'react';
import { activateUser } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const ActivateUser = (props) => {
	const match = useRouteMatch();
	const history = useHistory();

	const setOpen = props.setOpen;

	const onClick = async () => {
		await activateUser(match.params.id);	// Llamamos a la API para eliminar el usuario
		history.push("/user/list");	// Redireccionamos al listado de usuarios
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Activar usuario
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea activar el usuario?
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
							Activar
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