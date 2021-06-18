import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { getWorkout, updateWorkout } from '../../api';
import { WorkoutForm } from '../common/forms/training/WorkoutForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditWorkout = () => {
	const match = useRouteMatch();
	const [workout, setWorkout] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchWorkout = async() => {
			const workout = await getWorkout(match.params.routineid, match.params.id);
			setWorkout(workout);
		}
		fetchWorkout();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const updatedWorkout = await updateWorkout(match.params.routineid, match.params.id, data);
		if(updatedWorkout.response) {
			setError(updatedWorkout.response);
		}
		else {
			history.push(`/associate/routine/training/${match.params.routineid}`);
		}
	};

	return workout ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar series de ejercicios
			</CustomTypography>
			<WorkoutForm workout={workout} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
}