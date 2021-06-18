import React, {useState} from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { resetPassword } from '../../api';

import { ResetPasswordForm } from '../common/forms/user/login/ResetPasswordForm';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {BodyContainer, LoginAvatar, CustomTypography} from '../../style/style'
import { CircularProgress } from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const ResetPassword = () => {
	const match = useRouteMatch();
	const history = useHistory();
	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const savedUser = await resetPassword(match.params.token, data.password, data.passwordConfirm);
		if(savedUser.response) {
			setError(savedUser.response);
		}
		else {
			history.push("/");
		}
	};

	return (
		<BodyContainer>
			<LoginAvatar>
				<LockOutlinedIcon />
			</LoginAvatar>
			<CustomTypography component="h2" variant="h5">
				Recordar contraseña
			</CustomTypography>
			<ResetPasswordForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
};