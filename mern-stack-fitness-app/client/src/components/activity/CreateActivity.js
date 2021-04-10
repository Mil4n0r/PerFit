import React from 'react';
import { useHistory } from 'react-router-dom';
import { createActivity } from '../../api';
import { ActivityForm } from '../common/forms/activity/ActivityForm';

export const CreateActivity = () => {
	const history = useHistory();
	const onSubmit = async (data) => {
		await createActivity(data);
		history.push("/activity/list");
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear actividad</h3>
				<ActivityForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}