import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormContext from '../../../../../context/FormContext';

import { getSubscriptionName } from '../../../../../api';

import { Step, StepLabel, Button, Grid, Modal } from '@material-ui/core';
import { NoBackgroundStepper, FormContainer, FullWidthForm, ButtonsContainer, TextFieldWithMargin as TextField, CenterPaper } from '../../../../../style/style';
import { RegisteredMessage } from '../../../../user/RegisteredMessage';

const dateToISO = (date) => {
	const day = date.getDate().toString().padStart(2,0);
	const month = (date.getMonth()+1).toString().padStart(2,0);
	const year = date.getFullYear().toString().padStart(4,0);
	return `${year}-${month}-${day}`;
}

export const StepConfirm = ({ onSubmit }) => {
	const { data } = useContext(FormContext);
	const [open, setOpen] = useState();
	const [subscription, setSubscription] = useState();

	const submitHandler = (data) => {	// Pasamos los datos del formulario
		setOpen(true)
		onSubmit(data);
	};

	const history = useHistory();

	const onBack = () => {
		history.push("./3");
	}

	const onRestart = () => {
		history.push("./1");
	}

	useEffect(() => {
		const fetchSubscription = async () => {
			if(data.subscription) {
				const subscription = await getSubscriptionName(data.subscription);	// Llamamos a la API para obtener la información de las suscripciones
				setSubscription(subscription);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las salas
			}
		}
		fetchSubscription();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())
	
	return (
		<FormContainer>
			<FullWidthForm onSubmit={(event)=>{
				event.preventDefault();
				submitHandler(data);
			}}>
				<NoBackgroundStepper alternativeLabel activeStep={3}>
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
				<Grid container spacing={1} direction={'row'}>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Nombre de usuario"
							type="text"
							name="alias"
							id="alias"
							defaultValue={data.alias}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Email"
							type="text"
							name="email"
							id="email"
							defaultValue={data.email}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Contraseña"
							type="password"
							name="password"
							id="password"
							defaultValue={data.password}
							disabled
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} direction={'row'}>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Confirmar contraseña"
							type="password"
							name="passwordConfirm"
							id="passwordConfirm"
							defaultValue={data.passwordConfirm}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Nombre"
							type="text"
							name="name"
							id="name"
							defaultValue={data.name}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Apellidos"
							type="text"
							name="surname"
							id="surname"
							defaultValue={data.surname}
							disabled
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} direction={'row'}>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="DNI"
							type="text"
							name="dni"
							id="dni"
							defaultValue={data.dni}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Dirección"
							type="text"
							name="address"
							id="address"
							defaultValue={data.address}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Teléfono"
							type="text"
							name="telephone"
							id="telephone"
							defaultValue={data.telephone}
							disabled
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} direction={'row'}>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Fecha de nacimiento"
							type="date"
							name="birthdate"
							id="birthdate"
							defaultValue={data.birthdate ? dateToISO(data.birthdate) : ""}
							InputLabelProps={{ shrink: true }}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Rol"
							type="text"
							id="role"
							defaultValue={data.role}
							disabled
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							label="Configuración de seguridad"
							type="text"
							id="privacy"
							defaultValue={data.privacy}
							disabled
						/>
					</Grid>
				</Grid>
				{
					data.role === "Miembro" && subscription && (
						<TextField
							variant="outlined"
							fullWidth
							label="Suscripción"
							type="text"
							name="subscription"
							id="subscription"
							defaultValue={subscription && subscription}
							disabled
						/>
					)
				}
				{
					data.role === "Monitor" && (
						<TextField
							variant="outlined"
							fullWidth
							label="Especialidad"
							type="text"
							name="specialty"
							id="specialty"
							defaultValue={data.specialty ? data.specialty : ""}
							disabled
						/>
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
								Registrarse
							</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" color='secondary' onClick={onRestart}>
								Volver a rellenar
							</Button>
						</Grid>
					</Grid>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}