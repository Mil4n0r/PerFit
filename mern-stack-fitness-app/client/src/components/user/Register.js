import React, {useState} from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { registerUser } from '../../api';
import { Step1 } from '../common/forms/user/register/Step1';
import { Step2 } from '../common/forms/user/register/Step2';
import { Step3 } from '../common/forms/user/register/Step3';
import { StepConfirm } from '../common/forms/user/register/StepConfirm';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Modal, Button } from '@material-ui/core';
import {HorizontalGrid, BodyContainer, RegisterAvatar, CustomTypography as Typography, CenterPaper, ErrorDrawer, CustomErrorOutlineOutlinedIcon} from '../../style/style'

import ErrorDisplayer from '../common/layout/ErrorDisplayer';
import { RegisteredMessage } from './RegisteredMessage';
import Confetti from 'react-confetti';

export const Register = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [open, setOpen] = useState();
	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const savedUser = await registerUser(data);	// Llamamos a la API para registrar al usuario
		if(savedUser.response) {
			setError(savedUser.response);
		}
		else {
			setOpen(true);
		}
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
			{
				open && (
					<>
						<Confetti/>
						{<Modal
							open={open}
						>
							<CenterPaper><RegisteredMessage/></CenterPaper>
						</Modal>}
					</>
				)
			}
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
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}