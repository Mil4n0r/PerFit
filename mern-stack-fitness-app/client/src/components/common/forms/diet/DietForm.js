import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { DietSchema } from '../../schemas/diet/DietSchema';

import { Button, Typography, InputAdornment } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';

export const DietForm = ({ diet, onSubmit }) => {

	const { register, trigger, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			dietname: diet ? diet.nombrePlan : "",
			calories: diet ? diet.objetivoDiario.calorias : "",
			carbs: diet ? diet.objetivoDiario.carbohidratos : "",
			proteins: diet ? diet.objetivoDiario.proteinas : "",
			fats: diet ? diet.objetivoDiario.grasas : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(DietSchema),
		mode: "onTouched",
		reValidateMode: "onChange"
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
					label="Nombre de la dieta"
					type="text"
					name="dietname"
					id="dietname"
				/>
				<ErrorMessage errors={errors} name="dietname" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Calorías"
					type="number"
					name="calories"
					id="calories"
					inputProps={{ min: "0", step: "1" }}
					InputProps={{endAdornment: <InputAdornment position="end">Kcal</InputAdornment>}}
				/>
				<ErrorMessage errors={errors} name="calories" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Carbohidratos"
					type="number"
					name="carbs"
					id="carbs"
					inputProps={{ min: "0", step: "0.1" }}
					InputProps={{endAdornment: <InputAdornment position="end">g</InputAdornment>}}
					onChange={() => trigger("calories")}
				/>
				<ErrorMessage errors={errors} name="carbs" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Proteinas"
					type="number"
					name="proteins"
					id="proteins"
					inputProps={{ min: "0", step: "0.1" }}
					InputProps={{endAdornment: <InputAdornment position="end">g</InputAdornment>}}
					onChange={() => trigger("calories")}
				/>
				<ErrorMessage errors={errors} name="proteins" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Grasas"
					type="number"
					name="fats"
					id="fats"
					inputProps={{ min: "0", step: "0.1" }}
					InputProps={{endAdornment: <InputAdornment position="end">g</InputAdornment>}}
					onChange={() => trigger("calories")}
				/>
				<ErrorMessage errors={errors} name="fats" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar dieta
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}