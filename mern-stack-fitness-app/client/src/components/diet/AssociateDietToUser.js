import React, {useState} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateDiet } from '../../api';
import { DietForm } from '../common/forms/diet/DietForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const AssociateDietToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const resDiet = await associateDiet(data, match.params.id); // ID usuario
		if(resDiet.response) {
			setError(resDiet.response);
		}
		else {
			history.push(`/diet/list/${match.params.id}`);
		}
		
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear dieta
			</CustomTypography>
			<DietForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}