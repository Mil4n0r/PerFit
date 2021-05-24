import React, {useState, useEffect} from 'react';
import { getActivity, updateActivity } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { ActivityForm } from '../common/forms/activity/ActivityForm';

import { BodyContainer, CustomTypography } from '../../style/style';

export const EditActivity = () => {
	const match = useRouteMatch();
	const [activity, setActivity] = useState();
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
		await updateActivity(data, match.params.id);
		history.push("/activity/list");
	}

	return activity ? (
		<BodyContainer>
			<CustomTypography component="h3" variant="h5">
				Editar actividad
			</CustomTypography>
			<ActivityForm activity={activity} onSubmit={onSubmit} />
		</BodyContainer>
	) : (
		<>
		</>
	);
};