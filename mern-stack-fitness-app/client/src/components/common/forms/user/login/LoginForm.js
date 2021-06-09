import React from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from '@hookform/resolvers/yup';

import { LoginSchema } from '../../../schemas/user/login/LoginSchema';

import {Grid, Typography, Link, Checkbox, FormControlLabel} from '@material-ui/core';

import {FormContainer, LoginButton, FullWidthForm, TextFieldWithMargin as TextField} from '../../../../../style/style'

export const LoginForm = ({ onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		resolver: yupResolver(LoginSchema),
		mode: "onTouched"
	});
	
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		console.log(data)
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={(event) => {
				event.preventDefault();
				submitHandler(event.target.name, event.target.password)
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
				<ErrorMessage errors={errors} name="email" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Contraseña"
					type="password"
					name="password"
					id="password"
				/>
				<ErrorMessage errors={errors} name="password" as={Typography} />
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
						<Link href="#" color="primary">
							He olvidado mi contraseña
						</Link>
					</Grid>
					<Grid item>
						<Link href="./register/step/1" color="primary">
							No tengo cuenta y deseo registrarme
						</Link>
					</Grid>
				</Grid>
			</FullWidthForm>
		</FormContainer>
	);
};