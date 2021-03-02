import React from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { associateRoutine } from '../../api';
import { RoutineForm } from '../common/forms/routine/RoutineForm';

export const AssociateRoutine = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await associateRoutine(data, match.params.id); // ID usuario
		history.push(`/routine/list/${match.params.id}`);
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Asociar rutina</h3>
				<RoutineForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}