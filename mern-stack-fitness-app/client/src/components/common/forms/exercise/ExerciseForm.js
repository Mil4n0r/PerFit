import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { ExerciseSchema } from '../../schemas/exercise/ExerciseSchema';

import { Button, Typography } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';

export const ExerciseForm = ({ exercise, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			exercisename: exercise ? exercise.exerciseInfo.nombreEjercicio : "",
			exercisetype: exercise ? exercise.exerciseInfo.tipoEjercicio : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(ExerciseSchema),
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
					label="Nombre del ejercicio"
					type="text"
					name="exercisename"
					id="exercisename"
				/>
				<ErrorMessage errors={errors} name="exercisename" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Tipo del ejercicio"
					type="text"
					name="exercisetype"
					id="exercisetype"
				/>
				<ErrorMessage errors={errors} name="exercisetype" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar ejercicio
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}