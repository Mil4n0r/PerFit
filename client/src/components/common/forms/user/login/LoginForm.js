import React from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginSchema } from '../../../schemas/user/login/LoginSchema';

import {Grid, Typography, Checkbox, FormControlLabel} from '@material-ui/core';

import {FormContainer, LoginButton, FullWidthForm, TextFieldWithMargin as TextField} from '../../../../../style/style'

export const LoginForm = ({ onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		resolver: yupResolver(LoginSchema),
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
			}}
			>
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
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Contraseña"
					type="password"
					name="password"
					id="password"
					autoComplete="current-password"
				/>
				<ErrorMessage className="error" errors={errors} name="password" as={Typography} />
				<FormControlLabel
					control={<Checkbox />}
					label="Recordarme"
					name="rememberme"
					inputRef={register}
				/>
				<LoginButton
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					INICIAR SESIÓN
				</LoginButton>
				<Grid container>
					<Grid item xs>
						<Link to="/forgot/password" color="primary">
							He olvidado mi contraseña
						</Link>
					</Grid>
					<Grid item>
						<Link to="/register/step/1" color="primary">
							No tengo cuenta y deseo registrarme
						</Link>
					</Grid>
				</Grid>
			</FullWidthForm>
		</FormContainer>
	);
};