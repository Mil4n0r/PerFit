import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getExercises, getTraining, getWorkouts, deleteWorkout } from '../../api';

export const AssociateExercisesToTraining = () => {
	const match = useRouteMatch();

	const [exercises, setExercises] = useState();
	const [training, setTraining] = useState();
	const [workouts, setWorkouts] = useState();
	
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar

	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();
			setExercises(exercises);
		}
		const fetchTraining = async () => {
			const training = await getTraining(match.params.id);
			setTraining(training);
		}
		fetchExercises();
		fetchTraining();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	useEffect(() => {
		const fetchWorkouts = async () => {
			const workouts = await getWorkouts(match.params.id);
			setWorkouts(workouts);
		}
		fetchWorkouts();
	}, [deleted]);
	
	const deleteWorkoutFromTraining = async (workoutid) => {
		await deleteWorkout(match.params.id, workoutid);
	}

	return (
		<>
			{
				training && training.trabajoEntrenamiento && (
					<>
						<h3>Ejercicios asociados</h3>
						<table className="table table-stripped mt-3">
							<thead>
								<tr>
									<th>Ejercicio</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
								{
									workouts && (
										workouts.map(workout => (
											<tr key={workout._id}>
												{console.log(workout)}
												<td>
													{JSON.stringify(workout)}
												</td>
												<td>
													<Link to={`/edit/workout/${workout._id}`}>Editar ejercicio</Link>
														<button onClick={() => {
															deleteWorkoutFromTraining(workout._id)
															setDeleted(workout._id);
														}
													}>Eliminar del entrenamiento</button>
												</td>
											</tr>
										)
									))
								}
							</tbody>
						</table>
					</>
				)
			}
			<h3>Ejercicios disponibles</h3>
			<table className="table table-stripped mt-3">
				<thead>
					<tr>
						<th>Nombre del ejercicio</th>
						<th>Tipo de ejercicio</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
				{
					exercises && ( 
						exercises.map(exercise => (
							<tr key={exercise._id}>
								<td>
									{exercise.nombreEjercicio}
								</td>
								<td>
									{exercise.tipoEjercicio}
								</td>
								<td>
									<Link to={`/create/workout/${match.params.id}/${exercise._id}`}>Añadir ejercicio al entrenamiento</Link>
								</td>
							</tr>
						))
					)
				}
				</tbody>
			</table>
		</>
	);
}
