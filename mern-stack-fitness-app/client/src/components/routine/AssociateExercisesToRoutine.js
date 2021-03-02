import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
//import { associateRoutine } from '../../api';
import { getExercises } from '../../api/exercise_api';
import { deleteTraining, getRoutine, getTrainings } from '../../api/routine_api';

export const AssociateExercisesToRoutine = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [exercises, setExercises] = useState();
	const [routine, setRoutine] = useState();
	const [trainings, setTrainings] = useState();
	
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar

	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();
			setExercises(exercises);
		}
		const fetchRoutine = async () => {
			const routine = await getRoutine(match.params.id);
			setRoutine(routine);
		}
		
		fetchExercises();
		fetchRoutine();

		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	useEffect(() => {
		const fetchTrainings = async () => {
			const trainings = await getTrainings(match.params.id);
			setTrainings(trainings);
		}
		fetchTrainings();
	}, [deleted]);
	
	const deleteTrainingFromRoutine = async (trainingid) => {
		console.log("Rutina", match.params.id)
		console.log("Trainingid", trainingid)
		await deleteTraining(match.params.id, trainingid); // Debemos borrar tanto el entrenamiento como su referencia en la rutina...
		//history.go(0)
		//history.push(`/associate/routine/exercise/${match.params.id}`);
	}

	return (
		<>
			{
				routine && routine.entrenamientosRutina && (
					<>
						<h3>Entrenamientos asociados</h3>
						<table className="table table-stripped mt-3">
							<thead>
								<tr>
									<th>Entrenamiento</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
							{
								trainings && trainings.map((training) => (
									<tr key={training._id}>
										<td>
											{JSON.stringify(training.trabajoEntrenamiento)}
										</td>
										<td>
											<button onClick={() => {
												deleteTrainingFromRoutine(training._id)
												setDeleted(training._id);
											}
											}>Eliminar de la rutina</button>
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
									<Link to={`/create/training/${match.params.id}/${exercise._id}`}>Añadir entrenamiento</Link>
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

