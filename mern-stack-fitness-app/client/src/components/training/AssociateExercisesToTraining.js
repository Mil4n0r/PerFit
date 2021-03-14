import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getExercises, getTraining, getWorkouts, deleteWorkout } from '../../api';

const workoutFormat = (w) => {
	const reps = w.numRepeticiones;
	const weights = w.pesosUtilizados;
	const exercisename = w.ejercicioEntrenamiento.nombreEjercicio;
	const exercisetype = w.ejercicioEntrenamiento.tipoEjercicio;

	const items = reps.map((_, i) => {
		return <li key={i}>{reps[i]} x {weights[i]}</li>;
	});
	
	return (
		<>
			<p>{exercisename} ({exercisetype}):</p>
			<p>Series:</p>
			<ol>
				{items}
			</ol>
		</>
	)
}

export const AssociateExercisesToTraining = () => {
	const match = useRouteMatch();

	const [exercises, setExercises] = useState();
	const [workouts, setWorkouts] = useState();
	
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar

	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();
			setExercises(exercises);
		}
		fetchExercises();
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
		setDeleted(workoutid);
	}

	return (
		<>
			{
				workouts && (
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
									workouts.map(workout => (
										<tr key={workout._id}>
											<td>
												{workoutFormat(workout)}
											</td>
											<td>
												<Link to={`/edit/workout/${match.params.id}/${workout._id}`}>Editar ejercicio</Link>
													<button onClick={async () => {
														deleteWorkoutFromTraining(workout._id)
													}
												}>Eliminar del entrenamiento</button>
											</td>
										</tr>
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
