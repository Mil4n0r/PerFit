import React, {useState} from 'react';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';
import { deleteExercise } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteExercise = (props) => {
	const match = useRouteMatch();
	const history = useHistory();
	const [error, setError] = useState();

	const setOpen = props.setOpen;

	const onClick = async () => {
		const deletedExercise = await deleteExercise(match.params.id);	// Llamamos a la API para crear el ejercicio
		if(deletedExercise.response) {
			setError(deletedExercise.response);
		}
		else {
			history.push("/exercise/list");	// Redireccionamos al listado de ejercicios
		}
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar ejercicio
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea eliminar el ejercicio?
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