import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { resetPassword } from '../../api';

import { ResetPasswordForm } from '../common/forms/user/login/ResetPasswordForm';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {BodyContainer, LoginAvatar, CustomTypography} from '../../style/style'
import { CircularProgress } from '@material-ui/core';

export const ResetPassword = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await resetPassword(match.params.token, data.password);
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
			<ResetPasswordForm onSubmit={onSubmit} />
		</BodyContainer>
	);
};