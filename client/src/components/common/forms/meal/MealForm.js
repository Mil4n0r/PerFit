import React, {useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { MealSchema } from '../../schemas/meal/MealSchema';

import { Button, Typography } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const MealForm = ({ meal, onSubmit }) => {

	const [selectedDate, handleDateChange] = useState(new Date(localStorage.getItem('currentDate')) || new Date() );
	
	useEffect(() => {
		const setLocalStorageDate = async () => {
			localStorage.setItem('currentDate', selectedDate);
		}
		setLocalStorageDate();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [selectedDate]);

	const { register, errors, handleSubmit, control } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			mealname: meal ? meal.nombreComida : "",
			mealday: meal ? meal.diaComida : selectedDate,
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(MealSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		handleDateChange(data.mealday);
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Nombre de la comida"
					type="text"
					name="mealname"
					id="mealname"
				/>
				<ErrorMessage className="error" errors={errors} name="mealname" as={Typography} />
				<InputLabel htmlFor="mealday">
					Fecha de la comida
				</InputLabel>
				<Controller
					control={control}
					name="mealday"
					id="mealday"
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
				<ErrorMessage className="error" errors={errors} name="mealday" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar comida
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}