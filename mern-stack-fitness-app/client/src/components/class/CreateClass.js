import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createClass } from '../../api';
import { ClassForm } from '../common/forms/class/ClassForm';

export const CreateClass = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await createClass(data);
		history.push("/class/list");
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear clase</h3>
				<ClassForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}