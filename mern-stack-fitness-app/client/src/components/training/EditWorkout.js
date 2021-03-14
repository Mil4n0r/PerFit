import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { getWorkout, updateWorkout } from '../../api';
import { WorkoutForm } from '../common/forms/training/WorkoutForm';

export const EditWorkout = () => {
	const match = useRouteMatch();
	const [workout, setWorkout] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchWorkout = async() => {
			const workout = await getWorkout(match.params.id);
			setWorkout(workout);
		}
		fetchWorkout();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateWorkout(data, match.params.id);
		history.push(`/associate/training/exercise/${match.params.trainingid}`);
	};

	return workout ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar ejercicios</h3>
                <WorkoutForm workout={workout} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
}