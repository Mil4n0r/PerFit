import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { registerUser } from '../../api';
import { Step1 } from '../common/forms/user/register/Step1';
import { Step2 } from '../common/forms/user/register/Step2';
import { Step3 } from '../common/forms/user/register/Step3';
import { StepConfirm } from '../common/forms/user/register/StepConfirm';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {BodyContainer, RegisterAvatar, CustomTypography as Typography} from '../../style/style'

export const Register = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await registerUser(data);	// Llamamos a la API para registrar al usuario
		history.push("/");	// Redireccionamos al listado de usuarios
	};

	const selectStep = (step) => {
		switch(step) {
			case '1':
				return <Step1 />;
			case '2':
				return <Step2 />;
			case '3': 
				return <Step3 />;
			case 'confirm':
				return <StepConfirm onSubmit={onSubmit}/>;
			default:
				return null;
		}
	}

	return (
		<BodyContainer>
			<RegisterAvatar>
				<LockOutlinedIcon />
			</RegisterAvatar>
			<Typography component="h2" variant="h5">
				Registrarse como nuevo usuario
			</Typography>
			{
				<>
				{selectStep(match.params.step)}
				</>
			}
		</BodyContainer>
	);
}