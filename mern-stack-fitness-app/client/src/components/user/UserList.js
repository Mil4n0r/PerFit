import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api';

export const UserList = () => {
	const [users, setUsers] = useState([])	// Creamos una variable de estado para almacenar la información del usuario y una función para actualizarla

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();	// Llamamos a la API para obtener la información de los usuarios
			setUsers(users);	// Actualizamos la información de nuestra variable de estado para que contenga la información del usuario
		}
		fetchUsers();	// Llamamos aparte a fetchUsers para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Usuarios</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Email</th>
							<th>Password</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{
							users.map(user => (
								<tr key={user._id}>
									<td>
										{user.emailUsuario}
									</td>
									<td>
										{user.passwordUsuario}
									</td>
									<td>
										<Link to={`/routine/list/${user._id}`}>Obtener rutinas</Link>
										<Link to={`/associate/routine/${user._id}`}>Asociar rutina</Link>
										<Link to={`/diet/list/${user._id}`}>Obtener dietas</Link>
										<Link to={`/associate/diet/${user._id}`}>Asociar dieta</Link>
										<Link to={`/tracking/list/${user._id}`}>Obtener seguimientos</Link>
										<Link to={`/associate/tracking/${user._id}`}>Asociar Seguimiento</Link>
										<Link to={`/user/profile/${user._id}`}>Perfil</Link>
										<Link to={`/delete/user/${user._id}`}>Eliminar</Link>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}