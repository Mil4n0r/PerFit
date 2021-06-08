import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { updateMeal, getMeal } from '../../api';
import { MealForm } from '../common/forms/meal/MealForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const EditMeal = () => {
	const match = useRouteMatch();
	const [meal, setMeal] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchMeal = async() => {
			const meal = await getMeal(match.params.id);
			setMeal(meal);
		}
		fetchMeal();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateMeal(data, match.params.id); // ID rutina
		history.push(`/associate/diet/meal/${match.params.dietid}`);
	};

	return meal ? (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Editar comida
			</CustomTypography>
			<MealForm meal={meal} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
}