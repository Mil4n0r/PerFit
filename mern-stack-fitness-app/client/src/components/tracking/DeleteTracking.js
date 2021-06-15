import React from 'react';
import { deleteTracking } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteTracking = (props) => {
	const match = useRouteMatch();
	const history = useHistory();

	const setOpen = props.setOpen;
	const userId = props.userId;

	const onClick = async () => {
		await deleteTracking(match.params.id);	// Llamamos a la API para eliminar el seguimiento
		history.push(`/tracking/list/${userId}`);	// Redireccionamos al listado de seguimientos
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar seguimiento
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea eliminar el seguimiento?
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