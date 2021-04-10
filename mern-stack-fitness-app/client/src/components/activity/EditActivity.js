import React, {useState, useEffect} from 'react';
import { getActivity, updateActivity } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { ActivityForm } from '../common/forms/activity/ActivityForm';

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
		<div className="container">
			<div className="mt-3">
				<h3>Editar actividad</h3>
				<ActivityForm activity={activity} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};