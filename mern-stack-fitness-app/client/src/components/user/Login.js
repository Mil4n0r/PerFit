import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../api'
import AuthContext from '../../context/AuthContext';

import { LoginForm } from '../common/forms/user/login/LoginForm';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {BodyContainer, LoginAvatar, CustomTypography} from '../../style/style'
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const Login = () => {
	const history = useHistory();
	const [error, setError] = useState();
	const { getLoggedIn } = useContext(AuthContext);

	const onSubmit = async (data) => {
		const logInRes = await logIn(data.email, data.password, data.rememberme);
		if(logInRes.response) {
			setError(logInRes.response);
		}
		else {
			await getLoggedIn();
			history.push("/");
		}
	};

	return (
		<BodyContainer>
			<LoginAvatar>
				<LockOutlinedIcon />
			</LoginAvatar>
			<CustomTypography component="h2" variant="h5">
				Inicio de sesión
			</CustomTypography>
			<LoginForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
};