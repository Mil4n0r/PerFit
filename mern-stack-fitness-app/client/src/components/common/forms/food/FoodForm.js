import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { FoodSchema } from '../../schemas/food/FoodSchema';

import { Button, Typography, InputAdornment } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';

export const FoodForm = ({ food, onSubmit }) => {
	
	const { register, trigger, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: {
			foodname: food ? food.foodInfo.nombreAlimento : "",
			foodsize: food ? food.foodInfo.tamRacion : "",
			calories: food ? food.foodInfo.nutrientesRacion.calorias : "",
			carbs: food ? food.foodInfo.nutrientesRacion.carbohidratos : "",
			proteins: food ? food.foodInfo.nutrientesRacion.proteinas : "",
			fats: food ? food.foodInfo.nutrientesRacion.grasas : ""
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(FoodSchema),
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
					label="Nombre del alimento"
					type="text"
					name="foodname"
					id="foodname"
				/>
				<ErrorMessage className="error" errors={errors} name="foodname" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Tamaño de la ración"
					type="number"
					name="foodsize"
					id="foodsize"
					inputProps={{ min: "0", step: "1"}}
					InputProps={{endAdornment: <InputAdornment position="end">g</InputAdornment>}}
				/>
				<ErrorMessage className="error" errors={errors} name="foodsize" as={Typography} />
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
				<ErrorMessage className="error" errors={errors} name="calories" as={Typography} />
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
				<ErrorMessage className="error" errors={errors} name="carbs" as={Typography} />
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
				<ErrorMessage className="error" errors={errors} name="proteins" as={Typography} />
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
				<ErrorMessage className="error" errors={errors} name="fats" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar alimento
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}