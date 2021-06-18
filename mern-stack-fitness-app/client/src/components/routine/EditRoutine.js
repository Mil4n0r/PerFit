import React, {useState, useEffect} from 'react';
import { getRoutine, updateRoutine } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { RoutineForm } from '../common/forms/routine/RoutineForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditRoutine = () => {
	const match = useRouteMatch();
	const [routine, setRoutine] = useState();
	const [error, setError] = useState();
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
		const updatedRoutine = await updateRoutine(data, match.params.id);
		if(updatedRoutine.response) {
			setError(updatedRoutine.response);
		}
		else {
			history.push(`/routine/list/${match.params.userid}`);
		}
	}

	return routine ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar rutina
			</CustomTypography>
			<RoutineForm routine={routine} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};