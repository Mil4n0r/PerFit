import React from 'react';
import { logOut } from './api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const LogOut = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async (data) => {
		await logOut();	// Llamamos a la API para cerrar sesión
		//history.push("/list");	// Redireccionamos al listado de usuarios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Cerrar sesión</h3>
				<button onClick={onClick}>Cerrar</button>
			</div>
		</div>
	);
};