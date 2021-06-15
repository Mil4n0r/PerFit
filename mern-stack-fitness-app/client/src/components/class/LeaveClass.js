import React from 'react';
import { leaveClass } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const LeaveClass = (props) => {
	const match = useRouteMatch();
	const history = useHistory();

	const setOpen = props.setOpen;

	const onClick = async () => {
		await leaveClass(match.params.id);	// Llamamos a la API para crear el ejercicio
		history.push("/class/list");	// Redireccionamos al listado de ejercicios
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Abandonar la clase
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea abandonar a esta clase?
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
							Abandonar
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