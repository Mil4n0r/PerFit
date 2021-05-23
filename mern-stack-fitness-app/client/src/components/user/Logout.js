import React, { useContext } from 'react';
import { logOut } from '../../api'; 
import { useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

import { Container } from '@material-ui/core'

import {LogOutButton} from '../../style/style';

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
		<Container>
			<h3>¿Está seguro de que desea cerrar sesión?</h3>
			<LogOutButton variant="contained" color="primary" onClick={onAccept}>SÍ</LogOutButton>
			<LogOutButton variant="contained" color="secondary" onClick={onReject}>NO</LogOutButton>
		</Container>
	);
};