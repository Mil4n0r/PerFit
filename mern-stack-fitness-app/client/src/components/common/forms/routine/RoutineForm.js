import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { RoutineSchema } from '../../schemas/routine/RoutineSchema';

import { Button, Typography, InputAdornment } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, TextFieldWithMargin as TextField } from '../../../../style/style';

export const RoutineForm = ({ routine, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			routinename: routine ? routine.nombrePlan : "",
			routinetime: routine ? routine.tiempoRutina : ""
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(RoutineSchema),
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
					label="Nombre de la rutina"
					type="text"
					name="routinename"
					id="routinename"
				/>
				<ErrorMessage errors={errors} name="routinename" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Tiempo de la rutina"
					type="number"
					name="routinetime"
					id="routinetime"
					inputProps={{ min: "30", step: "1"}}
					InputProps={{endAdornment: <InputAdornment position="end">minutos</InputAdornment>}}
				/>
				<ErrorMessage errors={errors} name="routinetime" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar rutina
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}