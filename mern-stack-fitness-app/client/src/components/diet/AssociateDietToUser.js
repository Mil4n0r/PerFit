import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateDiet } from '../../api';
import { DietForm } from '../common/forms/diet/DietForm';

export const AssociateDietToUser = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await associateDiet(data, match.params.id); // ID usuario
		history.push(`/diet/list/${match.params.id}`);
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Asociar dieta</h3>
				<DietForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}