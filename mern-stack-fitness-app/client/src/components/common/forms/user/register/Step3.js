import React, { useState, useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import FormContext from '../../../../../context/FormContext';
import { RegisterSchema3 } from '../../../schemas/user/register/RegisterSchema3';

import { getSubscriptionsGuest } from '../../../../../api';

import { Step, StepLabel, Button, Grid, Typography, MenuItem, Chip, Card, Tooltip, Box } from '@material-ui/core';
import { NoBackgroundStepper, FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel } from '../../../../../style/style';

export const Step3 = () => {
	const { data, getData } = useContext(FormContext);
	const [subscriptions, setSubscriptions] = useState([])	// Creamos una variable de estado para almacenar la información de las suscripciones y una función para actualizarla

	const { register, errors, handleSubmit, watch, control } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { 
			role: data.role ? data.role : "",
			privacy: data.privacy ? data.privacy : "",
			specialty: data.specialty ? data.specialty : [],
			subscription: data.subscription ? data.subscription : "",
		},
		resolver: yupResolver(RegisterSchema3),
		mode: "onTouched"
	});

	const role = watch("role");

	const history = useHistory();
	
	const onSubmit = (data) => {	// Pasamos los datos del formulario
		getData(data);
		history.push("./confirm");
	};

	const onBack = () => {
		history.push("./2");
	}

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const subscriptions = await getSubscriptionsGuest();	// Llamamos a la API para obtener la información de las suscripciones
			setSubscriptions(subscriptions);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las salas
		}
		fetchSubscriptions();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<FullWidthForm onSubmit={handleSubmit(onSubmit)}>
				<NoBackgroundStepper alternativeLabel activeStep={2}>
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
				<InputLabel htmlFor="role">
					Rol
				</InputLabel>
				<Controller
					control={control}
					name="role"
					id="role"
					as={
						<Select
							variant="outlined"
							fullWidth
						>
							<MenuItem value="Miembro">Miembro</MenuItem>
							<MenuItem value="Entrenador">Entrenador personal</MenuItem>
							<MenuItem value="Monitor">Monitor</MenuItem>
							{
								//<MenuItem value="moderador">Moderador</MenuItem>
							}
							<MenuItem value="Administrador">Administrador</MenuItem>
						</Select>
					}
					defaultValue={"Miembro"}
				/>
				<ErrorMessage errors={errors} name="role" as={Typography} />
				<InputLabel htmlFor="privacy">
					Configuración de seguridad
				</InputLabel>
				<Controller
					control={control}
					name="privacy"
					id="privacy"
					as={
						<Select
							variant="outlined"
							fullWidth
						>
							<MenuItem value="Público">Público: Perfil visible para todo el mundo</MenuItem>
							<MenuItem value="Sólo amigos">Sólo amigos: Perfil visible para mi y para mis amigos</MenuItem>
							<MenuItem value="Privado">Privado: Perfil visible sólo para mi</MenuItem>
						</Select>
					}
					defaultValue={"Público"}
				/>
				<ErrorMessage errors={errors} name="privacy" as={Typography} />
				{
					role === "Monitor" && (
						<>
							<InputLabel htmlFor="specialty">
								Especialidad
							</InputLabel>
							<Controller
								control={control}
								name="specialty"
								id="specialty"
								as={
									<Select
										multiple
										variant="outlined"
										fullWidth
										renderValue={(selected) => (
											<>
												{selected.map((value) => (
													<Chip key={value} label={value} />
												))}
											</>
										)}
									>
										<MenuItem value="Bicicletas">Bicicletas</MenuItem>
										<MenuItem value="Peso libre">Peso libre</MenuItem>
										<MenuItem value="Piscina">Piscina</MenuItem>
										<MenuItem value="Esterillas">Esterillas</MenuItem>
										<MenuItem value="Cintas de correr">Cintas de correr</MenuItem>
									</Select>
								}
								defaultValue={[]}
							/>
							<ErrorMessage errors={errors} name="specialty" as={Typography} />
						</>
					)
				}
				{
					role === "Miembro" && (
						<>
							<InputLabel htmlFor="subscription">
								Suscripción
							</InputLabel>
							<Controller
								control={control}
								name="subscription"
								id="subscription"
								as={
									<Select
										variant="outlined"
										fullWidth
									>
									{
										subscriptions && ( 
											subscriptions.map(subscription => (
												<MenuItem key={subscription._id} value={subscription._id}>
													<Tooltip 
														placement="right" 
														title={
															<>
																<Typography>Descripción: {subscription.descripcionSuscripcion}</Typography><br/>
																<Typography>Coste: {subscription.costeSuscripcion}€</Typography>
																<Typography>Fecha de vencimiento: {}</Typography>
															</>
														}
													>
														<Box component="span">
															{subscription.nombreSuscripcion}
														</Box>
													</Tooltip>
												</MenuItem>
											))
										)
									}
									</Select>
								}
								defaultValue={[]}
							/>
							<ErrorMessage errors={errors} name="subscription" as={Typography} />
						</>
					)
				}
				<ButtonsContainer>
					<Grid container spacing={1}>
						<Grid item>
							<Button variant="contained" onClick={onBack}>
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