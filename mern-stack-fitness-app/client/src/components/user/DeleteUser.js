import React from 'react';
import { deleteUser } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

export const DeleteUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onClick = async () => {
		await deleteUser(match.params.id);	// Llamamos a la API para eliminar el usuario
		history.push("/admin/list");	// Redireccionamos al listado de usuarios
	}

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Eliminar usuario</h3>
				<button onClick={onClick}>Eliminar</button>
			</div>
		</div>
	);
};