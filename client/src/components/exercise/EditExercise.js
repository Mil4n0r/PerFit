import React, {useState, useEffect} from 'react';
import { getExercise, updateExercise } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { ExerciseForm } from '../common/forms/exercise/ExerciseForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditExercise = () => {
	const match = useRouteMatch();
	const [exercise, setExercise] = useState();
	const [error, setError] = useState();
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
		const updatedExercise = await updateExercise(data, match.params.id);
		if(updatedExercise.response) {
			setError(updatedExercise.response);
		}
		else {
			history.push("/exercise/list");
		}
	}

	return exercise ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar ejercicio
			</CustomTypography>
			<ExerciseForm exercise={exercise} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};