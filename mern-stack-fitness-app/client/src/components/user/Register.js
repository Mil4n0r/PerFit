import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { registerUser } from '../../api';
import { Step1 } from './forms/register/Step1';
import { Step2 } from './forms/register/Step2';
import { Step3 } from './forms/register/Step3';
import { StepConfirm } from './forms/register/StepConfirm';

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
		<div className="container">
			<div className="mt-3">
				<h3>Registrarse como nuevo usuario</h3>
				{
					<>
					{selectStep(match.params.step)}
					</>
				}
			</div>
		</div>
	);
}