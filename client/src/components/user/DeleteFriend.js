import React, {useState} from 'react';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';
import { deleteFriend } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

import { BodyContainer, ButtonsContainer, CustomTypography } from '../../style/style';
import { Button, Typography, Grid } from '@material-ui/core';

export const DeleteFriend = (props) => {
	const match = useRouteMatch();
	const history = useHistory();
	const [error, setError] = useState();

	const setOpen = props.setOpen;
	const friendid = props.friend;

	const onClick = async () => {
		const deletedFriend = await deleteFriend(match.params.id, friendid);	// Llamamos a la API para eliminar la relación de amistad entre ambos usuarios
		if(deletedFriend.response) {
			setError(deletedFriend.response);
		}
		else {
			setOpen(false);
		}
	}
	
	const onClose = async () => {
		setOpen(false);
	}

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Eliminar amigo
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea dejar de ser amigo de este usuario?
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