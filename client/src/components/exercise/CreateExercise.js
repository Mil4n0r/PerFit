import React, {useState} from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { createExercise } from '../../api';
import { ExerciseForm } from '../common/forms/exercise/ExerciseForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateExercise = () => {
	const match = useRouteMatch();
	const history = useHistory();
	const routineId = match.params.routineid;
	const trainingId = match.params.trainingid;

	const [error, setError] = useState();
	
	const onSubmit = async (data) => {
		const createdExercise = await createExercise(data);	// Llamamos a la API para crear el ejercicio
		if(createdExercise.response) {
			setError(createdExercise.response);
		}
		else {
			if(routineId && trainingId) {
				history.push(`/associate/training/exercise/${routineId}/${trainingId}`)
			}
			else {
				history.push("/exercise/list");	// Redireccionamos al listado de ejercicio
			}
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear ejercicio
			</CustomTypography>
			<ExerciseForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}