import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { RoutineSchema } from '../../schemas/routine/RoutineSchema';

export const RoutineForm = ({ routine, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
            routinename: routine ? routine.nombrePlan : "",
			routinetime: routine ? routine.tiempoRutina : "",
			//routinetrainings: routine ? routine.entrenamientosRutina : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(RoutineSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre de la rutina:
						</label>
						<input className="form-control" ref={register} type="text" name="routinename" id="routinename" />
						<ErrorMessage errors={errors} name="routinename" as="p" />
						<label htmlFor="text">
							Tiempo de la rutina:
						</label>
						<input className="form-control" ref={register} type="text" name="routinetime" id="routinetime" />
						<ErrorMessage errors={errors} name="routinetype" as="p" />
						
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar rutina
						</button>
					</div>
				</form>
	);
}