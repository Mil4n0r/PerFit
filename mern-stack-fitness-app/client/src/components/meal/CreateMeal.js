import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addMeal } from '../../api';
import { MealForm } from '../common/forms/meal/MealForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateMeal = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		const meal = await addMeal(data, match.params.id); // ID dieta
		history.push(`/associate/diet/meal/${match.params.id}`);
	};

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear comida
			</CustomTypography>
			<MealForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}