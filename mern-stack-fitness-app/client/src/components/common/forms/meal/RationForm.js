import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { RationSchema } from '../../schemas/meal/RationSchema';

const normalizeFloat = (value) => {
	const normalizedFloat = value.replace(",", ".")
	return normalizedFloat;
};

export const RationForm = ({ ration, food, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ración
		defaultValues: {
			foodpreview: ration ? ration.alimentoComida.nombreAlimento : food ? food.foodInfo.nombreAlimento : "",
			mealfood: ration ? ration.alimentoComida._id : food ? food.foodInfo._id : "",
			numberofrations: ration ? ration.numRaciones : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(RationSchema),
		mode: "onTouched"
	});
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (	
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<label htmlFor="text">
					Alimento
				</label>
				<input className="form-control" ref={register} type="text" name="foodpreview" id="foodpreview" disabled />
				<input className="form-control" ref={register} type="text" name="mealfood" id="mealfood" readOnly /><p>Hay que marcarlo como hidden</p>
				<label htmlFor="text">
					Número de raciones
				</label>
				<input className="form-control" ref={register} type="text" min="0" max="10" name="numberofrations" id="numberofrations"
					onChange={(event) => {
						event.target.value = normalizeFloat(event.target.value);
					}}
				/>
			</div>
			<div className="form-group">
				<button type="submit" className="btn btn-primary">
					Guardar ración
				</button>
			</div>
		</form>
	)
}