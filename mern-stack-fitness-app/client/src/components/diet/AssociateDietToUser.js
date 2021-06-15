import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateDiet } from '../../api';
import { DietForm } from '../common/forms/diet/DietForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const AssociateDietToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await associateDiet(data, match.params.id); // ID usuario
		history.push(`/diet/list/${match.params.id}`);
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear dieta
			</CustomTypography>
			<DietForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}