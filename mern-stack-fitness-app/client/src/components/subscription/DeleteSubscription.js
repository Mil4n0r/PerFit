import React from 'react';
import { deleteSubscription } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteSubscription = (props) => {
	const match = useRouteMatch();
	const history = useHistory();

	const setOpen = props.setOpen;

	const onClick = async () => {
		await deleteSubscription(match.params.id);
		history.push("/subscription/list");
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar suscripción
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea eliminar la suscripción?
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