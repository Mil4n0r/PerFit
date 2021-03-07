import React, {useState, useEffect} from 'react';
import { getRoutine, updateRoutine } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { RoutineForm } from '../common/forms/routine/RoutineForm';

export const EditRoutine = () => {
	const match = useRouteMatch();
	const [routine, setRoutine] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchRoutine = async () => {
			const routine = await getRoutine(match.params.id);
			setRoutine(routine);
		}
		fetchRoutine();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateRoutine(data, match.params.id);
		history.push("/routine/list");
	}

	return routine ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar rutina</h3>
				<RoutineForm routine={routine} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};