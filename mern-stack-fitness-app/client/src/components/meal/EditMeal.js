import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { updateMeal, getMeal } from '../../api';
import { MealForm } from '../common/forms/meal/MealForm';

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
		history.push(`/associate/diet/food/${match.params.dietid}`);
	};

	return meal ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar comida</h3>
				<MealForm meal={meal} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
}