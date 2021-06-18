import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { forgotPassword } from '../../api';

import { ForgotPasswordForm } from '../common/forms/user/login/ForgotPasswordForm';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {BodyContainer, LoginAvatar, CustomTypography} from '../../style/style'
import { CircularProgress } from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const ForgotPassword = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const onSubmit = async (data) => {
		setLoading(true)
		const passwordRes = await forgotPassword(data.email);
		if(passwordRes.response) {
			setError(passwordRes.response);
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
			<ForgotPasswordForm onSubmit={onSubmit} />
			{
				loading && <CircularProgress/>
			}
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
};