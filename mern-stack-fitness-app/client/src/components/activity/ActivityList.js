import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActivities } from '../../api';

export const ActivityList = () => {
	const [activities, setActivities] = useState([])	// Creamos una variable de estado para almacenar la información del alimentos y una función para actualizarla

	useEffect(() => {
		const fetchActivities = async () => {
			const activities = await getActivities();	// Llamamos a la API para obtener la información de los alimentos
			setActivities(activities);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchActivities();	// Llamamos aparte a fetchActivities para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Actividades</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre de la actividad</th>
							<th>Equipamiento de la actividad</th>
							<th>Descripción</th>
						</tr>
					</thead>
					<tbody>
						{
							activities.map(activity => (
								<tr key={activity._id}>
									<td>
										{activity.nombreActividad}
									</td>
									<td>
										{activity.equipamientoActividad}
									</td>
									<td>
										{activity.descripcionActividad}
									</td>
									<td>
										<Link to={`/activity/info/${activity._id}`}>Ver</Link>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}