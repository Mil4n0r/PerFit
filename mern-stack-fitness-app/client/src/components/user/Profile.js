import React, {useState, useEffect} from 'react';
import { getUser } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { SendFriendRequest } from './SendFriendRequest'

export const Profile = () => {

	const match = useRouteMatch();
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser(match.params.id);
			setUser(user);
		}
		fetchUser();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Perfil</h1>
		{
			user && (
				<>
					<p>Email: {user.userInfo.emailUsuario}</p>
					{
						//<p>Rol: {user.userInfo.rolUsuario}</p>
					}
					<p>Rol: {user.userInfo.role}</p>
					{
						user.permission.includes('allowfriends') && (
							<SendFriendRequest/>
						)
					}
					{
						user.permission.includes('write') && (
							<Link to={`/edit/user/${user.userInfo._id}`}>Editar</Link>
						)
					}
					{
						user.permission.includes('checkplans') && (
							<>
								<h2>Gestión de planes</h2>
								<ul>
									<li><Link to={`/routine/list/${user.userInfo._id}`}>Ver rutinas</Link></li>
									<li><Link to={`/associate/routine/${user.userInfo._id}`}>Crear nueva rutina</Link></li>
									<li><Link to={`/diet/list/${user.userInfo._id}`}>Ver dietas</Link></li>
									<li><Link to={`/associate/diet/${user.userInfo._id}`}>Crear nueva dieta</Link></li>
									<li><Link to={`/tracking/list/${user.userInfo._id}`}>Ver seguimientos</Link></li>
									<li><Link to={`/associate/tracking/${user.userInfo._id}`}>Crear nuevo seguimiento</Link></li>
								</ul>
							</>
						)
					}
				</>
			)
		}
	</>
	)
};