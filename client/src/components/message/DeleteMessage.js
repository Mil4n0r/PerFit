import React, {useState, useContext} from 'react';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';
import { deleteMessage } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

import AuthContext from '../../context/AuthContext';

export const DeleteMessage = (props) => {
	const match = useRouteMatch();
	const history = useHistory();
	const [error, setError] = useState();

	const setOpen = props.setOpen;

	const { loggedIn } = useContext(AuthContext);

	const onClick = async () => {
		const deletedMessage = await deleteMessage(match.params.id);	// Llamamos a la API para crear el ejercicio
		if(deletedMessage.response) {
			setError(deletedMessage.response);
		}
		else {
			history.push(`/message/list/${loggedIn._id}`);	// Redireccionamos al listado de ejercicios
		}
	}

	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar mensaje
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea eliminar el mensaje?
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