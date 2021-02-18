import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../api'
import AuthContext from '../context/AuthContext';

export const Login = () => {
	const history = useHistory();

	const { getLoggedIn } = useContext(AuthContext);

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await login(event.target.email.value, event.target.password.value);
			await getLoggedIn();
			history.push("/");
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
};