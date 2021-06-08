import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateRoutine } from '../../api';
import { RoutineForm } from '../common/forms/routine/RoutineForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const AssociateRoutineToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await associateRoutine(data, match.params.id); // ID usuario
		history.push(`/routine/list/${match.params.id}`);
	};

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear rutina
			</CustomTypography>
			<RoutineForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}