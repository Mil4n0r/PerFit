import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { createActivity } from '../../api';
import { ActivityForm } from '../common/forms/activity/ActivityForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const CreateActivity = () => {
	const history = useHistory();

	const [error, setError] = useState();

	const onSubmit = async (data) => {
		const createdActivity = await createActivity(data);
		if(createdActivity.response) {
			setError(createdActivity.response);
		}
		else {
			history.push("/activity/list");
		}
	};

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Crear actividad
			</CustomTypography>
			<ActivityForm onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	);
}