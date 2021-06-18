import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addRation, getFood } from '../../api';
import { RationForm } from '../common/forms/meal/RationForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateRation = () => {
	const match = useRouteMatch();
	const [food, setFood] = useState();
	const [error, setError] = useState();	
	const history = useHistory();
	
	useEffect(() => {
		const fetchFood = async() => {
			const food = await getFood(match.params.foodid);
			setFood(food);
		}
		fetchFood();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const createdMeal = await addRation(match.params.dietid, match.params.mealid, data);
		if(createdMeal.response) {
			setError(createdMeal.response);
		}
		else {
			history.push(`/associate/diet/meal/${match.params.dietid}`);
		}
		
	};

	return food ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear ración
			</CustomTypography>
			<RationForm food={food} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
}