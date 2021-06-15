import React, {useState, useEffect} from 'react';
import { getExercise, updateExercise } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { ExerciseForm } from '../common/forms/exercise/ExerciseForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const EditExercise = () => {
	const match = useRouteMatch();
	const [exercise, setExercise] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchExercise = async () => {
			const exercise = await getExercise(match.params.id);
			setExercise(exercise);
		}
		fetchExercise();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateExercise(data, match.params.id);
		history.push("/exercise/list");
	}

	return exercise ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar ejercicio
			</CustomTypography>
			<ExerciseForm exercise={exercise} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
};