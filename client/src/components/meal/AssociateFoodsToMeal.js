import React from 'react';
import { useRouteMatch } from "react-router-dom";
import { FoodList } from '../food/FoodList';

export const AssociateFoodsToMeal = () => {
	const match = useRouteMatch();

	return ( 
		<FoodList meal={match.params.id} diet={match.params.dietid}/>
	)
}
