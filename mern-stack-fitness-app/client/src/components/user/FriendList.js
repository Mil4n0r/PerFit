import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getFriendsForUser } from '../../api';

export const FriendList = () => {
	const match = useRouteMatch();
	const [friends, setFriends] = useState([])	// Creamos una variable de estado para almacenar la información del usuario y una función para actualizarla

	useEffect(() => {
		const fetchFriends = async () => {
			const friends = await getFriendsForUser(match.params.id);	// Llamamos a la API para obtener la información de los usuarios
			setFriends(friends);	// Actualizamos la información de nuestra variable de estado para que contenga la información del usuario
		}
		fetchFriends();	// Llamamos aparte a fetchUsers para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Amigos</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Alias</th>
							<th>Email</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{
							friends.map(friend => (
								<tr key={friend._id}>
									<td>
										{friend.aliasUsuario}
									</td>
									<td>
										{friend.emailUsuario}
									</td>
									<td>
										<Link to={`/user/profile/${friend._id}`}>Perfil</Link>
										<Link to={`/delete/friend/${match.params.id}/${friend._id}`}>Dejar de ser amigos</Link>
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