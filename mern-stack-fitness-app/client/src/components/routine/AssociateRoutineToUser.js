import React, {useState} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateRoutine } from '../../api';
import { RoutineForm } from '../common/forms/routine/RoutineForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const AssociateRoutineToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const resRoutine = await associateRoutine(data, match.params.id); // ID usuario
		if(resRoutine.response) {
			setError(resRoutine.response);
		}
		else {
			history.push(`/routine/list/${match.params.id}`);
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear rutina
			</CustomTypography>
			<RoutineForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}