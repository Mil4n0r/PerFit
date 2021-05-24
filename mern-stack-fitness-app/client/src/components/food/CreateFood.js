import React from 'react';
import { useHistory } from 'react-router-dom';
import { createFood } from '../../api';
import { FoodForm } from '../common/forms/food/FoodForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateFood = () => {
	const history = useHistory();
	
	const onSubmit = async (data) => {
		await createFood(data);	// Llamamos a la API para crear el alimento
		history.push("/food/list");	// Redireccionamos al listado de alimentos
	};

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear alimento
			</CustomTypography>
			<FoodForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}