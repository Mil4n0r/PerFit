import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { ExerciseSchema } from '../../schemas/exercise/ExerciseSchema';

export const ExerciseForm = ({ exercise, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			exercisename: exercise ? exercise.nombreEjercicio : "",
			exercisetype: exercise ? exercise.tipoEjercicio : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(ExerciseSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre del ejercicio:
						</label>
						<input className="form-control" ref={register} type="text" name="exercisename" id="exercisename" />
						<ErrorMessage errors={errors} name="exercisename" as="p" />
						<label htmlFor="text">
							Tipo de ejercicio:
						</label>
						<input className="form-control" ref={register} type="text" name="exercisetype" id="exercisetype" />
						<ErrorMessage errors={errors} name="exercisetype" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar ejercicio
						</button>
					</div>
				</form>
	);
}