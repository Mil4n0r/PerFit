import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import FormContext from '../../../../../context/FormContext';
import { RegisterSchema2 } from '../../../schemas/user/register/RegisterSchema2';

import { Stepper, Step, StepLabel, Button, Grid, Typography } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, TextFieldWithMargin as TextField} from '../../../../../style/style';

const dateToISO = (date) => {
	const day = date.getDate().toString().padStart(2,0);
	const month = (date.getMonth()+1).toString().padStart(2,0);
	const year = date.getFullYear().toString().padStart(4,0);
	return `${year}-${month}-${day}`;
}

export const Step2 = () => {
	const { data, getData } = useContext(FormContext);
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { // Asignamos los valores previamente introducidos como valores por defecto
			name: data.name ? data.name : "",
			surname: data.surname ? data.surname : "",
			dni: data.dni ? data.dni : "",
			address: data.address ? data.address : "",
			telephone: data.telephone ? data.telephone : "",
			birthdate: data.birthdate ? dateToISO(data.birthdate) : "" // Ajustamos la fecha al formato del formulario
		},
		resolver: yupResolver(RegisterSchema2),
		criteriaMode: 'all',
		mode: "onTouched"
	});
	const history = useHistory();
	
	const onSubmit = (data) => {	// Pasamos los datos del formulario
		getData(data);
		history.push("./3");
	};

	const onBack = () => {
		history.push("./1");
	}

	return (
		<FormContainer>
			<FullWidthForm onSubmit={handleSubmit(onSubmit)}>
				<Stepper alternativeLabel activeStep={1}>
					<Step key={"label1"}>
						<StepLabel>{"Datos de inicio de sesión"}</StepLabel>
					</Step>
					<Step key={"label2"}>
						<StepLabel>{"Datos personales"}</StepLabel>
					</Step>
					<Step key={"label3"}>
						<StepLabel>{"Datos adicionales"}</StepLabel>
					</Step>
				</Stepper>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Nombre"
					type="text"
					name="name"
					id="name"
				/>
				<ErrorMessage errors={errors} name="name" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Apellidos"
					type="text"
					name="surname"
					id="surname"
				/>
				<ErrorMessage errors={errors} name="surname" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="DNI"
					type="text"
					name="dni"
					id="dni"
				/>
				<ErrorMessage
					errors={errors} name="dni" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<div key={"dni " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message, id) => <p key={"dni" + id}>{message}</p>)
										) : <p>{messageArray}</p>}
									</div>
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
				<ErrorMessage
					errors={errors} name="address" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<div key={"address " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message, id) => <p key={"address" + id}>{message}</p>)
										) : <p>{messageArray}</p>}
									</div>
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
				<ErrorMessage errors={errors} name="telephone" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Fecha de nacimiento"
					type="date"
					name="birthdate"
					id="birthdate"
					InputLabelProps={{ shrink: true }}  
				/>
				<ErrorMessage errors={errors} name="birthdate" as={Typography} />
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