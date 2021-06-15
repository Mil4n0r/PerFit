import React, { useContext } from 'react';
import { logOut } from '../../api'; 
import { useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

import { Typography, Grid } from '@material-ui/core';
import {BodyContainer, ButtonsContainer, LoginAvatar, CustomTypography, LogOutButton} from '../../style/style'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export const Logout = () => {
	const history = useHistory();

	const { getLoggedIn } = useContext(AuthContext);

	const onAccept = async () => {
		await logOut();	// Llamamos a la API para cerrar sesión
		await getLoggedIn();
		history.push("/");	// Redireccionamos al listado de usuarios
	}
	const onReject = async () => {
		history.push("/");	// Redireccionamos al listado de usuarios
	}

	return (
		<BodyContainer>
			<LoginAvatar>
				<LockOutlinedIcon />
			</LoginAvatar>
			<CustomTypography component="h2" variant="h5">
				Cierre de sesión
			</CustomTypography>
			<Typography>
				¿Está seguro de que desea cerrar la sesión actual?
			</Typography>
			<ButtonsContainer>
				<Grid container spacing={1}>
					<Grid item xs>
						<LogOutButton
							onClick={onAccept} 
							fullWidth
							variant="contained"
							color="secondary"
						>
							Sí
						</LogOutButton>
					</Grid>
					<Grid item xs>
						<LogOutButton
							onClick={onReject}
							fullWidth
							variant="contained"
							color="primary"
						>
							No
						</LogOutButton>
					</Grid>
				</Grid>
			</ButtonsContainer>
		</BodyContainer>
	);
};