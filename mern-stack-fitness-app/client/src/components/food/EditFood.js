import React, {useState, useEffect} from 'react';
import { getFood, updateFood } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { FoodForm } from '../common/forms/food/FoodForm';

export const EditFood = () => {
	const match = useRouteMatch();
	const [food, setFood] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchFood = async () => {
			const food = await getFood(match.params.id);
			setFood(food);
		}
		fetchFood();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		await updateFood(data, match.params.id);
		history.push("/food/list");
	}

	return food ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar alimento</h3>
				<FoodForm food={food} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};