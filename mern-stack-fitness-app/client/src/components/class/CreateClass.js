import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { createClass } from '../../api';
import { ClassForm } from '../common/forms/class/ClassForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateClass = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const onSubmit = async (data) => {
		await createClass(data);
		history.push("/class/list");
	};

	return (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Crear clase
			</CustomTypography>
			<ClassForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}