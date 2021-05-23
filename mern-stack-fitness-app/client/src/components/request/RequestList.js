import React, { useState, useEffect } from 'react';
import { getRequestsForUser } from '../../api';
import { AcceptRequest } from './AcceptRequest';
import { RejectRequest } from './RejectRequest';
import { useRouteMatch } from "react-router-dom";

export const RequestList = () => {
	const match = useRouteMatch();
	const [requests, setRequests] = useState([])	// Creamos una variable de estado para almacenar la información de las solicitudes y una función para actualizarlas
	const [updated, setUpdated] = useState([])


	useEffect(() => {
		const fetchRequests = async () => {
			const requests = await getRequestsForUser(match.params.id);	// Llamamos a la API para obtener la información de las solcitudes
			setRequests(requests);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las solicitudes
		}
		fetchRequests();	// Llamamos aparte a fetchRequests para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, [updated]);

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de solicitudes</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Solicitante</th>
							<th>Tipo de solicitud</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{
							requests.map(request => (
								<tr key={request._id}>
									<td>
										<a href={`http://localhost:3000/user/profile/${request.usuarioSolicitante._id}`}>{request.usuarioSolicitante.aliasUsuario}</a>
									</td>
									<td>
										{request.tipoPeticion}
									</td>
									<td>
										<AcceptRequest parentCallback={setUpdated} type={request.tipoPeticion} id={request._id}/>
										<RejectRequest parentCallback={setUpdated} type={request.tipoPeticion} id={request._id}/>
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