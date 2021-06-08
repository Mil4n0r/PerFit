import React, {useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { TrainingSchema } from '../../schemas/training/TrainingSchema';

import { Button, Typography, MenuItem } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = ({ name, validation, label, control, disablePast, ...props }) => (
	<Controller
        render={
          ({ field }) => <Select {...field}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
          </Select>
        }
        control={control}
        name="select"
        defaultValue={10}
	/>
)
	

export const TrainingForm = ({ training, onSubmit }) => {

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
			trainingname: training ? training.nombreEntrenamiento : "",
			trainingday: training ? training.diaEntrenamiento : selectedDate,
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(TrainingSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		handleDateChange(data.trainingday);
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Nombre del entrenamiento"
					type="text"
					name="trainingname"
					id="trainingname"
				/>
				<ErrorMessage errors={errors} name="trainingname" as={Typography} />
				<InputLabel htmlFor="trainingday">
					Fecha del entrenamiento
				</InputLabel>
				<Controller
					control={control}
					name="trainingday"
					id="trainingday"
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
				<ErrorMessage errors={errors} name="trainingday" as="p" />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar entrenamiento
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}