import React, {useState} from 'react';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';
import { deleteFood } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteFood = (props) => {
	const match = useRouteMatch();
	const history = useHistory();
	const [error, setError] = useState();

	const setOpen = props.setOpen;

	const onClick = async () => {
		const deletedFood = await deleteFood(match.params.id);	// Llamamos a la API para crear el alimento
		if(deletedFood.response) {
			setError(deletedFood.response);
		}
		else {
			history.push("/food/list");	// Redireccionamos al listado de alimentos
		}
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar alimento
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea eliminar el alimento?
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
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
};