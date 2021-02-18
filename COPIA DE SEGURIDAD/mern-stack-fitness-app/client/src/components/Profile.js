import React, {useState, useEffect} from 'react';
import { getUser, getUserAdmin } from '../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const Profile = () => {

	const match = useRouteMatch();
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUserAdmin(match.params.id)
			//const user = await getUser(match.params.id);
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
					<p>Rol: {user.userInfo.rolUsuario}</p>
					{
						user.permission === 'readwrite' && (
							<Link to={`/edit/user/${user.userInfo._id}`}>Editar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};