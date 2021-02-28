import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { RoutineSchema } from '../../schemas/routine/RoutineSchema';
import { getExercises } from '../../../../api/exercise_api';

export const RoutineForm = ({ routine, onSubmit }) => {

	const [exercises, setExercises] = useState();

	useEffect(() => {
		const fetchRoutine = async () => {
			const exercises = await getExercises();
			setExercises(exercises);
		}
		fetchRoutine();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
            routinename: routine ? routine.nombrePlan : "",
			routinetime: routine ? routine.tiempoRutina : ""
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
						{
							routine && routine.entrenamientosRutina && (
								<div>
									<h3>Entrenamientos asociados</h3>
									{
										routine.entrenamientosRutina.map((training) => 
											<li>{training}</li>
										)
									}
								</div>
							)
						}
						{
							exercises && ( 
								<div>
									<h3>Ejercicios disponibles</h3>
									{
										exercises.map(exercises => (
											<tr key={exercises._id}>
												<td>
													{exercises.nombreEjercicio}
												</td>
												<td>
													{exercises.tipoEjercicio}
												</td>
												<td>
													<Link to={`/associate/routine/exercise/${exercises._id}`}>Asociar a la rutina</Link>
													<Link to={`/delete/routine/exercise/${exercises._id}`}>Eliminar de la rutina</Link>
												</td>
											</tr>
										))
									}
								</div>
							)
						}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar rutina
						</button>
					</div>
				</form>
	);
}