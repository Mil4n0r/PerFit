import React, {useState, useEffect} from 'react';
import { getFood, updateFood } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { FoodForm } from '../common/forms/food/FoodForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditFood = () => {
	const match = useRouteMatch();
	const [food, setFood] = useState();
	const [error, setError] = useState();
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
		const updatedFood = await updateFood(data, match.params.id);
		if(updatedFood.response) {
			setError(updatedFood.response);
		}
		else {
			history.push("/food/list");
		}
	}

	return food ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar alimento
			</CustomTypography>
			<FoodForm food={food} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};