import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addMeal } from '../../api';
import { MealForm } from '../common/forms/meal/MealForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateMeal = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const createdMeal = await addMeal(data, match.params.id); // ID dieta
		if(createdMeal.response) {
			setError(createdMeal.response);
		}
		else {
			history.push(`/associate/diet/meal/${match.params.id}`);
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear comida
			</CustomTypography>
			<MealForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}