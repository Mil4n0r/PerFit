import React, { useContext } from 'react';
import { logOut } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

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
		<div className="container">
			<div className="mt-3">
				<button onClick={onClick}>Cerrar sesión</button>
			</div>
		</div>
	);
};