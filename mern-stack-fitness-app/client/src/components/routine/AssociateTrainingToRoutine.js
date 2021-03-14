import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
//import { associateRoutine } from '../../api';
import { getExercises, deleteTraining, getRoutine, getTrainings } from '../../api';

const formatDate = (date) => {
	
	const [year, month, day] = date.substr(0,10).split("-");
	return `${day}/${month}/${year}`;
}

const trainingFormat = (t) => {
	const trainingname = t.nombreEntrenamiento;
	const trainingday = formatDate(t.diaEntrenamiento);
	return (
		`Entrenamiento: ${trainingname} - Día ${trainingday}`
	)
}

export const AssociateTrainingToRoutine = () => {
	const match = useRouteMatch();

	const [routine, setRoutine] = useState();
	const [trainings, setTrainings] = useState();
	
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar

	useEffect(() => {
		const fetchRoutine = async () => {
			const routine = await getRoutine(match.params.id);
			setRoutine(routine);
		}
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
		await deleteTraining(match.params.id, trainingid); // Debemos borrar tanto el entrenamiento como su referencia en la rutina...
		setDeleted(trainingid);
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
								{trainings && trainings.map((training) => (
										<tr key={training._id}>
											<td>
												{trainingFormat(training)}
											</td>
											<td>
												<Link to={`/edit/training/${routine._id}/${training._id}`}>Editar entrenamiento</Link>
												<button onClick={() => {
													deleteTrainingFromRoutine(training._id)
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
			<Link to={`/create/training/${match.params.id}`}>Añadir entrenamiento</Link>			
		</>
	);
}

