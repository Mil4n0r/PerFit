import React, {useState, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { SubscriptionSchema } from '../../schemas/subscription/SubscriptionSchema';

import { Button, Typography, InputAdornment } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, TextFieldWithMargin as TextField, InputLabelWithMargin as InputLabel } from '../../../../style/style';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { SubscriptionSchema } from '../../schemas/subscription/SubscriptionSchema';

export const SubscriptionForm = ({ subscription, onSubmit }) => {
	const [selectedDate, handleDateChange] = useState(new Date());

	const { register, errors, handleSubmit, control } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			subscriptionname: subscription ? subscription.subscriptionInfo.nombreSuscripcion : "",
			subscriptiondescription: subscription ? subscription.subscriptionInfo.descripcionSuscripcion : "",
			subscriptioncost: subscription ? subscription.subscriptionInfo.costeSuscripcion : "",
			subscriptionend: subscription ? subscription.subscriptionInfo.vencimientoSuscripcion : selectedDate,
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(SubscriptionSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		handleDateChange(data.subscriptionend);
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Nombre de la suscripción"
					type="text"
					name="subscriptionname"
					id="subscriptionname"
				/>
				<ErrorMessage errors={errors} name="subscriptionname" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Descripción de la suscripción"
					type="text"
					name="subscriptiondescription"
					id="subscriptiondescription"
				/>
				<ErrorMessage errors={errors} name="subscriptiondescription" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Coste de la suscripción"
					type="number"
					name="subscriptioncost"
					id="subscriptioncost"
					inputProps={{ min: "0", step: "1"}}
					InputProps={{endAdornment: <InputAdornment position="end">€</InputAdornment>}}
				/>
				<ErrorMessage errors={errors} name="subscriptioncost" as={Typography} />
				<InputLabel htmlFor="subscriptionend">
					Fecha de vencimiento de la suscripción
				</InputLabel>
				<Controller
					control={control}
					name="subscriptionend"
					id="subscriptionend"
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
				<ErrorMessage errors={errors} name="subscriptionend" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar suscripción
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}