import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getTrackingsForUser } from '../../api';

export const UserTrackingList = () => {
	const match = useRouteMatch();
	const [trackings, setTrackings] = useState([])	// Creamos una variable de estado para almacenar la información de los seguimientos y una función para actualizarla

	useEffect(() => {
		const fetchTrackings = async () => {
			const trackings = await getTrackingsForUser(match.params.id);	// Llamamos a la API para obtener la información de los seguimientos del usuario
			setTrackings(trackings);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los seguimientos del usuario
		}
		fetchTrackings();	// Llamamos aparte a fetchTrackings para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Seguimientos</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre del seguimiento</th>
							<th>Valor objetivo</th>
							<th>Usuario asociado al seguimiento</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{
							trackings.map(tracking => (
								<tr key={tracking._id}>
									<td>
										{tracking.nombrePlan}
									</td>
									<td>
										{tracking.valorObjetivo}
									</td>
									<td>
										{tracking.usuarioPlan}
									</td>
									<td>
										<Link to={`/edit/tracking/${tracking._id}`}>Editar</Link>
										<Link to={`/delete/tracking/${tracking._id}`}>Eliminar</Link>
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