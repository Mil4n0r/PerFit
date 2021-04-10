import React, {useState, useEffect} from 'react';
import { getActivity } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const ActivityInfo = () => {

	const match = useRouteMatch();
	const [activity, setActivity] = useState();

	useEffect(() => {
		const fetchActivity = async () => {
			const activity = await getActivity(match.params.id);
			setActivity(activity);
		}
		fetchActivity();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Actividad</h1>
		{
			activity && (
				<>
					<p>Nombre: {activity.activityInfo.nombreActividad}</p>
					<p>Equipamiento: {activity.activityInfo.equipamientoActividad}</p>
					<p>Descripción: {activity.activityInfo.descripcionActividad}</p>
					{
						activity.permission.includes('write') && (
							<Link to={`/edit/activity/${activity.activityInfo._id}`}>Editar</Link>
						)
					}
					{
						activity.permission.includes('delete') && (
							<Link to={`/delete/activity/${activity.activityInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};