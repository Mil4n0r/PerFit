import React, {useState, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { SubscriptionSchema } from '../../schemas/subscription/SubscriptionSchema';

import { Button, Typography, InputAdornment, Select, Chip, MenuItem } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, TextFieldWithMargin as TextField, InputLabelWithMargin as InputLabel } from '../../../../style/style';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { SubscriptionSchema } from '../../schemas/subscription/SubscriptionSchema';

export const SubscriptionForm = ({ subscription, onSubmit }) => {

	const { register, errors, handleSubmit, control } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			subscriptionname: subscription ? subscription.subscriptionInfo.nombreSuscripcion : "",
			subscriptiondescription: subscription ? subscription.subscriptionInfo.descripcionSuscripcion : "",
			subscriptioncost: subscription ? subscription.subscriptionInfo.costeSuscripcion : "",
			subscriptionpcoincost: subscription ? subscription.subscriptionInfo.costeSuscripcionPCoins : "",
			subscriptionduration: subscription ? subscription.subscriptionInfo.duracionSuscripcion : "",
			subscriptionpermissions: subscription ? subscription.subscriptionInfo.permisosSuscripcion : [],
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(SubscriptionSchema),
		mode: "onTouched"
	});

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
					label="Nombre de la suscripción"
					type="text"
					name="subscriptionname"
					id="subscriptionname"
				/>
				<ErrorMessage className="error" errors={errors} name="subscriptionname" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Descripción de la suscripción"
					type="text"
					name="subscriptiondescription"
					id="subscriptiondescription"
				/>
				<ErrorMessage className="error" errors={errors} name="subscriptiondescription" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Coste de la suscripción (€)"
					type="number"
					name="subscriptioncost"
					id="subscriptioncost"
					inputProps={{ min: "0", step: "1"}}
					InputProps={{endAdornment: <InputAdornment position="end">€</InputAdornment>}}
				/>
				<ErrorMessage className="error" errors={errors} name="subscriptioncost" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Coste de la suscripción (P-Coins)"
					type="number"
					name="subscriptionpcoincost"
					id="subscriptionpcoincost"
					inputProps={{ min: "0", step: "1"}}
					InputProps={{endAdornment: <InputAdornment position="end">P-Coins</InputAdornment>}}
				/>
				<ErrorMessage className="error" errors={errors} name="subscriptionpcoincost" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Días de duración de la suscripción"
					type="number"
					name="subscriptionduration"
					id="subscriptionduration"
					inputProps={{ min: "0", step: "1"}}
					InputProps={{endAdornment: <InputAdornment position="end">días</InputAdornment>}}
				/>
				<InputLabel htmlFor="specialty">
					Permisos
				</InputLabel>
				<Controller
					control={control}
					name="subscriptionpermissions"
					id="subscriptionpermissions"
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
							<MenuItem value="Clases dirigidas">Clases dirigidas</MenuItem>
							<MenuItem value="Planes">Planes</MenuItem>
							<MenuItem value="Entrenador personal">Entrenador personal</MenuItem>
						</Select>
					}
					defaultValue={[]}
				/>
				<ErrorMessage className="error" errors={errors} name="permissions" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar suscripción
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}