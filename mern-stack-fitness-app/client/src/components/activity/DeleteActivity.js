import React from 'react';
import { deleteActivity } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteActivity = (props) => {
	const match = useRouteMatch();
	const history = useHistory();

	const setOpen = props.setOpen;

	const onClick = async () => {
		await deleteActivity(match.params.id);
		history.push("/activity/list");
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Eliminar actividad
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea eliminar la actividad?
			</Typography>
			<ButtonsContainer>
				<Grid container spacing={1}>
					<Grid item xs>
						<Button
							onClick={onClick} 
							fullWidth
							variant="contained"
							color="secondary"
						>Eliminar</Button>
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