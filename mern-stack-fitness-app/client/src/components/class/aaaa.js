import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { addClass, getActivity, getActivities } from '../../api';
import { ClassForm } from '../common/forms/class/ClassForm';

export const CreateClass = () => {
	const match = useRouteMatch();
	const [activity, setActivity] = useState();
	const [activities, setActivities] = useState();	
	const history = useHistory();
	
	useEffect(() => {
		const fetchActivities = async () => {
			const activities = await getActivities();
			setActivities(activities);
		}
		const fetchActivity = async() => {
			const activity = await getActivity(match.params.activityid);
			setExercise(activity);
		}
		fetchActivities();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchActivity();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	const onSubmit = async (data) => {
		const sclass = await addClass(data, match.params.activityid);
		history.push(`/associate/class/activity/${sclass._id}`);
	};

	return activities && activity ? (
		<div className="container">
			<div className="mt-3">
				<h3>Asociar actividades</h3>
				<ClassForm activity={activity} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
}