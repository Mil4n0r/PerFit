import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addMeasure, getMeasures } from '../../api';
import { MeasureForm } from '../common/forms/measure/MeasureForm';

export const CreateMeasure = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await addMeasure(data, match.params.id); // ID seguimiento
		history.push(`/associate/tracking/measure/${match.params.id}`);
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Asociar medida</h3>
				<MeasureForm onSubmit={onSubmit} />
			</div>
		</div>
	)
}