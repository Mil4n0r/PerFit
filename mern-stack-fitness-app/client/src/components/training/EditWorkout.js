import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { getWorkout, updateWorkout } from '../../api';
import { WorkoutForm } from '../common/forms/training/WorkoutForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const EditWorkout = () => {
	const match = useRouteMatch();
	const [workout, setWorkout] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchWorkout = async() => {
			const workout = await getWorkout(match.params.routineid, match.params.id);
			console.log("WORKOUT!!!", workout)
			setWorkout(workout);
		}
		fetchWorkout();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		console.log(match.params)
		await updateWorkout(match.params.routineid, match.params.id, data);
		history.push(`/associate/routine/training/${match.params.routineid}`);
	};

	return workout ? (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Editar series de ejercicios
			</CustomTypography>
			<WorkoutForm workout={workout} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
}