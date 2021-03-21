import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addRation, getFoods, getFood } from '../../api';
import { RationForm } from '../common/forms/meal/RationForm';

export const CreateRation = () => {
	const match = useRouteMatch();
	const [food, setFood] = useState();
	const [foods, setFoods] = useState();	
	const history = useHistory();
	
	useEffect(() => {
		const fetchFoods = async () => {
			const foods = await getFoods();
			setFoods(foods);
		}
		const fetchFood = async() => {
			const food = await getFood(match.params.foodid);
			setFood(food);
		}
		fetchFoods();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchFood();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const meal = await addRation(data, match.params.mealid);
		history.push(`/associate/meal/food/${meal._id}`);
	};

	return foods && food ? (
		<div className="container">
			<div className="mt-3">
				<h3>Asociar alimentos</h3>
				<RationForm food={food} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
}