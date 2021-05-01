import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubscriptions } from '../../api';

export const SubscriptionList = () => {
	const [subscriptions, setSubscriptions] = useState([])	// Creamos una variable de estado para almacenar la información de la sala y una función para actualizarla

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const subscriptions = await getSubscriptions();	// Llamamos a la API para obtener la información de los alimentos
			setSubscriptions(subscriptions);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchSubscriptions();	// Llamamos aparte a fetchSubscriptions para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Suscripciones</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre de la suscripción</th>
							<th>Descripción de la suscripción</th>
							<th>Coste de la suscripción</th>
							<th>Fecha límite de la suscripción</th>
						</tr>
					</thead>
					<tbody>
						{
							subscriptions.map(subscription => (
								<tr key={subscription._id}>
									<td>
										{subscription.nombreSuscripcion}
									</td>
									<td>
										{subscription.descripcionSuscripcion}
									</td>
									<td>
										{subscription.costeSuscripcion}
									</td>
									<td>
										{subscription.vencimientoSuscripcion}
									</td>
									<td>
										<Link to={`/subscription/info/${subscription._id}`}>Ver</Link>
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