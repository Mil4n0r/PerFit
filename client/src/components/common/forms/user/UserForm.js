import React, {useState, useEffect, useContext} from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from '@hookform/resolvers/yup';

import { UserSchema } from '../../schemas/user/UserSchema';

import { getSubscriptions } from '../../../../api';

import { Button, Typography, MenuItem, Chip, Card, Tooltip, Box, Container } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';
import { KeyboardDatePicker } from '@material-ui/pickers';
import AuthContext from '../../../../context/AuthContext';

export const UserForm = ({ user, onSubmit }) => {
	const [selectedDate, handleDateChange] = useState(new Date(2000, 0, 1));
	const [subscriptions, setSubscriptions] = useState([])	// Creamos una variable de estado para almacenar la información de las suscripciones y una función para actualizarla
	const { loggedIn } = useContext(AuthContext);
	useEffect(() => {
		const fetchSubscriptions = async () => {
			const subscriptions = await getSubscriptions();	// Llamamos a la API para obtener la información de las suscripciones
			setSubscriptions(subscriptions);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las salas
		}
		fetchSubscriptions();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	const { register, errors, handleSubmit, watch, control } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: {
			alias: user ? user.userInfo.aliasUsuario : "",
			email: user ? user.userInfo.emailUsuario : "",
			name: user ? user.userInfo.datosPersonales.nombreUsuario : "",
			surname: user ? user.userInfo.datosPersonales.apellidosUsuario : "",
			dni: user ? user.userInfo.datosPersonales.dniUsuario : "",
			address: user ? user.userInfo.datosPersonales.direccionUsuario : "",
			telephone: user ? user.userInfo.datosPersonales.telefonoUsuario : "",
			birthdate: user.userInfo.datosPersonales.fechaNacUsuario ? user.userInfo.datosPersonales.fechaNacUsuario : selectedDate, // Ajustamos la fecha al formato del formulario
			role: user.userInfo.role ? user.userInfo.role : "",
			privacy: user.userInfo.privacidadUsuario ? user.userInfo.privacidadUsuario : "",
			specialty: user.userInfo.especialidadesMonitor ? user.userInfo.especialidadesMonitor : [],
			subscription: user.userInfo.suscripcionMiembro ? user.userInfo.suscripcionMiembro.planSuscripcion._id : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(UserSchema),
		criteriaMode: 'all',
		mode: "onTouched"
	});

	const role = watch("role");

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});
	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
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
									<Box className="error" key={"alias " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message, id) => <Typography className="error" key={"alias" + id}>{message}</Typography>)
										) : <Typography>{messageArray}</Typography>}
									</Box>
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
					label="Nombre"
					type="text"
					name="name"
					id="name"
				/>
				<ErrorMessage className="error" errors={errors} name="name" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Apellidos"
					type="text"
					name="surname"
					id="surname"
				/>
				<ErrorMessage className="error" errors={errors} name="surname" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="DNI"
					type="text"
					name="dni"
					id="dni"
				/>
				<ErrorMessage className="error"
					errors={errors} name="dni" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<Box className="error" key={"dni " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message, id) => <p key={"dni" + id}>{message}</p>)
										) : <p>{messageArray}</p>}
									</Box>
								))
					}
				/>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Dirección"
					type="text"
					name="address"
					id="address"
				/>
				<ErrorMessage className="error"
					errors={errors} name="address" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<Box className="error" key={"address " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message, id) => <p key={"address" + id}>{message}</p>)
										) : <p>{messageArray}</p>}
									</Box>
								))
					}
				/>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Teléfono"
					type="text"
					name="telephone"
					id="telephone"
				/>
				<ErrorMessage className="error" errors={errors} name="telephone" as={Typography} />
				<InputLabel htmlFor="birthdate">
					Fecha de nacimiento
				</InputLabel>
				<Controller
					control={control}
					name="birthdate"
					id="birthdate"
					render={({ ref, ...rest }) => (
						<KeyboardDatePicker
							inputVariant="outlined"
							format="dd/MM/yyyy"
							autoOk
							value={selectedDate}
							cancelLabel="Cancelar"
							{...rest}
						/>
					)}
				/>
				<ErrorMessage className="error" errors={errors} name="birthdate" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Rol"
					type="text"
					name="role"
					id="role"
					InputProps={{
						readOnly: true,
					}}
				/>
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
				<ErrorMessage className="error" errors={errors} name="privacy" as={Typography} />
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
							<ErrorMessage className="error" errors={errors} name="specialty" as={Typography} />
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
										disabled={loggedIn.role !== "Administrador"}
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
																<Typography>Duración: {subscription.duracionSuscripcion} días</Typography>
																<Typography>Permisos: {subscription.permisosSuscripcion}</Typography>
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
							<ErrorMessage className="error" errors={errors} name="subscription" as={Typography} />
						</>
					)
				}
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar usuario
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}