import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addTraining, getExercise } from '../../api';
import { TrainingFromExerciseForm } from '../common/forms/training/TrainingFromExerciseForm';

export const CreateTraining = () => { // Hay que pasar como parámetro la id de la rutina!!!!
	const match = useRouteMatch();
	const [exercise, setExercise] = useState();	
	const history = useHistory();

	useEffect(() => {
		const fetchExercise = async () => {
			const exercise = await getExercise(match.params.exerciseid);
			setExercise(exercise);
		}
		fetchExercise();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await addTraining(data, match.params.routineid); // ID rutina
		history.push(`/associate/routine/exercise/${match.params.routineid}`);
	};

	return exercise ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar entrenamiento</h3>
				<TrainingFromExerciseForm exercise={exercise} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
}