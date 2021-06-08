import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addMeal, getFoods } from '../../api';
import { MealForm } from '../common/forms/meal/MealForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateMeal = () => {
	const match = useRouteMatch();
	const [foods, setFoods] = useState();	
	const history = useHistory();
	
	useEffect(() => {
		const fetchFoods = async () => {
			const foods = await getFoods();
			setFoods(foods);
		}
		fetchFoods();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const meal = await addMeal(data, match.params.id); // ID dieta
		history.push(`/associate/diet/meal/${match.params.id}`);
	};

	return foods ? (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear comida
			</CustomTypography>
			<MealForm onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
}