import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addWorkout } from '../../api';
import { getExercise } from '../../api/exercise_api';
import { WorkoutForm } from '../common/forms/training/WorkoutForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateWorkout = () => {
	const match = useRouteMatch();
	const [exercise, setExercise] = useState();
	const history = useHistory();
	
	useEffect(() => {
		const fetchExercise = async() => {
			const exercise = await getExercise(match.params.exerciseid);
			setExercise(exercise);
		}
		fetchExercise();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const training = await addWorkout(match.params.routineid, match.params.trainingid, data);
		history.push(`/associate/routine/training/${match.params.routineid}`);
	};

	return exercise ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear series de ejercicios
			</CustomTypography>
			<WorkoutForm exercise={exercise} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
}