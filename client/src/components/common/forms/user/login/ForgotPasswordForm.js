import React from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from '@hookform/resolvers/yup';

import { ForgotPasswordSchema } from '../../../schemas/user/login/ForgotPasswordSchema';

import { Typography } from '@material-ui/core';

import {FormContainer, LoginButton, FullWidthForm, TextFieldWithMargin as TextField} from '../../../../../style/style'

export const ForgotPasswordForm = ({ onSubmit }) => {
	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(ForgotPasswordSchema),
		mode: "onTouched"
	});
	
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={(event) => {
				event.preventDefault();
				submitHandler();
			}}>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Email"
					type="text"
					name="email"
					id="email"
				/>
				<ErrorMessage className="error" errors={errors} name="email" as={Typography} />
				<LoginButton
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					ENVIAR REINICIO DE CONTRASEÑA
				</LoginButton>
			</FullWidthForm>
		</FormContainer>
	);
};