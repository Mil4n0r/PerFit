import React, {useState} from 'react';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';
import { leaveClass } from '../../api'; 
import { useRouteMatch, useHistory } from 'react-router-dom';

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const LeaveClass = (props) => {
	const match = useRouteMatch();
	const history = useHistory();
	const [error, setError] = useState();

	const setOpen = props.setOpen;

	const onClick = async () => {
		const leftClass = await leaveClass(match.params.id);	// Llamamos a la API para crear el ejercicio
		if(leftClass.response) {
			setError(leftClass.response);
		}
		else {
			history.push("/class/list");	// Redireccionamos al listado de clases
		}
		
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
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
};