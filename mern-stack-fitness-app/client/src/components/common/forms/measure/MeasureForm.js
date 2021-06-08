import React, {useState, useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { MeasureSchema } from '../../schemas/measure/MeasureSchema';

import { Button, Typography, InputAdornment } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { MeasureSchema } from '../../schemas/measure/MeasureSchema';

export const MeasureForm = ({ measure, unit, onSubmit }) => {

	const [selectedDate, handleDateChange] = useState(new Date(localStorage.getItem('currentDate')) || new Date() );

	useEffect(() => {
		const setLocalStorageDate = async () => {
			localStorage.setItem('currentDate', selectedDate);
		}
		setLocalStorageDate();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [selectedDate]);

	const { register, errors, handleSubmit, control } = useForm({	// Creamos el formulario de creación de medida
		defaultValues: {
			measurevalue: measure ? measure.measureInfo.valorMedida : "",
			measuredate: measure ? measure.measureInfo.fechaMedida: selectedDate
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(MeasureSchema),
		mode: "onTouched"
	});
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		handleDateChange(data.measuredate);
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Valor de la medida"
					type="number"
					name="measurevalue"
					id="measurevalue"
					inputProps={{ min: "0", step: "1"}}
					InputProps={{endAdornment: <InputAdornment position="end">{unit ? unit : ""}</InputAdornment>}}
				/>
				<ErrorMessage errors={errors} name="measurevalue" as={Typography} />
				<InputLabel htmlFor="measuredate">
					Fecha de la medida
				</InputLabel>
				<Controller
					control={control}
					name="measuredate"
					id="measuredate"
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
				<ErrorMessage errors={errors} name="measuredate" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar medida
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}