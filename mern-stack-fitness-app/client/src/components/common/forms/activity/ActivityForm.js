import React from 'react'
import { useForm, Controller } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Grid, Typography, MenuItem, Chip } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';

import { ActivitySchema } from '../../schemas/activity/ActivitySchema'

export const ActivityForm = ({ activity, onSubmit }) => {
	
	const { register, errors, handleSubmit, control } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			activityname: activity ? activity.activityInfo.nombreActividad : "",
			activityequipment: activity ? activity.activityInfo.equipamientoActividad : [],
			activitydescription: activity ? activity.activityInfo.descripcionActividad : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(ActivitySchema),
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
					label="Nombre de la actividad"
					type="text"
					name="activityname"
					id="activityname"
				/>
				<ErrorMessage className="error" errors={errors} name="activityname" as={Typography} />
				<InputLabel htmlFor="activityequipment">
					Equipamiento requerido
				</InputLabel>
				<Controller
					control={control}
					name="activityequipment"
					id="activityequipment"
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
				<ErrorMessage className="error" errors={errors} name="activityequipment" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Descripción"
					type="text"
					name="activitydescription"
					id="activitydescription"
				/>
				<ErrorMessage className="error" errors={errors} name="activitydescription" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar actividad
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}