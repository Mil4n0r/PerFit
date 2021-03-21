import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { createDiet } from '../../api';
import { DietForm } from '../common/forms/diet/DietForm';

export const CreateDiet = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await createDiet(data);
		history.push("/diet/list");
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear dieta</h3>
				<DietForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}