import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import FormContext from '../../../../../context/FormContext';
import { RegisterSchema1 } from '../../../schemas/user/register/RegisterSchema1';

import { Step, StepLabel, Button, Grid, Typography, Container } from '@material-ui/core';
import { NoBackgroundStepper, FormContainer, FullWidthForm, ButtonsContainer, TextFieldWithMargin as TextField } from '../../../../../style/style';

export const Step1 = () => {
	const { data, getData } = useContext(FormContext);

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { 
			alias: data ? data.alias : "",
			email: data ? data.email : "",
			password: data ? data.password : "",
			passwordConfirm: data ? data.passwordConfirm : ""
		},
		resolver: yupResolver(RegisterSchema1),
		criteriaMode: 'all',
		mode: "onTouched"
	});

	const history = useHistory();

	const onSubmit = (data) => {	// Pasamos los datos del formulario
		getData(data);
		history.push("./2");
	};

	return (
		<FormContainer>
			<FullWidthForm onSubmit={handleSubmit(onSubmit)}>
				<NoBackgroundStepper alternativeLabel activeStep={0}>
					<Step key={"label1"}>
						<StepLabel>{"Datos de inicio de sesión"}</StepLabel>
					</Step>
					<Step key={"label2"}>
						<StepLabel>{"Datos personales"}</StepLabel>
					</Step>
					<Step key={"label3"}>
						<StepLabel>{"Datos adicionales"}</StepLabel>
					</Step>
				</NoBackgroundStepper>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Nombre de usuario"
					type="text"
					name="alias"
					id="alias"
				/>
				<ErrorMessage className="error"
					errors={errors} name="alias" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<Container key={"alias " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message, id) => <Typography key={"alias" + id}>{message}</Typography>)
										) : <Typography>{messageArray}</Typography>}
									</Container>
								))
					}
				/>
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
				/>
				<ErrorMessage className="error"
					errors={errors} name="password" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<Container key={"password " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message,id) => <Typography key={"password" + id}>{message}</Typography>)
										) : <Typography>{messageArray}</Typography>}
									</Container>
								))
					}
				/>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Confirmar contraseña"
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
				/>
				<ErrorMessage className="error" errors={errors} name="passwordConfirm" as={Typography} />
				<ButtonsContainer>
					<Grid container spacing={1}>
						<Grid item>
							<Button disabled variant="contained">
								Atrás
							</Button>
						</Grid>
						<Grid item>
							<Button type="submit" variant="contained" color='primary'>
								Siguiente
							</Button>
						</Grid>
					</Grid>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}