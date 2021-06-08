import React from 'react';
import { useHistory } from 'react-router-dom';
import { createActivity } from '../../api';
import { ActivityForm } from '../common/forms/activity/ActivityForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const CreateActivity = () => {
	const history = useHistory();
	const onSubmit = async (data) => {
		await createActivity(data);
		history.push("/activity/list");
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear actividad
			</CustomTypography>
			<ActivityForm onSubmit={onSubmit} />
		</BodyContainer>
	);
}