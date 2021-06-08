import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addWorkout, getExercises } from '../../api';
import { getExercise } from '../../api/exercise_api';
import { WorkoutForm } from '../common/forms/training/WorkoutForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateWorkout = () => {
	const match = useRouteMatch();
	const [exercise, setExercise] = useState();
	const [exercises, setExercises] = useState();	
	const history = useHistory();
	
	useEffect(() => {
		const fetchExercises = async () => {
			const exercises = await getExercises();
			setExercises(exercises);
		}
		const fetchExercise = async() => {
			const exercise = await getExercise(match.params.exerciseid);
			setExercise(exercise);
		}
		fetchExercises();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchExercise();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const training = await addWorkout(data, match.params.trainingid); // ID training
		history.push(`/associate/routine/training/${match.params.routineid}`);
	};

	return exercises && exercise ? (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear series de ejercicios
			</CustomTypography>
			<WorkoutForm exercise={exercise} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
}