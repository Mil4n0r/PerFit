import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { TrainingSchema } from '../../schemas/training/TrainingSchema';

export const TrainingForm = ({ training, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			trainingname: training ? training.nombreEntrenamiento : ""
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
							Nombre del entrenamiento
						</label>
						<input className="form-control" ref={register} type="text" name="trainingname" id="trainingname" />
						<ErrorMessage errors={errors} name="trainingname" as="p" />
						<label htmlFor="text">
							Fecha del entrenamiento
						</label>
						<input className="form-control" ref={register} type="date" name="trainingday" id="trainingday" />
						<ErrorMessage errors={errors} name="trainingday" as="p" />
						{
							training && (
								<Link to={`/associate/training/exercise/${training._id}`}>Asociar ejercicios al entrenamiento</Link>
							)
						}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar entrenamiento
						</button>
					</div>
				</form>
	);
}