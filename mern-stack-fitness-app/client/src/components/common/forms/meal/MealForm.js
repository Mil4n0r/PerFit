import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { MealSchema } from '../../schemas/meal/MealSchema';

export const MealForm = ({ meal, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			mealname: meal ? meal.nombreComida : "",
			mealday: meal ? meal.diaComida.substr(0,10) : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(MealSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre de la comida
						</label>
						<input className="form-control" ref={register} type="text" name="mealname" id="mealname" />
						<ErrorMessage errors={errors} name="mealname" as="p" />
						<label htmlFor="text">
							Fecha de la comida
						</label>
						<input className="form-control" ref={register} type="date" name="mealday" id="mealday" />
						<ErrorMessage errors={errors} name="mealday" as="p" />
						{
							meal && (
								<Link to={`/associate/meal/food/${meal._id}`}>Asociar alimentos a la comida</Link>
							)
						}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar comida
						</button>
					</div>
				</form>
	);
}