import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../api'
import AuthContext from '../../context/AuthContext';

import { LoginForm } from './forms/login/LoginForm';

export const Login = () => {
	const history = useHistory();

	const { getLoggedIn } = useContext(AuthContext);

	const onSubmit = async (data) => {
		try {
			await login(data.email, data.password);
			await getLoggedIn();
			history.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Iniciar sesión</h3>
				<LoginForm onSubmit={onSubmit} />
			</div>
		</div>
	);
};