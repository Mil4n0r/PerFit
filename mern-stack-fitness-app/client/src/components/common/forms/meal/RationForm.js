import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { RationSchema } from '../../schemas/meal/RationSchema';

import { Button, Grid, Typography } from '@material-ui/core';
import { HiddenTextField, FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';

export const RationForm = ({ ration, food, onSubmit }) => {
	const [numberOfRations, setNumberOfRations] = useState((ration && ration.numRaciones) || 1);

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ración
		defaultValues: {
			foodpreview: ration ? ration.alimentoComida.nombreAlimento : food ? food.foodInfo.nombreAlimento : "",
			mealfood: ration ? ration.alimentoComida._id : food ? food.foodInfo._id : "",
			numberofrations: ration ? ration.numRaciones : 1,
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(RationSchema),
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
					label="Alimento"
					type="text"
					name="foodpreview"
					id="foodpreview"
					disabled
				/>
				<HiddenTextField
					inputRef={register}
					fullWidth
					label="Alimento"
					type="text"
					name="mealfood"
					id="mealfood"
				/>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Número de raciones"
					type="number"
					name="numberofrations"
					id="numberofrations"
					inputProps={{ min: "0", step: "0.1"}}
					onChange={(event) => setNumberOfRations(event.target.value)}
				/>
				<ErrorMessage errors={errors} name="numberofrations" as={Typography} />
				<TextField
					variant="outlined"
					fullWidth
					label="Calorías de la ración"
					type="number"
					name="rationcalories"
					id="rationcalories"
					value={ration ? ration.alimentoComida.nutrientesRacion.calorias * numberOfRations : food ? food.foodInfo.nutrientesRacion.calorias * numberOfRations : 0}
					disabled
				/>
				<Grid container spacing={1}>
					<Grid item xs>
						<TextField
							variant="outlined"
							fullWidth
							label="Carbohidratos"
							type="number"
							name="rationcarbs"
							id="rationcarbs"
							value={ration ? ration.alimentoComida.nutrientesRacion.carbohidratos * numberOfRations : food ? food.foodInfo.nutrientesRacion.carbohidratos * numberOfRations : 0}
							disabled
						/>
					</Grid>
					<Grid item xs>
						<TextField
							variant="outlined"
							fullWidth
							label="Proteinas"
							type="number"
							name="rationproteins"
							id="rationproteins"
							value={ration ? ration.alimentoComida.nutrientesRacion.proteinas * numberOfRations : food ? food.foodInfo.nutrientesRacion.proteinas * numberOfRations : 0}
							disabled
						/>
					</Grid>
					<Grid item xs>
						<TextField
							variant="outlined"
							fullWidth
							label="Grasas"
							type="number"
							name="rationfats"
							id="rationfats"
							value={ration ? ration.alimentoComida.nutrientesRacion.grasas * numberOfRations : food ? food.foodInfo.nutrientesRacion.grasas * numberOfRations : 0}
							disabled
						/>
					</Grid>
				</Grid>
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar ración
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	)
}