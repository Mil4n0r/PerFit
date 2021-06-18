import React, {useState, useEffect} from 'react';
import { getActivity, updateActivity } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { ActivityForm } from '../common/forms/activity/ActivityForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditActivity = () => {
	const match = useRouteMatch();
	const [activity, setActivity] = useState();
	const [error, setError] = useState();
	const history = useHistory();

	useEffect(() => {
		const fetchActivity = async () => {
			const activity = await getActivity(match.params.id);
			setActivity(activity);
		}
		fetchActivity();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const updatedActivity = await updateActivity(data, match.params.id);
		if(updatedActivity.response) {
			setError(updatedActivity.response);
		}
		else {
			history.push("/activity/list");
		}
	}

	return activity ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar actividad
			</CustomTypography>
			<ActivityForm activity={activity} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};