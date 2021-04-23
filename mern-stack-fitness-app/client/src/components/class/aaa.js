import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getActivities } from '../../api';

export const AssociateActivityToClass = () => {
	const match = useRouteMatch();

	const [activities, setActivities] = useState();

	useEffect(() => {
		const fetchActivities = async () => {
			const activities = await getActivities();
			setActivities(activities);
		}
		fetchActivities();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	return (
		<>
			<h3>Actividades disponibles</h3>
			<table className="table table-stripped mt-3">
				<thead>
					<tr>
						<th>Nombre de la actividad</th>
						<th>Equipamiento requerido</th>
						<th>Descripción actividad</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
				{
					activities && ( 
						activities.map(activity => (
							<tr key={activity._id}>
								<td>
									{activity.nombreEjercicio}
								</td>
								<td>
									{activity.tipoEjercicio}
								</td>
								<td>
									<Link to={`/create/class/${activity._id}`}>Asociar actividad a la clase</Link>
								</td>
							</tr>
						))
					)
				}
				</tbody>
			</table>
		</>
	);
}