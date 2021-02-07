import React from 'react';
//import { useHistory } from 'react-router-dom';
import { profile } from './api'

export const Profile = () => {
	return (
	<>
		<h1>PRUEBA</h1>
	</>
	)
/*
	//const history = useHistory();

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