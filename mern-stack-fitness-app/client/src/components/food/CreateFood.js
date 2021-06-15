import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createFood } from '../../api';
import { FoodForm } from '../common/forms/food/FoodForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateFood = () => {
	const match = useRouteMatch();
	const history = useHistory();
	const dietId = match.params.dietid;
	const mealId = match.params.mealid;

	const onSubmit = async (data) => {
		await createFood(data);	// Llamamos a la API para crear el alimento
		if(dietId && mealId) {
			history.push(`/associate/meal/food/${dietId}/${mealId}`)
		}
		else {
			history.push("/food/list"); // Redireccionamos al listado de alimentos
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear alimento
			</CustomTypography>
			<FoodForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}