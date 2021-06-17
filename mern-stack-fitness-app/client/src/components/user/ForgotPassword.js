import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { forgotPassword } from '../../api';

import { ForgotPasswordForm } from '../common/forms/user/login/ForgotPasswordForm';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {BodyContainer, LoginAvatar, CustomTypography} from '../../style/style'
import { CircularProgress } from '@material-ui/core';

export const ForgotPassword = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setLoading(true)
		await forgotPassword(data.email);
		history.push("/");
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
		</BodyContainer>
	);
};