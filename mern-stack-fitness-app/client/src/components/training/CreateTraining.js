import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addTraining, getExercises } from '../../api';
import { TrainingForm } from '../common/forms/training/TrainingForm';

export const CreateTraining = () => {
	const match = useRouteMatch();
	const [exercises, setExercises] = useState();	
	const history = useHistory();
	
	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();
			setExercises(exercises);
		}
		fetchExercises();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const training = await addTraining(data, match.params.id); // ID rutina
		history.push(`/associate/training/exercise/${training._id}`);
	};

	return exercises ? (
		<div className="container">
			<div className="mt-3">
				<h3>Asociar entrenamiento</h3>
				<TrainingForm onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
}