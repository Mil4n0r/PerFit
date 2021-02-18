import React, {useState, useEffect} from 'react';
import { getUser } from '../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";

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
					<p>Email: {user.emailUsuario}</p>
					<p>Rol: {user.rolUsuario}</p>
				</>
			)
		}
	</>
	)
/*
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const token = await login(event.target.email.value, event.target.password.value)
			console.log("TOKEN",token)
			//history.push("/");
		} catch (error) {
			console.error(error);
			alert("Error logging in please try again");
		}
	};

return (
	<>
		<h3>Login</h3>
		<form onSubmit={onSubmit}>
			<div>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
			</div>
			<div>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
			</div>
			<button type="submit">Log in</button>
		</form>
	</>
);
*/
};