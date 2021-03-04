import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { TrainingSchema } from '../../schemas/training/TrainingSchema';

export const TrainingFromExerciseForm = ({ exercise, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			exercisepreview: exercise ? exercise.nombreEjercicio : "",
			trainingexercise: exercise ? exercise._id : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(TrainingSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Ejercicio
						</label>
						<input className="form-control" ref={register} type="text" name="exercisepreview" id="exercisepreview" disabled />
						<input className="form-control" ref={register} type="text" name="trainingexercise" id="trainingexercise" readOnly /><p>Hay que marcarlo como hidden</p>
						<label htmlFor="text">
							Número de series
						</label>
						<input className="form-control" ref={register} type="number" name="numberofseries" id="numberofseries" />
						<ErrorMessage errors={errors} name="numberofseries" as="p" />
						<label htmlFor="text">
							Número de repeticiones
						</label>
						<input className="form-control" ref={register} type="number" name="numberofreps" id="numberofreps" />
						<ErrorMessage errors={errors} name="numberofreps" as="p" />
						<label htmlFor="text">
							Pesos utilizados
						</label>
						<input className="form-control" ref={register} type="number" name="weightsused" id="weightsused" />
						<ErrorMessage errors={errors} name="weightsused" as="p" />
						<label htmlFor="text">
							Fecha
						</label>
						<input className="form-control" ref={register} type="date" name="trainingday" id="trainingday" />
						<ErrorMessage errors={errors} name="trainingday" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar entrenamiento
						</button>
					</div>
				</form>
	);
}