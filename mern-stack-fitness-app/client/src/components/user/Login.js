import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../api'
import AuthContext from '../../context/AuthContext';

import { LoginForm } from '../common/forms/user/login/LoginForm';

export const Login = () => {
	const history = useHistory();

	const { getLoggedIn } = useContext(AuthContext);

	const onSubmit = async (data) => {
		await logIn(data.email, data.password);
		await getLoggedIn();
		history.push("/");
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