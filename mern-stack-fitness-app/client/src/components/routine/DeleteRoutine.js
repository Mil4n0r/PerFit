import React from 'react';
import { deleteRoutine } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteRoutine = (props) => {
	const match = useRouteMatch();
	const history = useHistory();

	const setOpen = props.setOpen;
	const userId = props.userId;

	const onClick = async () => {
		await deleteRoutine(match.params.id);	// Llamamos a la API para borrrar la rutina
		history.push(`/routine/list/${userId}`);	// Redireccionamos al listado de rutinas del usuario
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar rutina
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea eliminar la rutina?
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