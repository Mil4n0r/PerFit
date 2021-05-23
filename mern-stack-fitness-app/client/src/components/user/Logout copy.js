import React, { useContext } from 'react';
import { logOut } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

import { Button, Modal } from '@material-ui/core'

export const LogOut = () => {
	const match = useRouteMatch();
	const history = useHistory();
	
	const { getLoggedIn } = useContext(AuthContext);

	const onClick = async () => {
		await logOut();	// Llamamos a la API para cerrar sesión
		await getLoggedIn();
		history.push("/");	// Redireccionamos al listado de usuarios
	}

	return (
		<Modal>
			<h3>¿Está seguro de que desea cerrar sesión?</h3>
		</Modal>
	);
};

/*

import React, { useContext } from 'react';
import { logOut } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

import { Button } from '@material-ui/core'

export const LogOut = () => {
	const match = useRouteMatch();
	const history = useHistory();
	
	const { getLoggedIn } = useContext(AuthContext);

	const onClick = async () => {
		await logOut();	// Llamamos a la API para cerrar sesión
		await getLoggedIn();
		history.push("/");	// Redireccionamos al listado de usuarios
	}

	return (
		<Button onClick={onClick}>Cerrar sesión</Button>
	);
};

*/